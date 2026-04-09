export default function AdminDashboard() {
  return (
    <>
      <div className="content-header">
        <h1 className="page-title">لوحة تحكم مدير النظام</h1>
        <p className="page-subtitle">
          نظرة عامة على عمليات التدريب الميداني والأنشطة داخل النظام
        </p>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card primary">
          <div className="stat-title">إجمالي الطلبة</div>
          <div className="stat-value">248</div>
        </div>

        <div className="stat-card accent">
          <div className="stat-title">أماكن التدريب</div>
          <div className="stat-value">31</div>
        </div>

        <div className="stat-card success">
          <div className="stat-title">التقييمات المكتملة</div>
          <div className="stat-value">189</div>
        </div>

        <div className="stat-card info">
          <div className="stat-title">التقارير المعلقة</div>
          <div className="stat-value">17</div>
        </div>
      </div>

      <div className="dashboard-row">
        <div className="section-card">
          <h4>أحدث الأنشطة</h4>

          <div className="activity-list">
            <div className="activity-item">
              <h6>تم إنجاز توزيع جديد للطلبة</h6>
              <p>قام المنسق بتوزيع الطلبة على المؤسسات التدريبية.</p>
            </div>

            <div className="activity-item">
              <h6>رفع المشرف تقريرًا شاملًا</h6>
              <p>قام المشرف الأكاديمي برفع التقرير النهائي للشعبة.</p>
            </div>
          </div>
        </div>

        <div className="announcement-box">
          <h5>إعلان</h5>
          <p>
            يرجى التأكد من إدخال سجلات الحضور ونماذج التقييم قبل نهاية الأسبوع.
          </p>
        </div>
      </div>
    </>
  );
}