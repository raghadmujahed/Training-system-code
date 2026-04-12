const Home = () => {
  const studentInfo = {
    name: "عبد الله رياض الدراويش",
    universityId: "22211577",
    specialization: "علم الحاسوب",
    college: "كلية تكنولوجيا المعلومات",
    status: "نشط",
    directorate: "مديرية الخليل",
    school: "مدرسة الحسين الثانوية",
    trainingRequestStatus: "قيد المعالجة",
  };

  const summaryCards = [
    {
      title: "طلب التدريب",
      value: studentInfo.trainingRequestStatus,
      desc: "حالة طلب التدريب الحالي",
      className: "warning",
    },
    {
      title: "برنامج التدريب",
      value: "3 أيام مسجلة",
      desc: "عدد الأيام المضافة في البرنامج",
      className: "primary",
    },
    {
      title: "ملف الإنجاز",
      value: "2 ملفات",
      desc: "عدد الملفات المرفوعة",
      className: "success",
    },
    {
      title: "المهام",
      value: "1 مهمة متبقية",
      desc: "المهام التي تحتاج متابعة",
      className: "accent",
    },
  ];

  const latestItems = [
    {
      title: "تم إرسال طلب التدريب",
      text: "تم إرسال طلب التدريب إلى المدرسة بنجاح وهو الآن قيد المعالجة.",
      type: "إشعار",
    },
    {
      title: "تحديث على برنامج التدريب",
      text: "تمت إضافة يوم جديد إلى برنامج التدريب لهذا الأسبوع.",
      type: "تحديث",
    },
    {
      title: "تذكير",
      text: "يرجى استكمال ملف الإنجاز قبل نهاية الأسبوع.",
      type: "إشعار",
    },
  ];

  const getBadgeClass = (type) => {
    if (type === "إشعار") return "badge-custom badge-info";
    return "badge-custom badge-soft";
  };

  return (
    <>
      <div className="content-header">
        <h1 className="page-title">الصفحة الرئيسية</h1>
        <p className="page-subtitle">
          ملخص معلومات الطالب والتدريب وآخر الإشعارات.
        </p>
      </div>

      <div className="section-card mb-3">
        <h4>المعلومات الأساسية عن الطالب</h4>

        <div className="summary-grid">
          <div className="kpi-box">
            <strong>{studentInfo.name}</strong>
            <span>اسم الطالب</span>
          </div>

          <div className="kpi-box">
            <strong>{studentInfo.universityId}</strong>
            <span>الرقم الجامعي</span>
          </div>

          <div className="kpi-box">
            <strong>{studentInfo.specialization}</strong>
            <span>التخصص</span>
          </div>

          <div className="kpi-box">
            <strong>{studentInfo.college}</strong>
            <span>الكلية</span>
          </div>

          <div className="kpi-box">
            <strong>{studentInfo.directorate}</strong>
            <span>مديرية التربية</span>
          </div>

          <div className="kpi-box">
            <strong>{studentInfo.school}</strong>
            <span>المدرسة</span>
          </div>

          <div className="kpi-box">
            <strong>{studentInfo.status}</strong>
            <span>الحالة</span>
          </div>

          <div className="kpi-box">
            <strong>{studentInfo.trainingRequestStatus}</strong>
            <span>حالة طلب التدريب</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid mb-3">
        {summaryCards.map((card, index) => (
          <div key={index} className={`stat-card ${card.className}`}>
            <div>
              <div className="stat-title">{card.title}</div>
              <div className="stat-value">{card.value}</div>
            </div>
            <div className="stat-meta">{card.desc}</div>
          </div>
        ))}
      </div>

      <div className="section-card">
        <h4>آخر الإشعارات والتحديثات</h4>

        <div className="activity-list">
          {latestItems.map((item, index) => (
            <div key={index} className="activity-item">
              <div className="mb-1">
                <span className={getBadgeClass(item.type)}>{item.type}</span>
              </div>
              <h6>{item.title}</h6>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;