// src/pages/Admin/Users/AddCounselor.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, createUser, updateUser, getTrainingSites } from "../../../services/api";
import * as XLSX from "xlsx";

export default function AddCounselor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("single");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [trainingSites, setTrainingSites] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    training_site_id: "",
    role_id: 6,
  });

  const [file, setFile] = useState(null);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [bulkResults, setBulkResults] = useState({ success: [], errors: [] });
  const isEditMode = !!id;

  // جلب قائمة أماكن التدريب
  useEffect(() => {
    const fetchSites = async () => {
      try {
        const res = await getTrainingSites();
        setTrainingSites(res.data || []);
      } catch (err) {
        console.error("فشل جلب أماكن التدريب", err);
      }
    };
    fetchSites();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const userData = await getUser(id);
          setForm({
            name: userData.name || "",
            email: userData.email || "",
            password: "",
            password_confirmation: "",
            training_site_id: userData.training_site_id || "",
            role_id: userData.role_id || 6,
          });
        } catch (err) {
          console.error(err);
        }
      };
      fetchUser();
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      if (id) {
        await updateUser(id, form);
      } else {
        await createUser(form);
      }
      navigate("/admin/users");
    } catch (err) {
      if (err.response?.data?.errors) setErrors(err.response.data.errors);
      else alert("حدث خطأ أثناء حفظ المستخدم");
    } finally {
      setLoading(false);
    }
  };

  // الرفع الجماعي
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setBulkResults({ success: [], errors: [] });
  };

  const processExcel = async () => {
    if (!file) {
      alert("الرجاء اختيار ملف Excel أولاً");
      return;
    }
    setBulkLoading(true);
    setBulkResults({ success: [], errors: [] });

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const binaryData = evt.target.result;
        const workbook = XLSX.read(binaryData, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(worksheet);

        if (rows.length === 0) {
          alert("الملف فارغ أو لا يحتوي على بيانات");
          setBulkLoading(false);
          return;
        }

        // بناء خريطة اسم المكان -> ID
        const siteNameToId = {};
        trainingSites.forEach(site => {
          siteNameToId[site.name] = site.id;
        });

        const counselors = rows.map((row) => {
          const siteName = row["مكان العمل"] || row["institution_name"] || "";
          return {
            name: row["الاسم الكامل"] || row["name"] || "",
            email: row["البريد الإلكتروني"] || row["email"] || "",
            password: row["كلمة المرور"] || row["password"] || "12345678",
            password_confirmation: row["كلمة المرور"] || row["password"] || "12345678",
            training_site_id: siteNameToId[siteName] || null,
            role_id: 6,
            status: "active",
          };
        });

        const validCounselors = counselors.filter(c => c.name && c.email && c.training_site_id);
        if (validCounselors.length === 0) {
          alert("لا توجد بيانات صالحة (تأكد من وجود الاسم، البريد، ومكان العمل المطابق لأحد الأماكن المسجلة)");
          setBulkLoading(false);
          return;
        }

        const successList = [];
        const errorList = [];

        for (const counselor of validCounselors) {
          try {
            const response = await createUser(counselor);
            successList.push({ email: counselor.email, id: response.data?.id });
          } catch (err) {
            const msg = err.response?.data?.message || err.message;
            errorList.push({ email: counselor.email, error: msg });
          }
        }

        setBulkResults({ success: successList, errors: errorList });
        if (successList.length) setFile(null);
      } catch (err) {
        console.error(err);
        alert("حدث خطأ أثناء معالجة الملف");
      } finally {
        setBulkLoading(false);
      }
    };
    reader.readAsBinaryString(file);
  };

  // وضع التعديل
  if (isEditMode) {
    return (
      <div className="user-form">
        <div className="page-header">
          <h1>تعديل مرشد</h1>
          <button onClick={() => navigate("/admin/users")} className="btn-secondary">رجوع</button>
        </div>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>الاسم الكامل *</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
            {errors.name && <span className="error">{errors.name[0]}</span>}
          </div>
          <div className="form-group">
            <label>البريد الإلكتروني *</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
            {errors.email && <span className="error">{errors.email[0]}</span>}
          </div>
          <div className="form-group">
            <label>مكان العمل *</label>
            <select name="training_site_id" value={form.training_site_id} onChange={handleChange} required>
              <option value="">اختر مكان العمل</option>
              {trainingSites.map(site => (
                <option key={site.id} value={site.id}>{site.name}</option>
              ))}
            </select>
            {errors.training_site_id && <span className="error">{errors.training_site_id[0]}</span>}
          </div>
          <div className="form-group">
            <label>كلمة المرور (اتركها فارغة إذا لم ترد التغيير)</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>تأكيد كلمة المرور</label>
            <input type="password" name="password_confirmation" value={form.password_confirmation} onChange={handleChange} />
          </div>
          <div className="form-actions">
            <button type="submit" disabled={loading}>{loading ? "جاري الحفظ..." : "تحديث"}</button>
            <button type="button" onClick={() => navigate("/admin/users")}>إلغاء</button>
          </div>
        </form>
      </div>
    );
  }

  // وضع الإضافة
  return (
    <div className="user-form">
      <div className="page-header">
        <h1>إضافة مرشد جديد</h1>
        <button onClick={() => navigate("/admin/users")} className="btn-secondary">رجوع</button>
      </div>

      <div className="tabs">
        <button className={activeTab === "single" ? "tab-active" : "tab"} onClick={() => setActiveTab("single")}>إضافة مرشد واحد</button>
        <button className={activeTab === "bulk" ? "tab-active" : "tab"} onClick={() => setActiveTab("bulk")}>رفع مجموعة من ملف Excel</button>
      </div>

      {activeTab === "single" && (
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>الاسم الكامل *</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
            {errors.name && <span className="error">{errors.name[0]}</span>}
          </div>
          <div className="form-group">
            <label>البريد الإلكتروني *</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
            {errors.email && <span className="error">{errors.email[0]}</span>}
          </div>
          <div className="form-group">
            <label>مكان العمل *</label>
            <select name="training_site_id" value={form.training_site_id} onChange={handleChange} required>
              <option value="">اختر مكان العمل</option>
              {trainingSites.map(site => (
                <option key={site.id} value={site.id}>{site.name}</option>
              ))}
            </select>
            {errors.training_site_id && <span className="error">{errors.training_site_id[0]}</span>}
          </div>
          <div className="form-group">
            <label>كلمة المرور *</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
            {errors.password && <span className="error">{errors.password[0]}</span>}
          </div>
          <div className="form-group">
            <label>تأكيد كلمة المرور *</label>
            <input type="password" name="password_confirmation" value={form.password_confirmation} onChange={handleChange} required />
          </div>
          <div className="form-actions">
            <button type="submit" disabled={loading}>{loading ? "جاري الحفظ..." : "إضافة"}</button>
            <button type="button" onClick={() => navigate("/admin/users")}>إلغاء</button>
          </div>
        </form>
      )}

      {activeTab === "bulk" && (
        <div className="bulk-section">
          <p>قم بتحميل ملف Excel يحتوي على الأعمدة التالية:</p>
          <ul>
            <li><strong>الاسم الكامل</strong> (مطلوب)</li>
            <li><strong>البريد الإلكتروني</strong> (مطلوب)</li>
            <li><strong>مكان العمل</strong> (مطلوب، ويجب أن يتطابق مع اسم أحد أماكن التدريب المسجلة)</li>
            <li><strong>كلمة المرور</strong> (اختياري، افتراضي 12345678)</li>
          </ul>
          <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
          <button onClick={processExcel} disabled={bulkLoading} className="btn-primary">{bulkLoading ? "جاري الرفع..." : "رفع والإضافة"}</button>
          {bulkResults.success.length > 0 && <div className="success-box">✅ تمت إضافة {bulkResults.success.length} مرشد بنجاح</div>}
          {bulkResults.errors.length > 0 && <div className="error-box">❌ فشلت إضافة {bulkResults.errors.length} مرشد<ul>{bulkResults.errors.map((e,i)=><li key={i}>{e.email}: {e.error}</li>)}</ul></div>}
        </div>
      )}
    </div>
  );
}