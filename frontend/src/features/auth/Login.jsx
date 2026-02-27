import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./authAPI";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser({ email, password });
      navigate("/admin/dashboard"); // مثال توجيه بعد تسجيل الدخول
    } catch (err) {
      setError(err.response?.data?.message || "خطأ في تسجيل الدخول");
    }
  };

  return (
    <div className="login-container">
      <h2>تسجيل الدخول</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">دخول</button>
      </form>
    </div>
  );
}