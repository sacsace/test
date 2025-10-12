// 간단한 Node.js 서버 (Docker 없음)
const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

console.log('🚀 Starting simple Node.js server...');
console.log('📍 Port:', PORT);
console.log('🌍 Environment:', process.env.NODE_ENV || 'development');

// 미들웨어
app.use(express.json());

// 루트 엔드포인트
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Simple Node.js server running',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// 헬스체크 엔드포인트
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Health check passed',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// 로그인 엔드포인트
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === 'admin' && password === 'password123') {
    res.json({
      message: 'Login successful',
      token: 'dummy_token_123',
      user: {
        id: 1,
        username: 'admin',
        email: 'admin@example.com'
      }
    });
  } else {
    res.status(401).json({
      message: 'Invalid credentials'
    });
  }
});

// 회원가입 엔드포인트
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({
      message: 'All fields are required'
    });
  }
  
  res.status(201).json({
    message: 'Registration successful',
    user: {
      id: 2,
      username,
      email
    }
  });
});

// 사용자 정보 엔드포인트
app.get('/api/user', (req, res) => {
  res.json({
    user: {
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      created_at: new Date().toISOString()
    }
  });
});

// 서버 시작
const server = app.listen(PORT, () => {
  console.log('✅ Server started successfully!');
  console.log(`📍 Running on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🏠 Root: http://localhost:${PORT}/`);
});

// 에러 핸들링
server.on('error', (error) => {
  console.error('❌ Server error:', error);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection:', reason);
});

console.log('📦 Server module loaded');