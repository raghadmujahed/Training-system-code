import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSections, deleteSection } from "../../../services/api";

export default function SectionsList() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    course_id: "",
    semester: "",
    search: ""
  });

  useEffect(() => {
    fetchSections();
  }, [filters]);

  const fetchSections = async () => {
    setLoading(true);
    try {
      // حذف القيم الفارغة حتى لا تؤثر على الـ API
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== "")
      );

      const response = await getSections(cleanFilters);

      console.log("SECTIONS RESPONSE:", response);

      // دعم pagination أو array عادي
      setSections(response.data.data ?? response.data ?? []);
    } catch (err) {
      setError("فشل تحميل الشعب");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الشعبة؟")) {
      try {
        await deleteSection(id);
        fetchSections();
      } catch (err) {
        alert("حدث خطأ أثناء الحذف");
      }
    }
  };

  const getSemesterLabel = (semester) => {
    switch (semester) {
      case "first":
        return "الفصل الأول";
      case "second":
        return "الفصل الثاني";
      case "summer":
        return "الفصل الصيفي";
      default:
        return semester;
    }
  };

  if (loading) return <div className="text-center">جاري التحميل...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className="sections-list">
      <div className="page-header">
        <h1>إدارة الشعب</h1>
        <Link to="/admin/sections/create" className="btn-primary">
          + إضافة شعبة
        </Link>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <input
          type="text"
          placeholder="بحث باسم الشعبة..."
          value={filters.search}
          onChange={(e) =>
            setFilters({ ...filters, search: e.target.value })
          }
        />

        <select
          value={filters.course_id}
          onChange={(e) =>
            setFilters({ ...filters, course_id: e.target.value })
          }
        >
          <option value="">جميع المساقات</option>
        </select>

        <select
          value={filters.semester}
          onChange={(e) =>
            setFilters({ ...filters, semester: e.target.value })
          }
        >
          <option value="">جميع الفصول</option>
          <option value="first">الفصل الأول</option>
          <option value="second">الفصل الثاني</option>
          <option value="summer">الفصل الصيفي</option>
        </select>
      </div>

      {/* Table */}
      <table className="data-table">
        <thead>
          <tr>
            <th>اسم الشعبة</th>
            <th>المساق</th>
            <th>السنة الأكاديمية</th>
            <th>الفصل</th>
            <th>المشرف الأكاديمي</th>
            <th>الإجراءات</th>
          </tr>
        </thead>

        <tbody>
          {sections.map((section) => (
            <tr key={section.id}>
              <td>{section.name}</td>
              <td>{section.course?.name || "—"}</td>
              <td>{section.academic_year}</td>
              <td>{getSemesterLabel(section.semester)}</td>
              <td>{section.academic_supervisor?.name || "—"}</td>
              <td>
                <Link
                  to={`/admin/sections/edit/${section.id}`}
                  className="btn-sm"
                >
                  تعديل
                </Link>

                <button
                  onClick={() => handleDelete(section.id)}
                  className="btn-sm danger"
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}

          {sections.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center">
                لا توجد شعب
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}