const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3307;
const secretKey = 'your-secret-key'; // 用于JWT签名

app.use(cors());
app.use(express.json());

// 创建数据库连接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '200501',
  database: 'your_database',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 初始化用户表
async function initUserTable() {
  try {
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE,
        password_hash VARCHAR(255)
      )
    `);
    console.log('用户表初始化完成');
  } catch (error) {
    console.error('初始化用户表失败:', error);
  }
}

initUserTable();

// 用户注册
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // 检查用户名是否已存在
    const [users] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
    if (users.length > 0) {
      return res.json({ success: false, message: '用户名已存在' });
    }
    
    // 加密密码
    const passwordHash = await bcrypt.hash(password, 10);
    
    // 创建用户
    await pool.execute('INSERT INTO users (username, password_hash) VALUES (?, ?)', [
      username,
      passwordHash
    ]);
    
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: '注册失败' });
  }
});

// 用户登录
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // 获取用户
    const [users] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
    const user = users[0];
    
    if (!user) {
      return res.json({ success: false, message: '用户名不存在' });
    }
    
    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    
    if (!isPasswordValid) {
      return res.json({ success: false, message: '密码错误' });
    }
    
    // 生成JWT
    const token = jwt.sign({ userId: user.id, username: user.username }, secretKey, {
      expiresIn: '1h'
    });
    
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: '登录失败' });
  }
});

// 验证中间件
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ success: false, message: '未提供令牌' });
  }
  
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: '无效令牌' });
    }
    req.user = user;
    next();
  });
}

// 获取用户列表
app.get('/api/users', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM users');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: '数据库错误' });
  }
});

// 添加用户
app.post('/api/users', authenticateToken, async (req, res) => {
  const { name, email } = req.body;
  try {
    const [result] = await pool.execute(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: '数据库错误' });
  }
});

// 处理SCL-90问卷提交
app.post('/api/scl90', authenticateToken, async (req, res) => {
  const { answers } = req.body;
  const username = req.user.username;
  
  try {
    const columns = ['id', 'username', ...Array.from({ length: 90 }, (_, i) => `q${i + 1}`)];
    const values = [null, username, ...answers];
    const placeholders = columns.map(() => '?').join(',');
    const query = `INSERT INTO bing (${columns.join(',')}) VALUES (${placeholders})`;
    const [result] = await pool.execute(query, values);
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: '数据库错误' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});