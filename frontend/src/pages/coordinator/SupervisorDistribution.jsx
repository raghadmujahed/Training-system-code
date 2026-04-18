import { useState } from "react";

// --- استبدل هذه المصفوفات الفارغة ببيانات API ---
const initialSupervisors = [];
const initialSections = [];

export default function SupervisorDistribution() {
  const [supervisors] = useState(initialSupervisors);
  const [sections, setSections] = useState(initialSections);

  const handleAssign = (sectionId, supervisorId) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? { ...s, supervisorId: supervisorId ? Number(supervisorId) : null }
          : s
      )
    );
  };

  const handleSave = () => {
    const unassigned = sections.filter((s) => !s.supervisorId).length;
    if (unassigned > 0) {
      if (!window.confirm(`يوجد ${unassigned} شعبة بدون مشرف. هل تريد الحفظ على أي حال؟`)) return;
    }
    // TODO: أرسل sections إلى API هنا
    alert("تم حفظ التوزيع بنجاح");
  };

  const getSupervisorName = (id) =>
    supervisors.find((s) => s.id === id)?.name ?? null;

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-primary">توزيع المشرفين الأكاديميين</h1>
        <p className="text-muted-foreground text-sm mt-1">
          تحديد المشرف الأكاديمي لكل شعبة ومتابعة التوازن في الإشراف
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        {[
          { label: "المشرفون", value: supervisors.length, cls: "primary" },
          { label: "عدد الشعب", value: sections.length, cls: "accent" },
          { label: "شعب معينة", value: sections.filter((s) => s.supervisorId).length, cls: "success" },
          { label: "بدون مشرف", value: sections.filter((s) => !s.supervisorId).length, cls: "warning" },
        ].map((stat) => (
          <div key={stat.label} className={`stat-card ${stat.cls} rounded-2xl p-4`}>
            <div className="text-white/70 text-xs mb-1">{stat.label}</div>
            <div className="text-2xl font-black">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Supervisors overview */}
      <div className="card mb-5">
        <h3 className="font-black text-primary mb-4">المشرفون الأكاديميون</h3>
        {supervisors.length === 0 ? (
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
                  <th>القسم</th>
                  <th>الشعب الحالية</th>
                  <th>الحد الأقصى</th>
                  <th>الحالة</th>
                </tr>
              </thead>
              <tbody>
                {supervisors.map((sup) => {
                  const isFull = sup.currentSections >= sup.maxSections;
                  return (
                    <tr key={sup.id}>
                      <td className="font-bold">{sup.name}</td>
                      <td className="text-sm">{sup.department}</td>
                      <td className="font-bold text-sm">{sup.currentSections}</td>
                      <td className="text-sm">{sup.maxSections}</td>
                      <td>
                        <span className={`badge ${isFull ? "badge-danger" : "badge-success"}`}>
                          {isFull ? "مكتمل" : "متاح"}
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

      {/* Section assignment */}
      <div className="card">
        <h3 className="font-black text-primary mb-4">توزيع الشعب على المشرفين</h3>
        {sections.length === 0 ? (
          <div className="empty-state">
            <p className="text-3xl mb-3">📋</p>
            <h4 className="font-bold mb-1">لا توجد شعب</h4>
            <p className="text-muted-foreground text-sm">لم يتم ربط قاعدة البيانات بعد</p>
          </div>
        ) : (
          <>
            <div className="table-wrapper mb-4">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>الشعبة</th>
                    <th>المساق</th>
                    <th>الطلبة</th>
                    <th>المشرف الحالي</th>
                    <th>تعيين مشرف</th>
                  </tr>
                </thead>
                <tbody>
                  {sections.map((section) => (
                    <tr key={section.id}>
                      <td className="font-bold">{section.name}</td>
                      <td className="text-sm">{section.course}</td>
                      <td className="text-sm">{section.studentsCount}</td>
                      <td>
                        <span className={`badge ${getSupervisorName(section.supervisorId) ? "badge-success" : "badge-warning"}`}>
                          {getSupervisorName(section.supervisorId) ?? "غير معين"}
                        </span>
                      </td>
                      <td style={{ minWidth: 220 }}>
                        <select
                          className="form-select"
                          value={section.supervisorId ?? ""}
                          onChange={(e) => handleAssign(section.id, e.target.value)}
                        >
                          <option value="">بدون مشرف</option>
                          {supervisors.map((sup) => (
                            <option key={sup.id} value={sup.id}>
                              {sup.name}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="btn btn-primary" onClick={handleSave}>
              حفظ التوزيع
            </button>
          </>
        )}
      </div>
    </>
  );
}