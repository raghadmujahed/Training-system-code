import { useState } from "react";

// --- استبدل هذا المصفوفة الفارغة ببيانات API ---
const initialSections = [];

export default function Sections() {
  const [sections] = useState(initialSections);
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered =
    filterStatus === "all"
      ? sections
      : sections.filter((s) => s.status === filterStatus);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-primary">الشعب الدراسية</h1>
        <p className="text-muted-foreground text-sm mt-1">
          عرض ومتابعة الشعب الدراسية المسجلة للتدريب الميداني
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        {[
          { label: "إجمالي الشعب", value: sections.length, cls: "primary" },
          { label: "إجمالي الطلبة", value: sections.reduce((a, s) => a + s.studentsCount, 0), cls: "accent" },
          { label: "شعب نشطة", value: sections.filter((s) => s.status === "نشطة").length, cls: "success" },
          { label: "بدون مشرف", value: sections.filter((s) => !s.supervisorName).length, cls: "warning" },
        ].map((stat) => (
          <div key={stat.label} className={`stat-card ${stat.cls} rounded-2xl p-4`}>
            <div className="text-white/70 text-xs mb-1">{stat.label}</div>
            <div className="text-2xl font-black">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="card mb-4">
        <select
          className="form-select"
          style={{ maxWidth: 200 }}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">جميع الحالات</option>
          <option value="نشطة">نشطة</option>
          <option value="بانتظار التعيين">بانتظار التعيين</option>
          <option value="مغلقة">مغلقة</option>
        </select>
      </div>

      {/* Table */}
      <div className="card">
        <h3 className="font-black text-primary mb-4">
          قائمة الشعب ({filtered.length})
        </h3>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <p className="text-3xl mb-3">📚</p>
            <h4 className="font-bold text-foreground mb-1">لا توجد بيانات</h4>
            <p className="text-muted-foreground text-sm">لم يتم ربط قاعدة البيانات بعد</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>اسم الشعبة</th>
                  <th>المساق</th>
                  <th>القسم</th>
                  <th>المشرف</th>
                  <th>الطلبة</th>
                  <th>الحالة</th>
                  <th>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <tr key={s.id}>
                    <td className="text-muted-foreground text-xs">{i + 1}</td>
                    <td className="font-bold">{s.name}</td>
                    <td className="text-sm">{s.course}</td>
                    <td className="text-sm">{s.department}</td>
                    <td>
                      <span className={`badge ${s.supervisorName ? "badge-success" : "badge-warning"}`}>
                        {s.supervisorName ?? "غير معين"}
                      </span>
                    </td>
                    <td className="font-bold text-sm">{s.studentsCount}</td>
                    <td>
                      <span className={`badge ${s.status === "نشطة" ? "badge-success" : s.status === "مغلقة" ? "badge-danger" : "badge-warning"}`}>
                        {s.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-outline btn-sm">عرض الطلبة</button>
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