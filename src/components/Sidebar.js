// src/components/Sidebar.js
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // Xóa trạng thái đăng nhập
    setIsAuthenticated(false);
    navigate("/login"); // Chuyển hướng về trang đăng nhập
  };

  return (
    <nav className="sidebar">
      <h3>Menu</h3>
      <ul>
        <li>
          <NavLink to="/dashboard" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/control" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
            Control
          </NavLink>
        </li>
        <li>
          <NavLink to="/analytic" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
            Analytic
          </NavLink>
        </li>
        <li>
          <NavLink to="/rfid" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
            RFID
          </NavLink>
        </li>
      </ul>
      <button className="logout-button" onClick={handleLogout}>Đăng xuất</button>
    </nav>
  );
}

export default Sidebar;
