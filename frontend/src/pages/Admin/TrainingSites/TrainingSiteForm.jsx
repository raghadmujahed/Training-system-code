import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTrainingSite, createTrainingSite, updateTrainingSite } from "../../../services/api";

export default function TrainingSiteForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", location: "", phone: "", description: "", directorate: "وسط", capacity: 10, site_type: "school", governing_body: "directorate_of_education", is_active: true });
  useEffect(() => { if (id) getTrainingSite(id).then(data => setForm(data)); }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) await updateTrainingSite(id, form);
    else await createTrainingSite(form);
    navigate("/admin/training-sites");
  };
  return (
    <form onSubmit={handleSubmit} className="form">
      <h1>{id ? "تعديل موقع تدريب" : "إضافة موقع تدريب"}</h1>
      <div className="form-group"><label>الاسم</label><input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required /></div>
      <div className="form-group"><label>الموقع</label><input type="text" value={form.location} onChange={e => setForm({...form, location: e.target.value})} /></div>
      <div className="form-group"><label>الهاتف</label><input type="text" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
      <div className="form-group"><label>المديرية</label>
        <select value={form.directorate} onChange={e => setForm({...form, directorate: e.target.value})}>
          <option value="وسط">وسط</option><option value="شمال">شمال</option><option value="جنوب">جنوب</option><option value="يطا">يطا</option>
        </select>
      </div>
      <div className="form-group"><label>السعة</label><input type="number" value={form.capacity} onChange={e => setForm({...form, capacity: parseInt(e.target.value)})} /></div>
      <div className="form-group"><label>نوع الموقع</label>
        <select value={form.site_type} onChange={e => setForm({...form, site_type: e.target.value})}>
          <option value="school">مدرسة</option><option value="health_center">مركز صحي</option>
        </select>
      </div>
      <div className="form-group"><label>الجهة المسؤولة</label>
        <select value={form.governing_body} onChange={e => setForm({...form, governing_body: e.target.value})}>
          <option value="directorate_of_education">مديرية التربية</option><option value="ministry_of_health">وزارة الصحة</option>
        </select>
      </div>
      <div className="form-group"><label>نشط</label><input type="checkbox" checked={form.is_active} onChange={e => setForm({...form, is_active: e.target.checked})} /></div>
      <button type="submit">حفظ</button>
    </form>
  );
}