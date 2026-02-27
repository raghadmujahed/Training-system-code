// src/pages/auth/ForgotPassword.jsx
import React from "react";

function ForgotPassword() {
  return (
    <div className="auth-container">
      <h2>استعادة كلمة المرور</h2>

      <input type="email" placeholder="البريد الإلكتروني" />
      <button>إرسال رابط الاستعادة</button>
    </div>
  );
}

export default ForgotPassword