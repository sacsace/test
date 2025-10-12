const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // Railway 기본값에 맞춤

// 최대한 상세한 디버깅 로깅
console.log('🚀🚀🚀 RAILWAY DEPLOYMENT STARTING 🚀🚀🚀');
console.log('==========================================');
console.log('PORT:', PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('RAILWAY_ENVIRONMENT:', process.env.RAILWAY_ENVIRONMENT);
console.log('RAILWAY_PROJECT_ID:', process.env.RAILWAY_PROJECT_ID || 'NOT_SET');
console.log('RAILWAY_SERVICE_ID:', process.env.RAILWAY_SERVICE_ID || 'NOT_SET');
console.log('RAILWAY_PUBLIC_DOMAIN:', process.env.RAILWAY_PUBLIC_DOMAIN || 'NOT_SET');
console.log('RAILWAY_STATIC_URL:', process.env.RAILWAY_STATIC_URL || 'NOT_SET');
console.log('RAILWAY_SERVICE_TEST_URL:', process.env.RAILWAY_SERVICE_TEST_URL || 'NOT_SET');
console.log('RAILWAY_PRIVATE_DOMAIN:', process.env.RAILWAY_PRIVATE_DOMAIN || 'NOT_SET');
console.log('Current working directory:', process.cwd());
console.log('Server file path:', __filename);
console.log('Process ID:', process.pid);
console.log('Node version:', process.version);
console.log('Platform:', process.platform);
console.log('Architecture:', process.arch);
console.log('Memory usage:', process.memoryUsage());
console.log('==========================================');

console.log('📝 Setting up Express app...');
app.use(express.json());
console.log('✅ Express JSON middleware setup complete');

// 모든 요청에 대한 최대한 상세한 로깅
app.use((req, res, next) => {
  console.log('🔥🔥🔥🔥🔥 REQUEST RECEIVED 🔥🔥🔥🔥🔥');
  console.log('Method:', req.method);
  console.log('Path:', req.path);
  console.log('URL:', req.url);
  console.log('Original URL:', req.originalUrl);
  console.log('Base URL:', req.baseUrl);
  console.log('Protocol:', req.protocol);
  console.log('Secure:', req.secure);
  console.log('Host:', req.get('host'));
  console.log('User-Agent:', req.get('user-agent'));
  console.log('Accept:', req.get('accept'));
  console.log('Content-Type:', req.get('content-type'));
  console.log('Referer:', req.get('referer'));
  console.log('Origin:', req.get('origin'));
  console.log('X-Forwarded-For:', req.get('x-forwarded-for'));
  console.log('X-Forwarded-Proto:', req.get('x-forwarded-proto'));
  console.log('X-Forwarded-Host:', req.get('x-forwarded-host'));
  console.log('X-Real-IP:', req.get('x-real-ip'));
  console.log('CF-Connecting-IP:', req.get('cf-connecting-ip'));
  console.log('X-Forwarded-Port:', req.get('x-forwarded-port'));
  console.log('X-Forwarded-Scheme:', req.get('x-forwarded-scheme'));
  console.log('All Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Query:', req.query);
  console.log('Body:', req.body);
  console.log('IP:', req.ip);
  console.log('IPs:', req.ips);
  console.log('Timestamp:', new Date().toISOString());
  console.log('🔥🔥🔥🔥🔥 END REQUEST LOG 🔥🔥🔥🔥🔥');
  next();
});

console.log('✅ Request logging middleware setup complete');

// 루트 엔드포인트
app.get('/', (req, res) => {
  console.log('✅✅✅✅✅ Root endpoint accessed ✅✅✅✅✅');
  console.log('Sending response for root endpoint');
  res.json({
    message: 'Railway server is running!',
    timestamp: new Date().toISOString(),
    port: PORT,
    environment: process.env.NODE_ENV,
    deployment: 'successful',
    debug: 'Root endpoint working',
    publicDomain: process.env.RAILWAY_PUBLIC_DOMAIN,
    staticUrl: process.env.RAILWAY_STATIC_URL,
    privateDomain: process.env.RAILWAY_PRIVATE_DOMAIN
  });
  console.log('✅ Root endpoint response sent');
});

console.log('✅ Root route setup complete');

// API 엔드포인트들 (더 명확하게 정의)
app.get('/api/health', (req, res) => {
  console.log('✅✅✅✅✅ Health check endpoint accessed ✅✅✅✅✅');
  console.log('Sending health check response');
    res.json({
    status: 'OK',
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    port: PORT,
    deployment: 'successful',
    debug: 'Health endpoint working',
    publicDomain: process.env.RAILWAY_PUBLIC_DOMAIN,
    staticUrl: process.env.RAILWAY_STATIC_URL,
    privateDomain: process.env.RAILWAY_PRIVATE_DOMAIN
  });
  console.log('✅ Health check response sent');
});

app.get('/api/test', (req, res) => {
  console.log('✅✅✅✅✅ Test endpoint accessed ✅✅✅✅✅');
  console.log('Sending test response');
  res.json({
    message: 'Test endpoint working',
    timestamp: new Date().toISOString(),
    port: PORT,
    deployment: 'successful',
    debug: 'Test endpoint working',
    publicDomain: process.env.RAILWAY_PUBLIC_DOMAIN,
    staticUrl: process.env.RAILWAY_STATIC_URL,
    privateDomain: process.env.RAILWAY_PRIVATE_DOMAIN
  });
  console.log('✅ Test endpoint response sent');
});

// API 라우트 그룹 (더 명확하게)
app.use('/api', (req, res, next) => {
  console.log('🚨🚨🚨🚨🚨 API ROUTE GROUP TRIGGERED 🚨🚨🚨🚨🚨');
  console.log('Request path:', req.path);
  console.log('Request URL:', req.url);
  console.log('This should not happen for defined API routes!');
  console.log('🚨🚨🚨🚨🚨 END API ROUTE GROUP LOG 🚨🚨🚨🚨🚨');
  next();
});

console.log('✅ API routes setup complete');

// 404 핸들러
app.use('*', (req, res) => {
  console.log('❌❌❌❌❌ 404 - Route not found ❌❌❌❌❌');
  console.log('Method:', req.method);
  console.log('Original URL:', req.originalUrl);
  console.log('Path:', req.path);
  console.log('URL:', req.url);
  console.log('Available routes: /, /api/health, /api/test');
  console.log('❌❌❌❌❌ END 404 LOG ❌❌❌❌❌');
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.originalUrl} not found`,
    timestamp: new Date().toISOString(),
    availableRoutes: ['/', '/api/health', '/api/test'],
    debug: 'Route not found',
    publicDomain: process.env.RAILWAY_PUBLIC_DOMAIN,
    staticUrl: process.env.RAILWAY_STATIC_URL,
    privateDomain: process.env.RAILWAY_PRIVATE_DOMAIN
  });
});

console.log('✅ 404 handler setup complete');
console.log('📝 About to start server...');

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('🎉🎉🎉🎉🎉 SERVER STARTED SUCCESSFULLY! 🎉🎉🎉🎉🎉');
  console.log(`📍 Port: ${PORT}`);
  console.log(`📍 Host: 0.0.0.0 (all interfaces)`);
  console.log('🚀 Ready for debugging!');
  console.log(`🔗 Test URLs:`);
  console.log(`   - http://localhost:${PORT}/`);
  console.log(`   - http://localhost:${PORT}/api/health`);
  console.log(`   - http://localhost:${PORT}/api/test`);
  console.log(`🌐 Public Domain: ${process.env.RAILWAY_PUBLIC_DOMAIN}`);
  console.log(`🌐 Static URL: ${process.env.RAILWAY_STATIC_URL}`);
  console.log(`🌐 Private Domain: ${process.env.RAILWAY_PRIVATE_DOMAIN}`);
  console.log('🔍 Watch the logs for request details!');
  console.log('🎉🎉🎉🎉🎉 DEPLOYMENT COMPLETE! 🎉🎉🎉🎉🎉');
  
  // 서버 주소 정보 출력
  const address = server.address();
  console.log('📡 Server listening on:', address);
}).on('error', (err) => {
  console.error('❌❌❌❌❌ SERVER ERROR ❌❌❌❌❌');
  console.error('Error message:', err.message);
  console.error('Error code:', err.code);
  console.error('Error details:', err);
  console.error('❌❌❌❌❌ END ERROR LOG ❌❌❌❌❌');
  process.exit(1);
});

