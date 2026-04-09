import { useState } from "react";

export default function TrainingRequest() {
  const [formData, setFormData] = useState({
    directorate: "",
    school: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Training Request:", formData);
  };

  return (
    <>
      <div className="content-header">
        <h1 className="page-title">طلب التدريب</h1>
        <p className="page-subtitle">
          قم بتعبئة بيانات طلب التدريب وإرساله للإدارة
        </p>
      </div>

      <div className="section-card">
        <div className="panel-header">
          <div>
            <h3 className="panel-title">نموذج طلب التدريب</h3>
            <p className="panel-subtitle">
              اختر الجهة والمدرسة المناسبة لإرسال الطلب
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label-custom">المديرية</label>
              <select
                name="directorate"
                value={formData.directorate}
                onChange={handleChange}
                className="form-select-custom"
              >
                <option value="">اختر المديرية</option>
                <option value="education">مديرية التربية والتعليم</option>
                <option value="health">مديرية الصحة</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label-custom">المدرسة / جهة التدريب</label>
              <select
                name="school"
                value={formData.school}
                onChange={handleChange}
                className="form-select-custom"
              >
                <option value="">اختر جهة التدريب</option>
                <option value="school-1">مدرسة الحسين الثانوية</option>
                <option value="school-2">مدرسة الملك خالد</option>
              </select>
            </div>
          </div>

          <div className="mt-3">
            <button type="submit" className="btn-primary-custom">
              إرسال الطلب
            </button>
          </div>
        </form>
      </div>
    </>
  );
}