import { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../../features/users/usersAPI";

export default function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    story: "",
    avatar: null, // URL للصورة
  });
  const [password, setPassword] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("story", user.story);
      if (password) formData.append("password", password);
      if (avatarFile) formData.append("avatar", avatarFile);

      await updateProfile(formData, true); // true يعني multipart/form-data
      alert("تم تحديث الملف الشخصي بنجاح!");
      setPassword("");
      setAvatarFile(null);
      fetchProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">ملفي الشخصي</h2>

      <div className="mb-4">
        <label className="block mb-1">الصورة الشخصية:</label>
        <img
          src={avatarFile ? URL.createObjectURL(avatarFile) : user.avatar}
          alt="avatar"
          className="w-32 h-32 object-cover rounded-full mb-2"
        />
        <input
          type="file"
          onChange={(e) => setAvatarFile(e.target.files[0])}
          className="border p-2 w-full mb-2"
        />

        <label className="block mb-1">الاسم:</label>
        <input
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          className="border p-2 w-full mb-2"
        />

        <label className="block mb-1">البريد الإلكتروني:</label>
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="border p-2 w-full mb-2"
        />

        <label className="block mb-1">كلمة المرور الجديدة:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="اتركه فارغًا إذا لم تريد التغيير"
          className="border p-2 w-full mb-2"
        />

        <label className="block mb-1">قصتي / معلومات إضافية:</label>
        <textarea
          value={user.story}
          onChange={(e) => setUser({ ...user, story: e.target.value })}
          placeholder="شارك قصتك أو معلومات عنك"
          className="border p-2 w-full mb-2"
        />

        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          حفظ التغييرات
        </button>
      </div>
    </div>
  );
}