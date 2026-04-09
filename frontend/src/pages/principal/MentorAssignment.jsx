import { useState } from "react";

export default function MentorAssignment() {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedMentor, setSelectedMentor] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");

  const departments = [
    "اللغة العربية",
    "اللغة الإنجليزية",
    "الرياضيات",
    "العلوم",
    "التربية الإسلامية",
  ];

  const mentors = [
    "أحمد محمد",
    "سمر خالد",
    "ليلى ناصر",
    "محمود يوسف",
  ];

  const students = [
    "محمد علي",
    "آية خليل",
    "سارة حسن",
    "يوسف أحمد",
  ];

  const assignments = [
    {
      id: 1,
      student: "محمد علي",
      mentor: "أحمد محمد",
      department: "الرياضيات",
      status: "مؤكد",
    },
    {
      id: 2,
      student: "آية خليل",
      mentor: "سمر خالد",
      department: "اللغة العربية",
      status: "قيد المراجعة",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      department: selectedDepartment,
      mentor: selectedMentor,
      student: selectedStudent,
    });
  };

  const getStatusClass = (status) => {
    if (status === "مؤكد") return "badge-custom badge-success";
    if (status === "قيد المراجعة") return "badge-custom badge-warning";
    return "badge-custom badge-soft";
  };

  return (
    <>
      <div className="content-header">
        <h1 className="page-title">تعيين المعلم المرشد</h1>
        <p className="page-subtitle">
          إدارة توزيع الطلبة المتدربين على المعلمين المرشدين داخل المدرسة.
        </p>
      </div>

      <div className="dashboard-grid mb-3">
        <div className="stat-card primary">
          <div className="stat-title">عدد الطلبة المتدربين</div>
          <div className="stat-value">12</div>
          <div className="stat-meta">الطلبة المسجلون حاليًا</div>
        </div>

        <div className="stat-card accent">
          <div className="stat-title">عدد المعلمين المرشدين</div>
          <div className="stat-value">6</div>
          <div className="stat-meta">المعتمدون داخل المدرسة</div>
        </div>

        <div className="stat-card success">
          <div className="stat-title">التعيينات المؤكدة</div>
          <div className="stat-value">8</div>
          <div className="stat-meta">تم اعتمادها نهائيًا</div>
        </div>

        <div className="stat-card info">
          <div className="stat-title">طلبات قيد المراجعة</div>
          <div className="stat-value">4</div>
          <div className="stat-meta">بانتظار الاعتماد</div>
        </div>
      </div>

      <div className="dashboard-row">
        <div className="section-card">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">إضافة تعيين جديد</h3>
              <p className="panel-subtitle">
                اختر القسم والمعلم المرشد والطالب المتدرب.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label-custom">القسم</label>
                <select
                  className="form-select-custom"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="">اختر القسم</option>
                  {departments.map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label-custom">المعلم المرشد</label>
                <select
                  className="form-select-custom"
                  value={selectedMentor}
                  onChange={(e) => setSelectedMentor(e.target.value)}
                >
                  <option value="">اختر المعلم المرشد</option>
                  {mentors.map((mentor) => (
                    <option key={mentor} value={mentor}>
                      {mentor}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label-custom">الطالب المتدرب</label>
                <select
                  className="form-select-custom"
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                >
                  <option value="">اختر الطالب</option>
                  {students.map((student) => (
                    <option key={student} value={student}>
                      {student}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-3">
              <button type="submit" className="btn-primary-custom">
                حفظ التعيين
              </button>
            </div>
          </form>
        </div>

        <div className="announcement-box">
          <h5>ملاحظة</h5>
          <p>
            يرجى التأكد من توافق تخصص الطالب مع القسم المختار، واعتماد المعلم
            المرشد قبل حفظ التعيين النهائي.
          </p>
        </div>
      </div>

      <div className="section-card">
        <div className="panel-header">
          <div>
            <h3 className="panel-title">سجل التعيينات</h3>
            <p className="panel-subtitle">
              عرض جميع الطلبة المرتبطين بمعلميهم المرشدين.
            </p>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table-custom">
            <thead>
              <tr>
                <th>الطالب</th>
                <th>المعلم المرشد</th>
                <th>القسم</th>
                <th>الحالة</th>
                <th>إجراء</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((item) => (
                <tr key={item.id}>
                  <td>{item.student}</td>
                  <td>{item.mentor}</td>
                  <td>{item.department}</td>
                  <td>
                    <span className={getStatusClass(item.status)}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button type="button" className="btn-outline-custom btn-sm-custom">
                        تعديل
                      </button>
                      <button type="button" className="btn-danger-custom btn-sm-custom">
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {assignments.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">
                    لا توجد تعيينات حالية
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