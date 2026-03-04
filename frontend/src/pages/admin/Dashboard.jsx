import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfile } from "../../features/users/usersAPI"; // تأكدي أن الملف موجود

export default function Dashboard() {
  const [user, setUser] = useState({
    name: "",
    avatar: "/default-avatar.png", // صورة افتراضية
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      {/* اسم المستخدم والصورة */}
      <div className="flex items-center mb-6">
        <Link to="/Profile">
          <img
            src={user.avatar || "/default-avatar.png"}
            alt="Profile"
            className="w-16 h-16 rounded-full mr-4 object-cover"
          />
        </Link>
        <div>
          <h2>{user.name}</h2>
          <Link to="/Profile" >
            عرض الملف الشخصي
          </Link>
        </div>
      </div>

      {/* قائمة الروابط */}
      <ul className="space-y-2">
        <li>
          <Link to="/ManageUsers">إدارة المستخدمين</Link>
        </li>
        <li>
          <Link to="/RolesManagement">إدارة الصلاحيات</Link>
        </li>
        <li>
          <Link to="/admin/reports">التقارير</Link>
        </li>
        <li>
          <Link to="/backup">النسخ الاحتياطي</Link>
        </li>
        <li>
          <Link to="/Announcements">الإعلانات العامة</Link>
        </li>
      </ul>
    </div>
  );
}