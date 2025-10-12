// Railway Docker 환경 호환 서버
const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

// Docker 환경 정보 로깅
console.log('=== Docker Environment Info ===');
console.log('PORT:', PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('HOSTNAME:', process.env.HOSTNAME);
console.log('Process started at:', new Date().toISOString());
console.log('==============================');

// 모든 인터페이스에서 수신 대기 (Docker 호환)
const HOST = '0.0.0.0';

// 가장 간단한 루트 엔드포인트
app.get('/', (req, res) => {
  console.log('Root endpoint accessed');
  res.json({ 
    status: 'OK', 
    message: 'Docker server is running',
    port: PORT,
    host: HOST,
    timestamp: new Date().toISOString()
  });
});

// 헬스체크 엔드포인트 (Docker HEALTHCHECK용)
app.get('/api/health', (req, res) => {
  console.log('Health check endpoint accessed');
  res.status(200).json({ 
    status: 'OK', 
    message: 'Docker health check passed',
    timestamp: new Date().toISOString(),
    port: PORT,
    host: HOST
  });
});

// 서버 시작
console.log('Starting Docker-compatible server...');
const server = app.listen(PORT, HOST, () => {
  console.log('✅ Docker server started successfully!');
  console.log(`📍 Port: ${PORT}`);
  console.log(`🌐 Host: ${HOST}`);
  console.log(`🔗 Health check URL: http://${HOST}:${PORT}/api/health`);
  console.log(`🏠 Root URL: http://${HOST}:${PORT}/`);
  console.log('🐳 Docker environment ready!');
});

// 에러 핸들링
server.on('error', (error) => {
  console.error('❌ Docker server error:', error);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection:', reason);
});

console.log('📦 Docker server module loaded');