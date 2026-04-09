import { useState } from "react";

export default function OfficialLetters() {
  const [letters] = useState([
    {
      id: 1,
      title: "كتاب اعتماد الطلبة المتدربين",
      type: "اعتماد",
      date: "2026-04-10",
      status: "صادر",
    },
    {
      id: 2,
      title: "كتاب مباشرة تدريب",
      type: "مباشرة",
      date: "2026-04-12",
      status: "قيد الإعداد",
    },
    {
      id: 3,
      title: "كتاب متابعة رسمية",
      type: "متابعة",
      date: "2026-04-15",
      status: "صادر",
    },
  ]);

  const getStatusClass = (status) => {
    if (status === "صادر") return "badge-custom badge-success";
    if (status === "قيد الإعداد") return "badge-custom badge-warning";
    return "badge-custom badge-soft";
  };

  return (
    <>
      <div className="content-header">
        <h1 className="page-title">الكتب الرسمية</h1>
        <p className="page-subtitle">
          إدارة وعرض الكتب الرسمية المتعلقة بالطلبة المتدربين داخل المدرسة.
        </p>
      </div>

      <div className="dashboard-grid mb-3">
        <div className="stat-card primary">
          <div className="stat-title">إجمالي الكتب</div>
          <div className="stat-value">{letters.length}</div>
          <div className="stat-meta">جميع الكتب المسجلة</div>
        </div>

        <div className="stat-card success">
          <div className="stat-title">الكتب الصادرة</div>
          <div className="stat-value">
            {letters.filter((item) => item.status === "صادر").length}
          </div>
          <div className="stat-meta">تم إصدارها رسميًا</div>
        </div>

        <div className="stat-card warning">
          <div className="stat-title">قيد الإعداد</div>
          <div className="stat-value">
            {letters.filter((item) => item.status === "قيد الإعداد").length}
          </div>
          <div className="stat-meta">بانتظار الإكمال أو الاعتماد</div>
        </div>

        <div className="stat-card accent">
          <div className="stat-title">النوع الأكثر استخدامًا</div>
          <div className="stat-value" style={{ fontSize: "1.2rem" }}>
            اعتماد
          </div>
          <div className="stat-meta">الأكثر تداولًا حاليًا</div>
        </div>
      </div>

      <div className="dashboard-row">
        <div className="section-card">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">إصدار كتاب جديد</h3>
              <p className="panel-subtitle">
                إنشاء كتاب رسمي جديد خاص بالطلبة المتدربين.
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
                <label className="form-label-custom">نوع الكتاب</label>
                <select className="form-select-custom">
                  <option value="">اختر النوع</option>
                  <option value="اعتماد">اعتماد</option>
                  <option value="مباشرة">مباشرة</option>
                  <option value="متابعة">متابعة</option>
                </select>
              </div>

              <div className="col-12">
                <label className="form-label-custom">ملاحظات</label>
                <textarea
                  className="form-textarea-custom"
                  placeholder="اكتب تفاصيل أو ملاحظات مرتبطة بالكتاب"
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
          <h5>ملاحظة</h5>
          <p>
            تأكد من اعتماد نوع الكتاب والمحتوى قبل الإصدار النهائي، مع حفظ نسخة
            رسمية ضمن سجلات المدرسة.
          </p>
        </div>
      </div>

      <div className="section-card">
        <div className="panel-header">
          <div>
            <h3 className="panel-title">سجل الكتب الرسمية</h3>
            <p className="panel-subtitle">
              جميع الكتب الرسمية المرتبطة بالتدريب داخل المدرسة.
            </p>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table-custom">
            <thead>
              <tr>
                <th>عنوان الكتاب</th>
                <th>النوع</th>
                <th>التاريخ</th>
                <th>الحالة</th>
                <th>إجراء</th>
              </tr>
            </thead>
            <tbody>
              {letters.map((letter) => (
                <tr key={letter.id}>
                  <td>{letter.title}</td>
                  <td>{letter.type}</td>
                  <td>{letter.date}</td>
                  <td>
                    <span className={getStatusClass(letter.status)}>
                      {letter.status}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button type="button" className="btn-outline-custom btn-sm-custom">
                        عرض
                      </button>
                      <button type="button" className="btn-primary-custom btn-sm-custom">
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