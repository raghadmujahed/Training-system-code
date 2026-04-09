import { useState } from "react";

export default function OfficialLetters() {
  const [letters] = useState([
    {
      id: 1,
      title: "كتاب توزيع الطلبة المتدربين",
      recipient: "مدرسة الحسين الثانوية",
      date: "2026-04-10",
      status: "مرسل",
    },
    {
      id: 2,
      title: "كتاب اعتماد أماكن التدريب",
      recipient: "مدرسة الملك خالد",
      date: "2026-04-14",
      status: "قيد الإعداد",
    },
    {
      id: 3,
      title: "كتاب متابعة تدريب",
      recipient: "مدرسة بنات الخليل",
      date: "2026-04-18",
      status: "مرسل",
    },
  ]);

  const getStatusClass = (status) => {
    if (status === "مرسل") return "badge-custom badge-success";
    if (status === "قيد الإعداد") return "badge-custom badge-warning";
    return "badge-custom badge-soft";
  };

  return (
    <>
      <div className="content-header">
        <h1 className="page-title">الكتب الرسمية</h1>
        <p className="page-subtitle">
          إدارة وعرض الكتب الرسمية الصادرة من مديرية التربية والتعليم.
        </p>
      </div>

      <div className="dashboard-grid mb-3">
        <div className="stat-card primary">
          <div className="stat-title">إجمالي الكتب</div>
          <div className="stat-value">{letters.length}</div>
          <div className="stat-meta">جميع الكتب المسجلة</div>
        </div>

        <div className="stat-card success">
          <div className="stat-title">الكتب المرسلة</div>
          <div className="stat-value">
            {letters.filter((item) => item.status === "مرسل").length}
          </div>
          <div className="stat-meta">تم إصدارها وإرسالها</div>
        </div>

        <div className="stat-card warning">
          <div className="stat-title">قيد الإعداد</div>
          <div className="stat-value">
            {letters.filter((item) => item.status === "قيد الإعداد").length}
          </div>
          <div className="stat-meta">بانتظار الاعتماد النهائي</div>
        </div>

        <div className="stat-card accent">
          <div className="stat-title">الجهات المستفيدة</div>
          <div className="stat-value">3</div>
          <div className="stat-meta">مدارس ومؤسسات مرتبطة</div>
        </div>
      </div>

      <div className="dashboard-row">
        <div className="section-card">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">إصدار كتاب رسمي جديد</h3>
              <p className="panel-subtitle">
                إنشاء كتاب جديد مرتبط بالتدريب أو التوزيع أو الاعتماد.
              </p>
            </div>
          </div>

          <form>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label-custom">عنوان الكتاب</label>
                <input
                  type="text"
                  className="form-control-custom"
                  placeholder="أدخل عنوان الكتاب"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label-custom">الجهة المستفيدة</label>
                <input
                  type="text"
                  className="form-control-custom"
                  placeholder="أدخل اسم الجهة"
                />
              </div>

              <div className="col-12">
                <label className="form-label-custom">ملاحظات</label>
                <textarea
                  className="form-textarea-custom"
                  placeholder="أدخل أي تفاصيل أو ملاحظات إضافية"
                />
              </div>
            </div>

            <div className="mt-3">
              <button type="button" className="btn-primary-custom">
                إصدار الكتاب
              </button>
            </div>
          </form>
        </div>

        <div className="announcement-box">
          <h5>تنبيه</h5>
          <p>
            تأكد من اعتماد البيانات والمحتوى الرسمي قبل إصدار الكتاب وإرساله
            للجهة المعنية.
          </p>
        </div>
      </div>

      <div className="section-card">
        <div className="panel-header">
          <div>
            <h3 className="panel-title">سجل الكتب الرسمية</h3>
            <p className="panel-subtitle">
              عرض جميع الكتب الرسمية الصادرة أو الجاري إعدادها.
            </p>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table-custom">
            <thead>
              <tr>
                <th>عنوان الكتاب</th>
                <th>الجهة المستفيدة</th>
                <th>التاريخ</th>
                <th>الحالة</th>
                <th>إجراء</th>
              </tr>
            </thead>
            <tbody>
              {letters.map((letter) => (
                <tr key={letter.id}>
                  <td>{letter.title}</td>
                  <td>{letter.recipient}</td>
                  <td>{letter.date}</td>
                  <td>
                    <span className={getStatusClass(letter.status)}>
                      {letter.status}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button
                        type="button"
                        className="btn-outline-custom btn-sm-custom"
                      >
                        عرض
                      </button>
                      <button
                        type="button"
                        className="btn-primary-custom btn-sm-custom"
                      >
                        تحميل
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {letters.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">
                    لا توجد كتب رسمية حاليًا
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