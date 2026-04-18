import { useState } from "react";

// --- استبدل هذه المصفوفات الفارغة ببيانات API ---
const initialSites = [];
const initialPendingStudents = [];

export default function StudentDistribution() {
  const [sites] = useState(initialSites);
  const [pendingStudents] = useState(initialPendingStudents);
  const [assignments, setAssignments] = useState({});

  const handleAssign = (studentId, siteId) => {
    setAssignments((prev) => ({ ...prev, [studentId]: siteId }));
  };

  const handleConfirm = () => {
    const count = Object.values(assignments).filter(Boolean).length;
    if (!count) {
      alert("يرجى توزيع طالب واحد على الأقل.");
      return;
    }
    // TODO: أرسل assignments إلى API هنا
    alert(`تم اعتماد توزيع ${count} طالب/ة`);
    setAssignments({});
  };

  const availableSites = sites.filter((s) => s.capacity - s.assigned > 0);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-primary">توزيع الطلبة على أماكن التدريب</h1>
        <p className="text-muted-foreground text-sm mt-1">
          مراجعة الجهات المتاحة واعتماد توزيع الطلبة المنتظرين
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        {[
          { label: "بانتظار التوزيع", value: pendingStudents.length, cls: "warning" },
          { label: "أماكن التدريب", value: sites.length, cls: "primary" },
          { label: "مقاعد متبقية", value: sites.reduce((a, s) => a + (s.capacity - s.assigned), 0), cls: "success" },
          { label: "تم تعيينهم الآن", value: Object.values(assignments).filter(Boolean).length, cls: "accent" },
        ].map((stat) => (
          <div key={stat.label} className={`stat-card ${stat.cls} rounded-2xl p-4`}>
            <div className="text-white/70 text-xs mb-1">{stat.label}</div>
            <div className="text-2xl font-black">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Sites table */}
      <div className="card mb-5">
        <h3 className="font-black text-primary mb-4">أماكن التدريب</h3>
        {sites.length === 0 ? (
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
                {sites.map((site) => {
                  const remaining = site.capacity - site.assigned;
                  return (
                    <tr key={site.id}>
                      <td className="font-bold">{site.name}</td>
                      <td>
                        <span className={`badge ${site.type === "مدرسة" ? "badge-primary" : "badge-info"}`}>
                          {site.type}
                        </span>
                      </td>
                      <td className="text-sm">{site.directorate}</td>
                      <td className="text-sm">{site.capacity}</td>
                      <td className="text-sm">{site.assigned}</td>
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

      {/* Pending students */}
      <div className="card">
        <h3 className="font-black text-primary mb-4">
          الطلبة المنتظرون ({pendingStudents.length})
        </h3>
        {pendingStudents.length === 0 ? (
          <div className="empty-state">
            <p className="text-3xl mb-3">🎉</p>
            <h4 className="font-bold mb-1">لا يوجد طلبة منتظرون</h4>
            <p className="text-muted-foreground text-sm">تم توزيع جميع الطلبة أو لا توجد بيانات بعد</p>
          </div>
        ) : (
          <>
            <div className="table-wrapper mb-4">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>الطالب</th>
                    <th>الرقم الجامعي</th>
                    <th>المساق</th>
                    <th>مكان التدريب</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingStudents.map((student) => (
                    <tr key={student.id}>
                      <td className="font-bold">{student.name}</td>
                      <td className="text-sm">{student.universityId}</td>
                      <td className="text-sm">{student.course}</td>
                      <td style={{ minWidth: 240 }}>
                        <select
                          className="form-select"
                          value={assignments[student.id] ?? ""}
                          onChange={(e) => handleAssign(student.id, e.target.value)}
                        >
                          <option value="">اختر مكان التدريب</option>
                          {availableSites.map((site) => (
                            <option key={site.id} value={site.id}>
                              {site.name} (متبقي: {site.capacity - site.assigned})
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="btn btn-primary" onClick={handleConfirm}>
              اعتماد التوزيع
            </button>
          </>
        )}
      </div>
    </>
  );
}