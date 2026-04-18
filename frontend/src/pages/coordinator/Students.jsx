import { useState } from "react";

const statusBadge = (status) => {
  const map = {
    "مقبول": "badge-success",
    "قيد المتابعة": "badge-warning",
    "منجز": "badge-primary",
    "بانتظار التوزيع": "badge-info",
    "منسحب": "badge-danger",
  };
  return map[status] || "badge-soft";
};

// --- استبدل هذا المصفوفة الفارغة ببيانات API ---
const initialStudents = [];

export default function Students() {
  const [students] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = students.filter((s) => {
    const matchSearch =
      s.name.includes(search) ||
      s.universityId.includes(search) ||
      s.department.includes(search);
    const matchStatus = filterStatus === "all" || s.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-primary">إدارة بيانات الطلبة</h1>
        <p className="text-muted-foreground text-sm mt-1">
          قائمة الطلبة المسجلين في مساقات التدريب الميداني
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        {[
          { label: "الإجمالي", value: students.length, cls: "primary" },
          { label: "مقبول", value: students.filter((s) => s.status === "مقبول").length, cls: "success" },
          { label: "قيد المتابعة", value: students.filter((s) => s.status === "قيد المتابعة").length, cls: "warning" },
          { label: "منسحب", value: students.filter((s) => s.status === "منسحب").length, cls: "danger" },
        ].map((stat) => (
          <div key={stat.label} className={`stat-card ${stat.cls} rounded-2xl p-4`}>
            <div className="text-white/70 text-xs mb-1">{stat.label}</div>
            <div className="text-2xl font-black">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card mb-4">
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="بحث بالاسم أو الرقم الجامعي أو القسم..."
            className="form-input flex-1 min-w-48"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="form-select"
            style={{ maxWidth: 220 }}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">جميع الحالات</option>
            <option value="مقبول">مقبول</option>
            <option value="قيد المتابعة">قيد المتابعة</option>
            <option value="بانتظار التوزيع">بانتظار التوزيع</option>
            <option value="منجز">منجز</option>
            <option value="منسحب">منسحب</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-black text-primary">قائمة الطلبة</h3>
          <span className="badge badge-primary">{filtered.length} طالب/ة</span>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <p className="text-3xl mb-3">👨‍🎓</p>
            <h4 className="font-bold text-foreground mb-1">لا توجد بيانات</h4>
            <p className="text-muted-foreground text-sm">
              {students.length === 0
                ? "لم يتم ربط قاعدة البيانات بعد"
                : "لا توجد نتائج تطابق البحث"}
            </p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>الاسم</th>
                  <th>الرقم الجامعي</th>
                  <th>القسم</th>
                  <th>المساق</th>
                  <th>الشعبة</th>
                  <th>مكان التدريب</th>
                  <th>الحالة</th>
                  <th>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <tr key={s.id}>
                    <td className="text-muted-foreground text-xs">{i + 1}</td>
                    <td className="font-bold">{s.name}</td>
                    <td className="text-sm">{s.universityId}</td>
                    <td className="text-sm">{s.department}</td>
                    <td className="text-sm">{s.course}</td>
                    <td className="text-sm">{s.section}</td>
                    <td className="text-sm">
                      {s.trainingSite || (
                        <span className="text-muted-foreground">غير محدد</span>
                      )}
                    </td>
                    <td>
                      <span className={`badge ${statusBadge(s.status)}`}>
                        {s.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-outline btn-sm">التفاصيل</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}