export default function PrincipalDashboard() {
  const stats = [
    {
      title: "الطلبة المتدربون",
      value: 12,
      type: "primary",
      meta: "إجمالي الطلبة داخل المدرسة",
    },
    {
      title: "المعلمون المرشدون",
      value: 6,
      type: "accent",
      meta: "المعتمدون للإشراف",
    },
    {
      title: "الكتب الرسمية",
      value: 4,
      type: "success",
      meta: "الكتب الصادرة هذا الفصل",
    },
    {
      title: "التعيينات النشطة",
      value: 8,
      type: "info",
      meta: "تعيينات قائمة حاليًا",
    },
  ];

  const recentActivities = [
    {
      title: "تعيين معلم مرشد جديد",
      description: "تم ربط أحد الطلبة المتدربين بالمعلم أحمد محمد.",
      meta: "اليوم",
    },
    {
      title: "إصدار كتاب رسمي",
      description: "تم إصدار كتاب مباشرة تدريب للدفعة الحالية.",
      meta: "منذ يوم",
    },
    {
      title: "إضافة طالب متدرب",
      description: "تم تسجيل طالب جديد ضمن قائمة المتدربين في المدرسة.",
      meta: "هذا الأسبوع",
    },
  ];

  const quickSummary = [
    {
      title: "آخر موعد متابعة",
      description: "يرجى مراجعة توزيع الطلبة على المعلمين قبل نهاية الأسبوع.",
    },
    {
      title: "تنبيه إداري",
      description: "تأكد من اعتماد الكتب الرسمية الجديدة وحفظ نسخة منها.",
    },
  ];

  return (
    <>
      <div className="content-header">
        <h1 className="page-title">لوحة تحكم مدير جهة التدريب</h1>
        <p className="page-subtitle">
          متابعة الطلبة المتدربين، المعلمين المرشدين، والكتب الرسمية داخل المدرسة.
        </p>
      </div>

      <div className="dashboard-grid">
        {stats.map((item, index) => (
          <div key={index} className={`stat-card ${item.type}`}>
            <div>
              <div className="stat-title">{item.title}</div>
              <div className="stat-value">{item.value}</div>
            </div>
            <div className="stat-meta">{item.meta}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-row">
        <div className="section-card">
          <h4>أحدث الأنشطة</h4>

          <div className="activity-list">
            {recentActivities.map((activity, index) => (
              <div key={index} className="activity-item">
                <h6>{activity.title}</h6>
                <p>{activity.description}</p>
                <div className="activity-meta">{activity.meta}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="announcement-box">
          <h5>إعلان</h5>
          <p>
            يرجى التأكد من اعتماد توزيع الطلبة المتدربين على المعلمين المرشدين
            وتحديث الكتب الرسمية المرتبطة بالتدريب.
          </p>
        </div>
      </div>

      <div className="dashboard-row">
        <div className="section-card">
          <h4>ملخص سريع</h4>

          <div className="timeline-list">
            {quickSummary.map((item, index) => (
              <div key={index} className="timeline-item">
                <h6>{item.title}</h6>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="section-card">
          <h4>إجراءات سريعة</h4>

          <div className="quick-actions-grid">
            <button className="quick-action-btn">تعيين معلم مرشد</button>
            <button className="quick-action-btn">عرض الطلبة المتدربين</button>
            <button className="quick-action-btn">إصدار كتاب رسمي</button>
            <button className="quick-action-btn">عرض الملف الشخصي</button>
          </div>
        </div>
      </div>
    </>
  );
}