// 서버 이벤트 로깅
server.on('connection', (socket) => {
  console.log('🔌 New connection established');
  console.log('Socket remote address:', socket.remoteAddress);
  console.log('Socket remote port:', socket.remotePort);
  console.log('Socket local address:', socket.localAddress);
  console.log('Socket local port:', socket.localPort);
});

server.on('request', (req, res) => {
  console.log('📨 Server received request:', req.method, req.url);
});

server.on('close', () => {
  console.log('📝 Server closed');
});

server.on('error', (err) => {
  console.error('❌ Server error:', err);
});

// 프로세스 이벤트 로깅
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  console.error('Stack:', error.stack);
  // 서버를 종료하지 않고 계속 실행
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection:', reason);
  console.error('Promise:', promise);
  // 서버를 종료하지 않고 계속 실행
});

process.on('SIGTERM', () => {
  console.log('📝 SIGTERM received, shutting down gracefully');
  console.log('📝 Reason: Railway requested shutdown');
  server.close(() => {
    console.log('📝 Server closed gracefully');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('📝 SIGINT received, shutting down gracefully');
  console.log('📝 Reason: Manual shutdown');
  server.close(() => {
    console.log('📝 Server closed gracefully');
    process.exit(0);
  });
});

// 서버 안정성 모니터링
setInterval(() => {
  const memUsage = process.memoryUsage();
  console.log('📊 Memory usage:', {
    rss: Math.round(memUsage.rss / 1024 / 1024) + 'MB',
    heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024) + 'MB',
    heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024) + 'MB',
    external: Math.round(memUsage.external / 1024 / 1024) + 'MB'
  });
}, 30000); // 30초마다 메모리 사용량 로깅

console.log('📝 Debug server setup completed');
console.log('🚀🚀🚀🚀🚀 RAILWAY DEPLOYMENT READY 🚀🚀🚀🚀🚀');