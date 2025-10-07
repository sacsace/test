-- 데이터베이스 연결 테스트용 스크립트
-- 사용법: psql -h localhost -U postgres -d test_db -f test_connection.sql

SELECT 'Database connection successful!' as status;

SELECT 
    id,
    username,
    email,
    created_at
FROM users 
ORDER BY created_at DESC;
