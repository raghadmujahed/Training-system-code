// src/pages/auth/Login.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    
    const userRole = "STUDENT"; 

    const roleRoutes = {
      ADMIN: "/admin/dashboard",
      STUDENT: "/student/home",
      SUPERVISOR: "/supervisor/home",
      COORDINATOR: "/coordinator/home",
    };

    navigate(roleRoutes[userRole]);
  };

  return (
    <div className="auth-container">
      <h2>تسجيل الدخول</h2>

      <input type="email" placeholder="البريد الإلكتروني" />
      <input type="password" placeholder="كلمة المرور" />

      <button onClick={handleLogin}>دخول</button>

      <Link to="/forgot-password" className="link">
        نسيت كلمة المرور؟
      </Link>
    </div>
  );
}

export default Login;
