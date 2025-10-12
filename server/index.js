// Railway 헬스체크 문제 진단용 최소 서버
const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

console.log('=== Railway Debug Info ===');
console.log('PORT:', PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Process started at:', new Date().toISOString());
console.log('========================');

// 가장 간단한 루트 엔드포인트
app.get('/', (req, res) => {
  console.log('Root endpoint accessed');
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// 가장 간단한 헬스체크 엔드포인트
app.get('/api/health', (req, res) => {
  console.log('Health check endpoint accessed');
  res.status(200).json({ 
    status: 'OK', 
    message: 'Health check passed',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// 서버 시작
console.log('Starting server...');
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('✅ Server started successfully!');
  console.log(`📍 Port: ${PORT}`);
  console.log(`🌐 Listening on: 0.0.0.0:${PORT}`);
  console.log(`🔗 Health check URL: http://0.0.0.0:${PORT}/api/health`);
  console.log(`🏠 Root URL: http://0.0.0.0:${PORT}/`);
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