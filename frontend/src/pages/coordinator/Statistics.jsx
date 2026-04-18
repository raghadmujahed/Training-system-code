// Statistics — الإحصائيات
// ربط البيانات: استبدل كل الأرقام الصفرية بقيم من API

// --- استبدل هذه القيم بنتائج API ---
const summaryStats = [
  { label: "إجمالي الطلبة", value: 0, color: "#17324b" },
  { label: "تم التوزيع", value: 0, color: "#b08d57" },
  { label: "بانتظار التوزيع", value: 0, color: "#d18b1f" },
  { label: "أنهوا التدريب", value: 0, color: "#1f8f63" },
  { label: "عدد الشعب النشطة", value: 0, color: "#3b82b6" },
  { label: "عدد المشرفين", value: 0, color: "#7c3aed" },
  { label: "أماكن التدريب المتاحة", value: 0, color: "#0891b2" },
  { label: "كتب مُرسَلة", value: 0, color: "#b08d57" },
];

// بيانات المشرفين — استبدل بنتائج API
const supervisorRows = [];

// بيانات أماكن التدريب — استبدل بنتائج API
const siteRows = [];

export default function Statistics() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-primary">الإحصائيات والتقارير</h1>
        <p className="text-muted-foreground text-sm mt-1">
          تقارير شاملة عن التدريب الميداني | الفصل الثاني 2025-2026
        </p>
      </div>

      {/* Summary */}
      <div className="card mb-6">
        <h3 className="font-black text-primary mb-4">ملخص عام</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {summaryStats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center p-4 rounded-2xl border border-border bg-muted/30"
            >
              <span className="text-3xl font-black" style={{ color: s.color }}>{s.value}</span>
              <span className="text-xs text-muted-foreground mt-1 text-center">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Supervisor stats */}
      <div className="card mb-5">
        <h3 className="font-black text-primary mb-4">إحصائيات المشرفين</h3>
        {supervisorRows.length === 0 ? (
          <div className="empty-state">
            <p className="text-3xl mb-3">👨‍🏫</p>
            <h4 className="font-bold mb-1">لا توجد بيانات</h4>
            <p className="text-muted-foreground text-sm">لم يتم ربط قاعدة البيانات بعد</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>المشرف</th>
                  <th>الشعب</th>
                  <th>الطلبة</th>
                  <th>الزيارات</th>
                  <th>تقييمات مكتملة</th>
                  <th>نسبة الإنجاز</th>
                </tr>
              </thead>
              <tbody>
                {supervisorRows.map((row, i) => {
                  const pct = row.students
                    ? Math.round((row.completedEvals / row.students) * 100)
                    : 0;
                  return (
                    <tr key={i}>
                      <td className="font-bold">{row.name}</td>
                      <td>{row.sections}</td>
                      <td>{row.students}</td>
                      <td>{row.visits}</td>
                      <td>{row.completedEvals}</td>
                      <td>
                        <span className={`badge ${pct >= 80 ? "badge-success" : "badge-warning"}`}>
                          {pct}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Sites stats */}
      <div className="card mb-5">
        <h3 className="font-black text-primary mb-4">إحصائيات أماكن التدريب</h3>
        {siteRows.length === 0 ? (
          <div className="empty-state">
            <p className="text-3xl mb-3">🏫</p>
            <h4 className="font-bold mb-1">لا توجد بيانات</h4>
            <p className="text-muted-foreground text-sm">لم يتم ربط قاعدة البيانات بعد</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>الجهة</th>
                  <th>النوع</th>
                  <th>المديرية</th>
                  <th>الطاقة</th>
                  <th>المعينون</th>
                  <th>المتبقي</th>
                </tr>
              </thead>
              <tbody>
                {siteRows.map((row, i) => {
                  const remaining = row.capacity - row.assigned;
                  return (
                    <tr key={i}>
                      <td className="font-bold">{row.name}</td>
                      <td className="text-sm">{row.type}</td>
                      <td className="text-sm">{row.directorate}</td>
                      <td className="text-sm">{row.capacity}</td>
                      <td className="text-sm">{row.assigned}</td>
                      <td>
                        <span className={`badge ${remaining > 0 ? "badge-success" : "badge-danger"}`}>
                          {remaining}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Export */}
      <div className="card">
        <h3 className="font-black text-primary mb-4">تصدير التقارير</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {["تقرير الطلبة", "تقرير المشرفين", "تقرير أماكن التدريب", "ملخص دوري"].map((label) => (
            <button
              key={label}
              className="btn btn-outline w-full justify-center"
              onClick={() => alert(`سيتم تصدير ${label} قريباً`)}
            >
              📥 {label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}