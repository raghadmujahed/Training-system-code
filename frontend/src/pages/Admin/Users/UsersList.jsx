import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers, deleteUser, changeUserStatus } from "../../../services/api";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ role_id: "", status: "", search: "" });

  useEffect(() => {
    fetchUsers();
  }, [filters]);

const fetchUsers = async () => {
  setLoading(true);
  try {
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== "")
    );

    const response = await getUsers(cleanFilters);

    setUsers(response.data.data ?? response.data);
  } catch (err) {
    console.error(err);
    setError("فشل تحميل المستخدمين");
  } finally {
    setLoading(false);
  }
};

  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المستخدم؟")) {
      try {
        await deleteUser(id);
        fetchUsers();
      } catch (err) {
        alert("حدث خطأ أثناء الحذف");
      }
    }
  };

  const handleStatusChange = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "suspended" : "active";
    try {
      await changeUserStatus(id, newStatus);
      fetchUsers();
    } catch (err) {
      alert("حدث خطأ أثناء تغيير الحالة");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active": return <span className="badge-success">نشط</span>;
      case "inactive": return <span className="badge-warning">غير نشط</span>;
      case "suspended": return <span className="badge-danger">موقوف</span>;
      default: return <span>{status}</span>;
    }
  };

  if (loading) return <div className="text-center">جاري التحميل...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className="users-list">
      <div className="page-header">
        <h1>إدارة المستخدمين</h1>
        <Link to="/admin/users/create" className="btn-primary">+ إضافة مستخدم</Link>
      </div>

      {/* فلاتر */}
      <div className="filters-bar">
        <input
          type="text"
          placeholder="بحث بالاسم أو البريد..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <select
          value={filters.role_id}
          onChange={(e) => setFilters({ ...filters, role_id: e.target.value })}
        >
          <option value="">جميع الأدوار</option>
          <option value="1">مدير النظام</option>
          <option value="2">منسق</option>
          <option value="3">مشرف أكاديمي</option>
          <option value="4">معلم مرشد</option>
          <option value="5">طالب</option>
        </select>
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">جميع الحالات</option>
          <option value="active">نشط</option>
          <option value="inactive">غير نشط</option>
          <option value="suspended">موقوف</option>
        </select>
      </div>

      {/* جدول المستخدمين */}
      <table className="data-table">
        <thead>
          <tr>
            <th>المعرف الجامعي</th>
            <th>الاسم</th>
            <th>البريد الإلكتروني</th>
            <th>الدور</th>
            <th>الحالة</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.university_id || "—"}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role?.name || "—"}</td>
              <td>{getStatusBadge(user.status)}</td>
              <td>
                <Link to={`/admin/users/edit/${user.id}`} className="btn-sm">تعديل</Link>
                <button onClick={() => handleStatusChange(user.id, user.status)} className="btn-sm">
                  {user.status === "active" ? "تعليق" : "تفعيل"}
                </button>
                <button onClick={() => handleDelete(user.id)} className="btn-sm danger">حذف</button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr><td colSpan="6" className="text-center">لا يوجد مستخدمون</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}