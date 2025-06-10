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

// 初始化SCL90表
async function initScl90Table() {
  try {
    const columns = Array.from({ length: 90 }, (_, i) => `q${i + 1} TINYINT`).join(', ');
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS scl90 (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255),
        ${columns},
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (username) REFERENCES users(username)
      )
    `);
    console.log('SCL90表初始化完成');
  } catch (error) {
    console.error('初始化SCL90表失败:', error);
  }
}

initUserTable();
initScl90Table();

// 用户登录
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  // 验证请求参数
  if (!username || !password) {
    return res.status(400).json({ success: false, message: '用户名和密码不能为空' });
  }

  try {
    // 获取用户，明确选择password_hash字段
    const [users] = await pool.execute(
      'SELECT id, username, password_hash FROM users WHERE username = ?', 
      [username]
    );

    const user = users[0];

    if (!user) {
      return res.status(401).json({ success: false, message: '用户名不存在' });
    }

    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: '密码错误' });
    }

    // 生成JWT，添加isAdmin标识
    const token = jwt.sign({ userId: user.id, username: user.username, isAdmin: username === 'admin' }, secretKey, {
      expiresIn: '1h'
    });

    res.json({ success: true, token, isAdmin: username === 'admin' });
  } catch (error) {
    console.error('登录错误:', error);
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

// 用户注册
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  // 验证请求参数
  if (!username || !password) {
    return res.status(400).json({ success: false, message: '用户名和密码不能为空' });
  }

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

    console.log(`用户 ${username} 注册成功，密码哈希已保存`);
    res.json({ success: true });
  } catch (error) {
    console.error('注册错误:', error);
    res.status(500).json({ success: false, message: '注册失败' });
  }
});

// 处理SCL-90问卷提交
app.post('/api/scl90survey', authenticateToken, async (req, res) => {
  const { answers } = req.body;
  const username = req.user.username;

  try {
    // 验证答案完整性
    if (!Array.isArray(answers) || answers.length !== 90) {
      return res.status(400).json({ success: false, message: '答案格式不正确' });
    }

    // 构建SQL插入语句
    const columns = Array.from({ length: 90 }, (_, i) => `q${i + 1}`);
    const values = [...answers];
    const placeholders = values.map(() => '?').join(',');
    const query = `INSERT INTO scl90 (username, ${columns.join(',')}) VALUES (?, ${placeholders})`;

    // 执行插入
    const [result] = await pool.execute(query, [username, ...values]);
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error('SCL90Survey提交错误:', error);
    res.status(500).json({ success: false, message: '数据库错误', error: error.message });
  }
});

// 获取用户的SCL-90历史记录
app.get('/api/scl90history', authenticateToken, async (req, res) => {
  const username = req.user.username;

  try {
    const [rows] = await pool.execute(
      'SELECT * FROM scl90 WHERE username = ? ORDER BY created_at DESC', 
      [username]
    );
    
    // 将数据库格式转换为前端格式
    const formattedRows = rows.map(row => {
      const answers = Array.from({ length: 90 }, (_, i) => row[`q${i + 1}`]);
      return { ...row, answers };
    });
    
    res.json({ success: true, data: formattedRows });
  } catch (error) {
    console.error('获取SCL90历史记录错误:', error);
    res.status(500).json({ success: false, message: '数据库错误', error: error.message });
  }
});

// 获取所有用户的SCL-90历史记录（仅管理员）
app.get('/api/admin/scl90history', authenticateToken, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ success: false, message: '只有管理员可以访问此接口' });
  }
  
  const { username } = req.query;
  let query = 'SELECT * FROM scl90';
  let values = [];
  
  // 如果提供了用户名参数，则按用户名过滤
  if (username) {
    query += ' WHERE username = ?';
    values.push(username);
  }
  
  query += ' ORDER BY created_at DESC';

  try {
    const [rows] = await pool.execute(query, values);
    
    // 将数据库格式转换为前端格式
    const formattedRows = rows.map(row => {
      const answers = Array.from({ length: 90 }, (_, i) => row[`q${i + 1}`]);
      return { ...row, answers };
    });
    
    res.json({ success: true, data: formattedRows });
  } catch (error) {
    console.error('获取SCL90历史记录错误:', error);
    res.status(500).json({ success: false, message: '数据库错误', error: error.message });
  }
});

// 管理员添加SCL-90记录
app.post('/api/admin/scl90history', authenticateToken, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ success: false, message: '只有管理员可以访问此接口' });
  }

  const { username, answers } = req.body;

  try {
    // 验证请求参数
    if (!username || !answers || !Array.isArray(answers) || answers.length !== 90) {
      return res.status(400).json({ success: false, message: '无效的请求数据' });
    }

    // 检查用户是否存在
    const [users] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
    if (users.length === 0) {
      return res.status(400).json({ success: false, message: '用户不存在' });
    }

    // 构建SQL插入语句
    const columns = Array.from({ length: 90 }, (_, i) => `q${i + 1}`);
    const values = [...answers];
    const placeholders = values.map(() => '?').join(',');
    const query = `INSERT INTO scl90 (username, ${columns.join(',')}) VALUES (?, ${placeholders})`;

    // 执行插入
    const [result] = await pool.execute(query, [username, ...values]);
    res.json({ success: true, id: result.insertId, message: '记录添加成功' });
  } catch (error) {
    console.error('添加SCL90记录错误:', error);
    res.status(500).json({ success: false, message: '数据库错误', error: error.message });
  }
});

// 删除用户的SCL-90记录（仅管理员）
app.delete('/api/admin/scl90history/:id', authenticateToken, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ success: false, message: '只有管理员可以访问此接口' });
  }

  const id = req.params.id;
  try {
    // 检查记录是否存在
    const [records] = await pool.execute('SELECT * FROM scl90 WHERE id = ?', [id]);
    if (records.length === 0) {
      return res.status(404).json({ success: false, message: '记录不存在' });
    }
    
    await pool.execute('DELETE FROM scl90 WHERE id = ?', [id]);
    res.json({ success: true, message: '记录删除成功' });
  } catch (error) {
    console.error('删除SCL90记录错误:', error);
    res.status(500).json({ success: false, message: '数据库错误' });
  }
});

// 更新用户的SCL-90记录（仅管理员）
app.put('/api/admin/scl90history/:id', authenticateToken, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ success: false, message: '只有管理员可以访问此接口' });
  }

  const id = req.params.id;
  const { username, answers } = req.body;

  try {
    // 验证请求参数
    if (!username || !answers || !Array.isArray(answers) || answers.length !== 90) {
      return res.status(400).json({ success: false, message: '无效的请求数据' });
    }

    // 检查记录是否存在
    const [records] = await pool.execute('SELECT * FROM scl90 WHERE id = ?', [id]);
    if (records.length === 0) {
      return res.status(404).json({ success: false, message: '记录不存在' });
    }

    // 检查用户是否存在
    const [users] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
    if (users.length === 0) {
      return res.status(400).json({ success: false, message: '用户不存在' });
    }

    // 构建SQL更新语句
    const setClauses = Array.from({ length: 90 }, (_, i) => `q${i + 1} = ?`).join(', ');
    const values = [...answers, id];
    const query = `UPDATE scl90 SET username = ?, ${setClauses} WHERE id = ?`;

    await pool.execute(query, [username, ...values]);
    res.json({ success: true, message: '记录更新成功' });
  } catch (error) {
    console.error('更新SCL90记录错误:', error);
    res.status(500).json({ success: false, message: '数据库错误', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});