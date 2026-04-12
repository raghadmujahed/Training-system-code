import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRole, createRole, updateRole, getPermissions } from "../../../services/api";

export default function RoleForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState([]); // تهيئة كمصفوفة فارغة
  const [form, setForm] = useState({ name: "", permissions: [] });
  const [fetching, setFetching] = useState(true); // حالة تحميل البيانات

  useEffect(() => {
    const fetchData = async () => {
      try {
        // جلب الصلاحيات
        const permsData = await getPermissions();
        console.log("Permissions response:", permsData);
        // التأكد من أن البيانات مصفوفة
        setPermissions(permsData.data || permsData || []);
        
        // إذا كان هناك id (تعديل) جلب بيانات الدور
        if (id) {
          const roleData = await getRole(id);
          setForm({
            name: roleData.name,
            permissions: roleData.permissions?.map(p => p.id) || []
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await updateRole(id, form);
      } else {
        await createRole(form);
      }
      navigate("/admin/roles");
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء حفظ الدور");
    } finally {
      setLoading(false);
    }
  };

  const handlePermissionChange = (permId) => {
    setForm(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permId)
        ? prev.permissions.filter(p => p !== permId)
        : [...prev.permissions, permId]
    }));
  };

  if (fetching) return <div>جاري التحميل...</div>;

  return (
    <div>
      <h1>{id ? "تعديل دور" : "إضافة دور جديد"}</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>اسم الدور</label>
          <input
            type="text"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>الصلاحيات</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {permissions.length === 0 ? (
              <p>لا توجد صلاحيات متاحة</p>
            ) : (
              permissions.map(perm => (
                <label key={perm.id}>
                  <input
                    type="checkbox"
                    checked={form.permissions.includes(perm.id)}
                    onChange={() => handlePermissionChange(perm.id)}
                  />
                  {perm.name}
                </label>
              ))
            )}
          </div>
        </div>
        <button type="submit" disabled={loading}>
          {id ? "تحديث" : "إضافة"}
        </button>
      </form>
    </div>
  );
}