import { useState } from "react";
import { createUser } from "../../features/users/usersAPI";

export default function CreateUser() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(user);
      alert("تم إنشاء المستخدم بنجاح");
      setUser({ name: "", email: "", password: "", role: "" });
    } catch (err) {
      alert("حدث خطأ: " + err.response?.data?.message);
    }
  };

  return (
    <div>
      <h2>إنشاء مستخدم جديد</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={user.name} onChange={handleChange} placeholder="الاسم" required />
        <input name="email" value={user.email} onChange={handleChange} placeholder="البريد" required />
        <input name="password" value={user.password} onChange={handleChange} placeholder="كلمة المرور" type="password" required />
        <select name="role" value={user.role} onChange={handleChange} required>
          <option value="">اختر الدور</option>
          <option value="admin">مدير</option>
          <option value="student">طالب</option>
          <option value="supervisor">مشرف</option>
        </select>
        <button type="submit">إنشاء</button>
      </form>
    </div>
  );
}