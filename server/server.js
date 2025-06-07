const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 3307;

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

// 测试数据库连接
app.get('/api/test', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT 1 + 1 AS result');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Database error' });
  }
});

// 获取用户列表
app.get('/api/users', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM users');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Database error' });
  }
});

// 添加用户
app.post('/api/users', async (req, res) => {
  const { username, email } = req.body;
  try {
    const [result] = await pool.execute(
      'INSERT INTO users (username, email) VALUES (?, ?)',
      [username, email]
    );
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Database error' });
  }
});

// 处理心理测评提交
app.post('/api/survey', async (req, res) => {
  const { q1, q2 } = req.body;
  try {
    // 这里可以将数据插入到数据库中
    // 示例：const [result] = await pool.execute('INSERT INTO surveys (q1, q2) VALUES (?, ?)', [q1, q2]);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Database error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});