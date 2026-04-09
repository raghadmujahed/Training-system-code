export default function StudentDashboard() {
  return (
    <>
      <div className="content-header">
        <h1 className="page-title">لوحة تحكم الطالب</h1>
        <p className="page-subtitle">
          متابعة التدريب الميداني والمهام والإشعارات الخاصة بك
        </p>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card primary">
          <div className="stat-title">حالة طلب التدريب</div>
          <div className="stat-value" style={{ fontSize: "1.3rem" }}>
            مقبول
          </div>
        </div>

        <div className="stat-card accent">
          <div className="stat-title">أيام التدريب</div>
          <div className="stat-value">12</div>
        </div>

        <div className="stat-card success">
          <div className="stat-title">الساعات المنجزة</div>
          <div className="stat-value">36</div>
        </div>

        <div className="stat-card info">
          <div className="stat-title">التكليفات</div>
          <div className="stat-value">3</div>
        </div>
      </div>
    </>
  );
}