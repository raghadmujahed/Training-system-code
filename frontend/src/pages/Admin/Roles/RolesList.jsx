import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRoles, deleteRole } from "../../../services/api";

export default function RolesList() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchRoles(); }, []);

  const fetchRoles = async () => {
    try {
      const data = await getRoles();
      setRoles(data.data || []);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد؟")) {
      await deleteRole(id);
      fetchRoles();
    }
  };

  if (loading) return <div>جاري التحميل...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>إدارة الأدوار</h1>
        <Link to="/admin/roles/create" className="btn-primary">+ إضافة دور</Link>
      </div>
      <table className="data-table">
        <thead><tr><th>#</th><th>اسم الدور</th><th>الإجراءات</th></tr></thead>
        <tbody>
          {roles.map(role => (
            <tr key={role.id}>
              <td>{role.id}</td>
              <td>{role.name}</td>
              <td>
                <Link to={`/admin/roles/edit/${role.id}`} className="btn-sm">تعديل</Link>
                <button onClick={() => handleDelete(role.id)} className="btn-sm danger">حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}