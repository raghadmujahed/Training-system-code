import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../utils/roles";

import myLogo from "../../assets/HU Logo.webp";

export default function Login() {
  const [role, setRole] = useState(ROLES.ADMIN);
  const navigate = useNavigate();

const handleLogin = () => {
  const fakeUser = {
    name: "مستخدم تجريبي",
    role,
  };

  localStorage.setItem("user", JSON.stringify(fakeUser));

  switch (role) {
    case ROLES.ADMIN:
      navigate("/dashboard");
      break;

    case ROLES.STUDENT:
      navigate("/student/dashboard");
      break;

    case ROLES.SUPERVISOR:
      navigate("/supervisor/dashboard");
      break;

    case ROLES.MENTOR:
      navigate("/mentor/dashboard");
      break;

    case ROLES.COORDINATOR:
      navigate("/coordinator/dashboard");
      break;

    case ROLES.PRINCIPAL:
      navigate("/principal/dashboard");
      break;

    case ROLES.HEALTH:
      navigate("/health/dashboard");
      break;

    case ROLES.EDUCATION:
      navigate("/education/dashboard");
      break;

    default:
      navigate("/");
  }
};

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <div className="auth-side">
          <div>
            <h1>جامعة الخليل</h1>
            <p>
              نظام إلكتروني متكامل لإدارة التدريب العملي والتربوي، يسهّل
              المتابعة، التقييم، والتواصل بين جميع الأطراف داخل بيئة أكاديمية
              منظمة.
            </p>

            <div className="auth-points">
              <div className="auth-point">متابعة التدريب الميداني بشكل منظم</div>
              <div className="auth-point">إدارة التقييمات والتقارير إلكترونيًا</div>
              <div className="auth-point">منصة موحدة للطلبة والمشرفين والإدارة</div>
            </div>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-logo">
            <img
              src={myLogo}
              alt="HU Logo"
              style={{ width: "120px", marginBottom: "20px" }}
            />
          </div>

          <h2>تسجيل الدخول</h2>
          <p>اختر نوع المستخدم للدخول إلى لوحة التحكم الخاصة بك.</p>

          <div className="auth-form">
            <div className="form-group-custom">
              <label className="form-label-custom">نوع المستخدم</label>
              <select
                className="form-select-custom"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value={ROLES.ADMIN}>مدير النظام</option>
                <option value={ROLES.COORDINATOR}>المنسق الأكاديمي</option>
                <option value={ROLES.SUPERVISOR}>المشرف الأكاديمي</option>
                <option value={ROLES.MENTOR}>المشرف الميداني</option>
                <option value={ROLES.PRINCIPAL}>مدير جهة التدريب</option>
                <option value={ROLES.HEALTH}>مديرية الصحة</option>
                <option value={ROLES.EDUCATION}>مديرية التربية والتعليم</option>
                <option value={ROLES.STUDENT}>الطالب المتدرب</option>
              </select>
              <small className="input-hint">
                هذا دخول تجريبي لاختبار الصلاحيات والواجهات المختلفة.
              </small>
            </div>

            <button className="auth-btn" onClick={handleLogin}>
              تسجيل الدخول
            </button>
          </div>

          <div className="auth-extra">
            سيتم توجيهك إلى لوحة التحكم المناسبة حسب الدور المختار.
          </div>
        </div>
      </div>
    </div>
  );
}