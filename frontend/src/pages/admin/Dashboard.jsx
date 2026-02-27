import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <h2>لوحة تحكم مدير النظام</h2>
      <ul>
        <li><Link to="/admin/users">إدارة المستخدمين</Link></li>
        <li><Link to="/admin/roles">إدارة الصلاحيات</Link></li>
        <li><Link to="/admin/reports">التقارير</Link></li>
        <li><Link to="/admin/backup">النسخ الاحتياطي</Link></li>
        <li><Link to="/admin/announcements">الإعلانات العامة</Link></li>
      </ul>
    </div>
  );
}