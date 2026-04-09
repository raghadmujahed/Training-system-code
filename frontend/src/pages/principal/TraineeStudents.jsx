import { useState } from "react";

export default function TraineeStudents() {
  const [students] = useState([
    {
      id: 1,
      name: "محمد علي",
      major: "الرياضيات",
      university: "جامعة الخليل",
      mentor: "أحمد محمد",
      status: "نشط",
    },
    {
      id: 2,
      name: "آية خليل",
      major: "اللغة العربية",
      university: "جامعة الخليل",
      mentor: "سمر خالد",
      status: "نشط",
    },
    {
      id: 3,
      name: "يوسف أحمد",
      major: "العلوم",
      university: "جامعة الخليل",
      mentor: "محمود يوسف",
      status: "قيد المتابعة",
    },
  ]);

  const getStatusClass = (status) => {
    if (status === "نشط") return "badge-custom badge-success";
    if (status === "قيد المتابعة") return "badge-custom badge-warning";
    return "badge-custom badge-soft";
  };

  return (
    <>
      <div className="content-header">
        <h1 className="page-title">الطلبة المتدربون</h1>
        <p className="page-subtitle">
          عرض الطلبة المتدربين داخل المدرسة ومتابعة بياناتهم الأساسية.
        </p>
      </div>

      <div className="dashboard-grid mb-3">
        <div className="stat-card primary">
          <div className="stat-title">إجمالي الطلبة</div>
          <div className="stat-value">{students.length}</div>
          <div className="stat-meta">الطلبة المسجلون داخل المدرسة</div>
        </div>

        <div className="stat-card success">
          <div className="stat-title">الطلبة النشطون</div>
          <div className="stat-value">
            {students.filter((item) => item.status === "نشط").length}
          </div>
          <div className="stat-meta">يتابعون التدريب حاليًا</div>
        </div>

        <div className="stat-card warning">
          <div className="stat-title">قيد المتابعة</div>
          <div className="stat-value">
            {students.filter((item) => item.status === "قيد المتابعة").length}
          </div>
          <div className="stat-meta">يتطلبون متابعة إضافية</div>
        </div>

        <div className="stat-card accent">
          <div className="stat-title">المعلمون المرشدون</div>
          <div className="stat-value">6</div>
          <div className="stat-meta">المعتمدون للإشراف</div>
        </div>
      </div>

      <div className="section-card">
        <div className="panel-header">
          <div>
            <h3 className="panel-title">قائمة الطلبة المتدربين</h3>
            <p className="panel-subtitle">
              جميع الطلبة المسجلين داخل المدرسة مع التخصص والمعلم المرشد.
            </p>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table-custom">
            <thead>
              <tr>
                <th>اسم الطالب</th>
                <th>التخصص</th>
                <th>الجامعة</th>
                <th>المعلم المرشد</th>
                <th>الحالة</th>
                <th>إجراء</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.major}</td>
                  <td>{student.university}</td>
                  <td>{student.mentor}</td>
                  <td>
                    <span className={getStatusClass(student.status)}>
                      {student.status}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button type="button" className="btn-outline-custom btn-sm-custom">
                        عرض
                      </button>
                      <button type="button" className="btn-primary-custom btn-sm-custom">
                        متابعة
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {students.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center">
                    لا يوجد طلبة متدربون حاليًا
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}