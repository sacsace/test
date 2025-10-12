const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

console.log('=== Railway Server Starting ===');
console.log('PORT:', PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('================================');

app.use(express.json());

// 루트 경로 핸들러
app.get('/', (req, res) => {
  console.log('Root path accessed, serving React app');
  const indexPath = path.join(__dirname, 'client/build', 'index.html');
  console.log('Serving index.html from:', indexPath);
  res.sendFile(indexPath);
});

// API 라우트
app.get('/api/health', (req, res) => {
  console.log('Health check accessed');
  res.json({
    status: 'OK',
    message: 'Server is healthy',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/login', (req, res) => {
  console.log('Login accessed');
  const { username, password } = req.body;
  
  if (username === 'admin' && password === 'password123') {
    res.json({
      message: 'Login successful',
      token: 'dummy_token_123',
      user: { id: 1, username: 'admin', email: 'admin@example.com' }
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.post('/api/register', (req, res) => {
  console.log('Register accessed');
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  res.status(201).json({
    message: 'Registration successful',
    user: { id: 2, username, email }
  });
});

// 정적 파일 서빙
const staticPath = path.join(__dirname, 'client/build');
console.log('Static files path:', staticPath);
app.use(express.static(staticPath));

// React 앱 라우팅
app.get('*', (req, res) => {
  console.log('Frontend route:', req.path);
  const indexPath = path.join(__dirname, 'client/build', 'index.html');
  res.sendFile(indexPath);
});

// 서버 시작
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('✅ Server started successfully!');
  console.log(`📍 Port: ${PORT}`);
  console.log('🚀 Ready!');
});

server.on('error', (err) => {
  console.error('❌ Server error:', err.message);
  process.exit(1);
});

console.log('Server setup completed');