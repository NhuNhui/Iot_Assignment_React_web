// src/pages/Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import './Login.css';

function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
      navigate('/dashboard'); // Nếu đã đăng nhập, chuyển hướng ngay
    }
  }, [navigate, setIsAuthenticated]);

  const validUsers = [
    { username: 'admin', password: '123456' },
    { username: 'user1', password: 'password' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const user = validUsers.find(u => u.username === username && u.password === password);
    if (user) {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true"); // Lưu trạng thái đăng nhập
      navigate('/dashboard'); // Chuyển hướng ngay lập tức
    } else {
      setError('Sai tài khoản hoặc mật khẩu!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Đăng nhập</h1>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <FaUser className="icon" />
            <input
              type="text"
              placeholder="Tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Đăng nhập</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
