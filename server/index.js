// Railway 통합 서버 (백엔드 + 프론트엔드)
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

console.log('=== Railway Integrated Server Starting ===');
console.log('PORT:', PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('==========================================');

// 미들웨어
app.use(express.json());

// API 라우트 (백엔드)
app.get('/api/health', (req, res) => {
  console.log('Health check endpoint accessed');
  res.status(200).json({ 
    status: 'OK', 
    message: 'Railway integrated server is healthy',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

app.post('/api/login', (req, res) => {
  console.log('Login endpoint accessed');
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

app.post('/api/register', (req, res) => {
  console.log('Register endpoint accessed');
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

app.get('/api/user', (req, res) => {
  console.log('User endpoint accessed');
  res.json({
    user: {
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      created_at: new Date().toISOString()
    }
  });
});

// 정적 파일 서빙 (프론트엔드)
app.use(express.static(path.join(__dirname, '../client/build')));

// React 앱의 모든 라우트를 index.html로 리디렉션
app.get('*', (req, res) => {
  console.log('Frontend route accessed:', req.path);
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// 서버 시작
console.log('Starting Railway integrated server...');
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('✅ Railway integrated server started successfully!');
  console.log(`📍 Server running on port ${PORT}`);
  console.log(`🔗 API Health: http://localhost:${PORT}/api/health`);
  console.log(`🏠 Frontend: http://localhost:${PORT}/`);
  console.log('🚀 Full-stack deployment ready!');
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

console.log('📦 Railway integrated server module loaded');