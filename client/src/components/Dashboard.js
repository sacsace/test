import React from 'react';
import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onLogout();
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>대시보드</h1>
        <button onClick={handleLogout} className="logout-button">
          로그아웃
        </button>
      </div>
      
      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>환영합니다!</h2>
          <div className="user-info">
            <p><strong>사용자명:</strong> {user.username}</p>
            <p><strong>이메일:</strong> {user.email}</p>
            <p><strong>가입일:</strong> {new Date(user.created_at).toLocaleDateString('ko-KR')}</p>
          </div>
        </div>
        
        <div className="info-cards">
          <div className="info-card">
            <h3>시스템 상태</h3>
            <p>정상 작동 중</p>
          </div>
          
          <div className="info-card">
            <h3>데이터베이스</h3>
            <p>PostgreSQL 연결됨</p>
          </div>
          
          <div className="info-card">
            <h3>서버</h3>
            <p>Node.js + Express</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;