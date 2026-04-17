import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, createUser, updateUser } from "../../../services/api";
import * as XLSX from "xlsx";

export default function AddAcademicSupervisor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("single");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "", email: "", password: "", password_confirmation: "",
    department: "", role_id: 3,
  });
  const [file, setFile] = useState(null);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [bulkResults, setBulkResults] = useState({ success: [], errors: [] });
  const isEditMode = !!id;

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const userData = await getUser(id);
          setForm({
            name: userData.name || "", email: userData.email || "",
            password: "", password_confirmation: "",
            department: userData.department || "",
            role_id: userData.role_id || 3,
          });
        } catch (err) { console.error(err); }
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
      if (id) await updateUser(id, form);
      else await createUser(form);
      navigate("/admin/users");
    } catch (err) {
      if (err.response?.data?.errors) setErrors(err.response.data.errors);
      else alert("حدث خطأ");
    } finally { setLoading(false); }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setBulkResults({ success: [], errors: [] });
  };

  const processExcel = async () => {
    if (!file) { alert("الرجاء اختيار ملف Excel أولاً"); return; }
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
        if (rows.length === 0) { alert("الملف فارغ"); setBulkLoading(false); return; }
        const supervisors = rows.map(row => ({
          name: row["الاسم الكامل"] || row["name"] || "",
          email: row["البريد الإلكتروني"] || row["email"] || "",
          password: row["كلمة المرور"] || row["password"] || "12345678",
          password_confirmation: row["كلمة المرور"] || row["password"] || "12345678",
          department: row["القسم"] || row["department"] || "",
          role_id: 3, status: "active",
        }));
        const valid = supervisors.filter(s => s.name && s.email);
        if (valid.length === 0) { alert("لا توجد بيانات صالحة"); setBulkLoading(false); return; }
        const successList = [], errorList = [];
        for (const user of valid) {
          try {
            const response = await createUser(user);
            successList.push({ email: user.email, id: response.data?.id });
          } catch (err) {
            errorList.push({ email: user.email, error: err.response?.data?.message || err.message });
          }
        }
        setBulkResults({ success: successList, errors: errorList });
        if (successList.length) setFile(null);
      } catch (err) { alert("حدث خطأ"); }
      finally { setBulkLoading(false); }
    };
    reader.readAsBinaryString(file);
  };

  if (isEditMode) {
    return (
      <div className="user-form">
        <div className="page-header"><h1>تعديل مشرف أكاديمي</h1><button onClick={() => navigate("/admin/users")}>رجوع</button></div>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group"><label>الاسم الكامل *</label><input type="text" name="name" value={form.name} onChange={handleChange} required /></div>
          <div className="form-group"><label>البريد الإلكتروني *</label><input type="email" name="email" value={form.email} onChange={handleChange} required /></div>
          <div className="form-group"><label>القسم</label><input type="text" name="department" value={form.department} onChange={handleChange} /></div>
          <div className="form-group"><label>كلمة المرور (اتركها فارغة)</label><input type="password" name="password" value={form.password} onChange={handleChange} /></div>
          <div className="form-group"><label>تأكيد كلمة المرور</label><input type="password" name="password_confirmation" value={form.password_confirmation} onChange={handleChange} /></div>
          <div className="form-actions"><button type="submit" disabled={loading}>{loading ? "جاري الحفظ..." : "تحديث"}</button><button type="button" onClick={() => navigate("/admin/users")}>إلغاء</button></div>
        </form>
      </div>
    );
  }

  return (
    <div className="user-form">
      <div className="page-header"><h1>إضافة مشرف أكاديمي جديد</h1><button onClick={() => navigate("/admin/users")}>رجوع</button></div>
      <div className="tabs">
        <button className={activeTab === "single" ? "tab-active" : "tab"} onClick={() => setActiveTab("single")}>إضافة مشرف واحد</button>
        <button className={activeTab === "bulk" ? "tab-active" : "tab"} onClick={() => setActiveTab("bulk")}>رفع مجموعة من Excel</button>
      </div>
      {activeTab === "single" && (
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group"><label>الاسم الكامل *</label><input type="text" name="name" value={form.name} onChange={handleChange} required /></div>
          <div className="form-group"><label>البريد الإلكتروني *</label><input type="email" name="email" value={form.email} onChange={handleChange} required /></div>
          <div className="form-group"><label>القسم</label><input type="text" name="department" value={form.department} onChange={handleChange} /></div>
          <div className="form-group"><label>كلمة المرور *</label><input type="password" name="password" value={form.password} onChange={handleChange} required /></div>
          <div className="form-group"><label>تأكيد كلمة المرور *</label><input type="password" name="password_confirmation" value={form.password_confirmation} onChange={handleChange} required /></div>
          <div className="form-actions"><button type="submit" disabled={loading}>{loading ? "جاري الحفظ..." : "إضافة"}</button><button type="button" onClick={() => navigate("/admin/users")}>إلغاء</button></div>
        </form>
      )}
      {activeTab === "bulk" && (
        <div className="bulk-section">
          <p>قم بتحميل ملف Excel يحتوي على الأعمدة: <strong>الاسم الكامل، البريد الإلكتروني، القسم، كلمة المرور (اختياري)</strong></p>
          <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
          <button onClick={processExcel} disabled={bulkLoading} className="btn-primary">{bulkLoading ? "جاري الرفع..." : "رفع والإضافة"}</button>
          {bulkResults.success.length > 0 && <div className="success-box">✅ تمت إضافة {bulkResults.success.length} مشرف أكاديمي بنجاح</div>}
          {bulkResults.errors.length > 0 && <div className="error-box">❌ فشلت إضافة {bulkResults.errors.length} مشرف<ul>{bulkResults.errors.map((e,i)=><li key={i}>{e.email}: {e.error}</li>)}</ul></div>}
        </div>
      )}
    </div>
  );
}