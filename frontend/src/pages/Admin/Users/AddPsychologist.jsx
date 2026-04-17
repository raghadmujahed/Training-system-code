// src/pages/Admin/Users/AddPsychologist.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, createUser, updateUser, getTrainingSites } from "../../../services/api";
import * as XLSX from "xlsx";

export default function AddPsychologist() {
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
    specialization: "",
    training_site_id: "",
    role_id: 7,
  });

  const [file, setFile] = useState(null);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [bulkResults, setBulkResults] = useState({ success: [], errors: [] });
  const isEditMode = !!id;

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const res = await getTrainingSites();
        setTrainingSites(res.data || []);
      } catch (err) {
        console.error(err);
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
            specialization: userData.specialization || "",
            training_site_id: userData.training_site_id || "",
            role_id: userData.role_id || 7,
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

        const siteNameToId = {};
        trainingSites.forEach(site => { siteNameToId[site.name] = site.id; });

        const psychologists = rows.map(row => ({
          name: row["الاسم الكامل"] || row["name"] || "",
          email: row["البريد الإلكتروني"] || row["email"] || "",
          password: row["كلمة المرور"] || row["password"] || "12345678",
          password_confirmation: row["كلمة المرور"] || row["password"] || "12345678",
          specialization: row["الاختصاص"] || row["specialization"] || "",
          training_site_id: siteNameToId[row["مكان العمل"] || row["institution_name"] || ""] || null,
          role_id: 7,
          status: "active",
        }));

        const valid = psychologists.filter(p => p.name && p.email && p.training_site_id);
        if (valid.length === 0) { alert("لا توجد بيانات صالحة (تأكد من الاسم، البريد، ومكان العمل المطابق)"); setBulkLoading(false); return; }
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
        <div className="page-header"><h1>تعديل أخصائي نفسي</h1><button onClick={() => navigate("/admin/users")}>رجوع</button></div>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group"><label>الاسم الكامل *</label><input type="text" name="name" value={form.name} onChange={handleChange} required /></div>
          <div className="form-group"><label>البريد الإلكتروني *</label><input type="email" name="email" value={form.email} onChange={handleChange} required /></div>
          <div className="form-group"><label>الاختصاص</label><input type="text" name="specialization" value={form.specialization} onChange={handleChange} /></div>
          <div className="form-group"><label>مكان العمل *</label><select name="training_site_id" value={form.training_site_id} onChange={handleChange} required><option value="">اختر مكان العمل</option>{trainingSites.map(site=><option key={site.id} value={site.id}>{site.name}</option>)}</select></div>
          <div className="form-group"><label>كلمة المرور (اتركها فارغة)</label><input type="password" name="password" value={form.password} onChange={handleChange} /></div>
          <div className="form-group"><label>تأكيد كلمة المرور</label><input type="password" name="password_confirmation" value={form.password_confirmation} onChange={handleChange} /></div>
          <div className="form-actions"><button type="submit" disabled={loading}>{loading ? "جاري الحفظ..." : "تحديث"}</button><button type="button" onClick={() => navigate("/admin/users")}>إلغاء</button></div>
        </form>
      </div>
    );
  }

  return (
    <div className="user-form">
      <div className="page-header"><h1>إضافة أخصائي نفسي جديد</h1><button onClick={() => navigate("/admin/users")}>رجوع</button></div>
      <div className="tabs">
        <button className={activeTab === "single" ? "tab-active" : "tab"} onClick={() => setActiveTab("single")}>إضافة أخصائي واحد</button>
        <button className={activeTab === "bulk" ? "tab-active" : "tab"} onClick={() => setActiveTab("bulk")}>رفع مجموعة من Excel</button>
      </div>
      {activeTab === "single" && (
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group"><label>الاسم الكامل *</label><input type="text" name="name" value={form.name} onChange={handleChange} required /></div>
          <div className="form-group"><label>البريد الإلكتروني *</label><input type="email" name="email" value={form.email} onChange={handleChange} required /></div>
          <div className="form-group"><label>الاختصاص</label><input type="text" name="specialization" value={form.specialization} onChange={handleChange} /></div>
          <div className="form-group"><label>مكان العمل *</label><select name="training_site_id" value={form.training_site_id} onChange={handleChange} required><option value="">اختر مكان العمل</option>{trainingSites.map(site=><option key={site.id} value={site.id}>{site.name}</option>)}</select></div>
          <div className="form-group"><label>كلمة المرور *</label><input type="password" name="password" value={form.password} onChange={handleChange} required /></div>
          <div className="form-group"><label>تأكيد كلمة المرور *</label><input type="password" name="password_confirmation" value={form.password_confirmation} onChange={handleChange} required /></div>
          <div className="form-actions"><button type="submit" disabled={loading}>{loading ? "جاري الحفظ..." : "إضافة"}</button><button type="button" onClick={() => navigate("/admin/users")}>إلغاء</button></div>
        </form>
      )}
      {activeTab === "bulk" && (
        <div className="bulk-section">
          <p>قم بتحميل ملف Excel يحتوي على الأعمدة: <strong>الاسم الكامل، البريد الإلكتروني، الاختصاص، مكان العمل (يجب أن يطابق اسم مكان تدريب مسجل)، كلمة المرور (اختياري)</strong></p>
          <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
          <button onClick={processExcel} disabled={bulkLoading} className="btn-primary">{bulkLoading ? "جاري الرفع..." : "رفع والإضافة"}</button>
          {bulkResults.success.length > 0 && <div className="success-box">✅ تمت إضافة {bulkResults.success.length} أخصائي نفسي بنجاح</div>}
          {bulkResults.errors.length > 0 && <div className="error-box">❌ فشلت إضافة {bulkResults.errors.length} أخصائي<ul>{bulkResults.errors.map((e,i)=><li key={i}>{e.email}: {e.error}</li>)}</ul></div>}
        </div>
      )}
    </div>
  );
}