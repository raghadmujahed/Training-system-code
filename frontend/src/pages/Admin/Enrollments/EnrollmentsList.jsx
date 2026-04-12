import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEnrollments, deleteEnrollment } from "../../../services/api";

export default function EnrollmentsList() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ section_id: "", semester: "", status: "" });

  useEffect(() => {
    fetchEnrollments();
  }, [filters]);

  const fetchEnrollments = async () => {
    setLoading(true);
    try {
      const response = await getEnrollments(filters);
      setEnrollments(response.data || []);
    } catch (err) {
      setError("فشل تحميل التسجيلات");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا التسجيل؟")) {
      try {
        await deleteEnrollment(id);
        fetchEnrollments();
      } catch (err) {
        alert("حدث خطأ أثناء الحذف");
      }
    }
  };

  const getSemesterLabel = (semester) => {
    switch (semester) {
      case "first": return "الفصل الأول";
      case "second": return "الفصل الثاني";
      case "summer": return "الفصل الصيفي";
      default: return semester;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "active": return <span className="badge-success">نشط</span>;
      case "dropped": return <span className="badge-danger">منسحب</span>;
      case "completed": return <span className="badge-info">مكتمل</span>;
      default: return <span>{status}</span>;
    }
  };

  if (loading) return <div className="text-center">جاري التحميل...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className="enrollments-list">
      <div className="page-header">
        <h1>تسجيل الطلاب في الشعب</h1>
        <Link to="/admin/enrollments/create" className="btn-primary">+ تسجيل طالب</Link>
      </div>

      <div className="filters-bar">
        <input
          type="text"
          placeholder="بحث باسم الطالب..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <select
          value={filters.section_id}
          onChange={(e) => setFilters({ ...filters, section_id: e.target.value })}
        >
          <option value="">جميع الشعب</option>
          {/* يمكن جلب الشعب من API وجعلها ديناميكية */}
        </select>
        <select
          value={filters.semester}
          onChange={(e) => setFilters({ ...filters, semester: e.target.value })}
        >
          <option value="">جميع الفصول</option>
          <option value="first">الفصل الأول</option>
          <option value="second">الفصل الثاني</option>
          <option value="summer">الفصل الصيفي</option>
        </select>
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">جميع الحالات</option>
          <option value="active">نشط</option>
          <option value="dropped">منسحب</option>
          <option value="completed">مكتمل</option>
        </select>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>الطالب</th>
            <th>الشعبة</th>
            <th>المساق</th>
            <th>السنة الأكاديمية</th>
            <th>الفصل</th>
            <th>الحالة</th>
            <th>الدرجة النهائية</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map(enrollment => (
            <tr key={enrollment.id}>
              <td>{enrollment.user?.name || "—"}</td>
              <td>{enrollment.section?.name || "—"}</td>
              <td>{enrollment.section?.course?.name || "—"}</td>
              <td>{enrollment.academic_year}</td>
              <td>{getSemesterLabel(enrollment.semester)}</td>
              <td>{getStatusLabel(enrollment.status)}</td>
              <td>{enrollment.final_grade || "—"}</td>
              <td>
                <Link to={`/admin/enrollments/edit/${enrollment.id}`} className="btn-sm">تعديل</Link>
                <button onClick={() => handleDelete(enrollment.id)} className="btn-sm danger">حذف</button>
              </td>
            </tr>
          ))}
          {enrollments.length === 0 && (
            <tr><td colSpan="8" className="text-center">لا توجد تسجيلات</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}