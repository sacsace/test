-- PostgreSQL 데이터베이스 설정 스크립트
-- 데이터베이스명: test_db

-- 데이터베이스 생성 (관리자 권한으로 실행)
-- CREATE DATABASE test_db;

-- user 테이블 생성
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 샘플 사용자 데이터 삽입 (비밀번호는 'password123'의 해시값)
INSERT INTO users (username, email, password) VALUES 
('admin', 'admin@example.com', '$2b$10$rQZ8K9mN2pL3vX7yE5wB8uJ6kL9mN2pL3vX7yE5wB8uJ6kL9mN2pL3vX'),
('testuser', 'test@example.com', '$2b$10$rQZ8K9mN2pL3vX7yE5wB8uJ6kL9mN2pL3vX7yE5wB8uJ6kL9mN2pL3vX')
ON CONFLICT (username) DO NOTHING;

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
