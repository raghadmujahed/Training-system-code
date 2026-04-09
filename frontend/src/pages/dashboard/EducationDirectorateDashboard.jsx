import { useState } from "react";

export default function TrainingPlaces() {
  const [places] = useState([
    {
      id: 1,
      name: "مدرسة الحسين الثانوية",
      type: "مدرسة حكومية",
      city: "الخليل",
      capacity: 12,
      status: "متاح",
    },
    {
      id: 2,
      name: "مدرسة الملك خالد",
      type: "مدرسة حكومية",
      city: "دورا",
      capacity: 8,
      status: "متاح",
    },
    {
      id: 3,
      name: "مدرسة بنات الخليل",
      type: "مدرسة حكومية",
      city: "الخليل",
      capacity: 0,
      status: "مكتمل",
    },
  ]);

  const getStatusClass = (status) => {
    if (status === "متاح") return "badge-custom badge-success";
    if (status === "مكتمل") return "badge-custom badge-danger";
    return "badge-custom badge-soft";
  };

  return (
    <>
      <div className="content-header">
        <h1 className="page-title">أماكن التدريب</h1>
        <p className="page-subtitle">
          إدارة وعرض أماكن التدريب المعتمدة التابعة لمديرية التربية والتعليم.
        </p>
      </div>

      <div className="dashboard-grid mb-3">
        <div className="stat-card primary">
          <div className="stat-title">إجمالي الأماكن</div>
          <div className="stat-value">{places.length}</div>
          <div className="stat-meta">أماكن التدريب المسجلة</div>
        </div>

        <div className="stat-card success">
          <div className="stat-title">الأماكن المتاحة</div>
          <div className="stat-value">
            {places.filter((item) => item.status === "متاح").length}
          </div>
          <div className="stat-meta">جاهزة لاستقبال الطلبة</div>
        </div>

        <div className="stat-card danger">
          <div className="stat-title">الأماكن المكتملة</div>
          <div className="stat-value">
            {places.filter((item) => item.status === "مكتمل").length}
          </div>
          <div className="stat-meta">وصلت إلى الحد الأقصى</div>
        </div>

        <div className="stat-card accent">
          <div className="stat-title">السعة الإجمالية</div>
          <div className="stat-value">
            {places.reduce((sum, item) => sum + item.capacity, 0)}
          </div>
          <div className="stat-meta">المقاعد المتاحة حاليًا</div>
        </div>
      </div>

      <div className="dashboard-row">
        <div className="section-card">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">إضافة مكان تدريب جديد</h3>
              <p className="panel-subtitle">
                تسجيل مدرسة أو جهة تدريب جديدة تابعة للمديرية.
              </p>
            </div>
          </div>

          <form>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label-custom">اسم جهة التدريب</label>
                <input
                  type="text"
                  className="form-control-custom"
                  placeholder="أدخل اسم جهة التدريب"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label-custom">نوع الجهة</label>
                <select className="form-select-custom">
                  <option value="">اختر النوع</option>
                  <option value="school">مدرسة حكومية</option>
                  <option value="private">مدرسة خاصة</option>
                  <option value="center">مركز تعليمي</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label-custom">المدينة</label>
                <input
                  type="text"
                  className="form-control-custom"
                  placeholder="أدخل اسم المدينة"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label-custom">السعة</label>
                <input
                  type="number"
                  className="form-control-custom"
                  placeholder="أدخل عدد الطلبة الممكن استقبالهم"
                />
              </div>
            </div>

            <div className="mt-3">
              <button type="button" className="btn-primary-custom">
                حفظ مكان التدريب
              </button>
            </div>
          </form>
        </div>

        <div className="announcement-box">
          <h5>ملاحظة</h5>
          <p>
            يرجى التأكد من تحديث عدد المقاعد المتاحة بشكل دوري، وربط أماكن
            التدريب الفعالة فقط ضمن النظام.
          </p>
        </div>
      </div>

      <div className="section-card">
        <div className="panel-header">
          <div>
            <h3 className="panel-title">قائمة أماكن التدريب</h3>
            <p className="panel-subtitle">
              جميع المدارس والجهات التدريبية التابعة لمديرية التربية والتعليم.
            </p>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table-custom">
            <thead>
              <tr>
                <th>اسم المكان</th>
                <th>النوع</th>
                <th>المدينة</th>
                <th>السعة</th>
                <th>الحالة</th>
                <th>إجراء</th>
              </tr>
            </thead>
            <tbody>
              {places.map((place) => (
                <tr key={place.id}>
                  <td>{place.name}</td>
                  <td>{place.type}</td>
                  <td>{place.city}</td>
                  <td>{place.capacity}</td>
                  <td>
                    <span className={getStatusClass(place.status)}>
                      {place.status}
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
                        تعديل
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {places.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center">
                    لا توجد أماكن تدريب مسجلة حاليًا
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