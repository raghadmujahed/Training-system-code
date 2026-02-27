import { useState } from "react";
import { sendResetEmail } from "./authAPI";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendResetEmail(email);
      setMessage("تم إرسال رابط استعادة كلمة المرور");
    } catch {
      setMessage("حدث خطأ أثناء الإرسال");
    }
  };

  return (
    <div>
      <h2>استعادة كلمة المرور</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">إرسال</button>
      </form>
    </div>
  );
}