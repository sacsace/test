const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

console.log('🚀 RAILWAY DEPLOYMENT STARTING 🚀');
console.log('PORT:', PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('RAILWAY_ENVIRONMENT:', process.env.RAILWAY_ENVIRONMENT);
console.log('RAILWAY_PROJECT_ID:', process.env.RAILWAY_PROJECT_ID || 'NOT_SET');
console.log('RAILWAY_SERVICE_ID:', process.env.RAILWAY_SERVICE_ID || 'NOT_SET');
console.log('Current working directory:', process.cwd());
console.log('Server file path:', __filename);

app.use(express.json());
console.log('✅ Middleware setup complete');

// 모든 요청에 대한 상세 로깅 미들웨어
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

console.log('✅ Request logging middleware setup complete');

// 루트 엔드포인트
app.get('/', (req, res) => {
  console.log('✅✅✅ Root endpoint accessed - sending response ✅✅✅');
  res.json({
    message: 'Railway server is running!',
    timestamp: new Date().toISOString(),
    port: PORT,
    environment: process.env.NODE_ENV,
    deployment: 'successful'
  });
});

console.log('✅ Root route setup complete');

// API 엔드포인트들
app.get('/api/health', (req, res) => {
  console.log('✅✅✅ Health check endpoint accessed - sending response ✅✅✅');
  res.json({
    status: 'OK',
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    port: PORT,
    deployment: 'successful'
  });
});

app.get('/api/test', (req, res) => {
  console.log('✅✅✅ Test endpoint accessed - sending response ✅✅✅');
  res.json({
    message: 'Test endpoint working',
    timestamp: new Date().toISOString(),
    port: PORT,
    deployment: 'successful'
  });
});

console.log('✅ API routes setup complete');

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

console.log('✅ 404 handler setup complete');
console.log('📝 About to start server...');

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('🎉🎉🎉 SERVER STARTED SUCCESSFULLY! 🎉🎉🎉');
  console.log(`📍 Port: ${PORT}`);
  console.log('🚀 Ready for debugging!');
  console.log(`🔗 Test URLs:`);
  console.log(`   - http://localhost:${PORT}/`);
  console.log(`   - http://localhost:${PORT}/api/health`);
  console.log(`   - http://localhost:${PORT}/api/test`);
  console.log('🔍 Watch the logs for request details!');
  console.log('🎉🎉🎉 DEPLOYMENT COMPLETE! 🎉🎉🎉');
}).on('error', (err) => {
  console.error('❌❌❌ SERVER ERROR ❌❌❌');
  console.error('Error message:', err.message);
  console.error('Error details:', err);
  console.error('❌❌❌ END ERROR LOG ❌❌❌');
  process.exit(1);
});

console.log('📝 Debug server setup completed');
console.log('🚀🚀🚀 RAILWAY DEPLOYMENT READY 🚀🚀🚀');