const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

console.log('=== Railway Debug Server Starting ===');
console.log('PORT:', PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('RAILWAY_ENVIRONMENT:', process.env.RAILWAY_ENVIRONMENT);
console.log('Current working directory:', process.cwd());
console.log('Server file path:', __filename);
console.log('=====================================');

app.use(express.json());

// 모든 요청에 대한 상세 로깅 미들웨어 (가장 먼저)
app.use((req, res, next) => {
  console.log('🔥🔥🔥 REQUEST RECEIVED 🔥🔥🔥');
  console.log('Method:', req.method);
  console.log('Path:', req.path);
  console.log('URL:', req.url);
  console.log('Original URL:', req.originalUrl);
  console.log('Base URL:', req.baseUrl);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Query:', req.query);
  console.log('Body:', req.body);
  console.log('Timestamp:', new Date().toISOString());
  console.log('🔥🔥🔥 END REQUEST LOG 🔥🔥🔥');
  next();
});

// 루트 엔드포인트
app.get('/', (req, res) => {
  console.log('✅✅✅ Root endpoint accessed - sending response ✅✅✅');
  res.json({
    message: 'Railway server is running!',
    timestamp: new Date().toISOString(),
    port: PORT,
    environment: process.env.NODE_ENV
  });
});

// API 엔드포인트들
app.get('/api/health', (req, res) => {
  console.log('✅✅✅ Health check endpoint accessed - sending response ✅✅✅');
  res.json({
    status: 'OK',
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

app.get('/api/test', (req, res) => {
  console.log('✅✅✅ Test endpoint accessed - sending response ✅✅✅');
  res.json({
    message: 'Test endpoint working',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// 모든 GET 요청에 대한 로깅
app.get('*', (req, res, next) => {
  console.log('🚨🚨🚨 CATCH-ALL GET ROUTE TRIGGERED 🚨🚨🚨');
  console.log('Request path:', req.path);
  console.log('Request URL:', req.url);
  console.log('This should not happen for API routes!');
  console.log('🚨🚨🚨 END CATCH-ALL LOG 🚨🚨🚨');
  next();
});

// 404 핸들러
app.use('*', (req, res) => {
  console.log('❌❌❌ 404 - Route not found ❌❌❌');
  console.log('Method:', req.method);
  console.log('Original URL:', req.originalUrl);
  console.log('Path:', req.path);
  console.log('URL:', req.url);
  console.log('❌❌❌ END 404 LOG ❌❌❌');
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.originalUrl} not found`,
    timestamp: new Date().toISOString(),
    availableRoutes: ['/', '/api/health', '/api/test']
  });
});

console.log('About to start server...');

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('✅ Debug server started successfully!');
  console.log(`📍 Port: ${PORT}`);
  console.log('🚀 Ready for debugging!');
  console.log(`🔗 Test URLs:`);
  console.log(`   - http://localhost:${PORT}/`);
  console.log(`   - http://localhost:${PORT}/api/health`);
  console.log(`   - http://localhost:${PORT}/api/test`);
  console.log('🔍 Watch the logs for request details!');
}).on('error', (err) => {
  console.error('❌ Server error:', err.message);
  console.error('❌ Error details:', err);
  process.exit(1);
});

// 프로세스 이벤트 로깅
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection:', reason);
});

console.log('Debug server setup completed');