import { useState } from "react";

const statusBadge = (status) =>
  status === "تم الإرسال" ? "badge-success" : "badge-warning";

const responseBadge = (resp) => {
  if (!resp) return "badge-soft";
  if (resp.includes("موافقة")) return "badge-success";
  if (resp.includes("مرفوض")) return "badge-danger";
  return "badge-warning";
};

// --- استبدل هذا المصفوفة الفارغة ببيانات API ---
const initialLetters = [];

const recipientOptions = [
  "مديرية التربية والتعليم - الخليل",
  "مديرية التربية والتعليم - شمال الخليل",
  "مديرية التربية والتعليم - جنوب الخليل",
  "مديرية التربية والتعليم - يطا",
  "وزارة الصحة - مديرية الخليل",
  "وزارة الصحة - جنوب الضفة",
];

export default function OfficialLetters() {
  const [letters, setLetters] = useState(initialLetters);
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [form, setForm] = useState({ subject: "", recipient: "", studentsCount: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.subject.trim() || !form.recipient) {
      alert("يرجى تعبئة جميع الحقول.");
      return;
    }
    // TODO: أرسل الكتاب إلى API هنا — هذا مثال محلي مؤقت
    const newLetter = {
      id: Date.now(),
      subject: form.subject,
      recipient: form.recipient,
      date: new Date().toISOString().split("T")[0],
      status: "مسودة",
      response: "",
      studentsCount: Number(form.studentsCount) || 0,
    };
    setLetters((prev) => [newLetter, ...prev]);
    setForm({ subject: "", recipient: "", studentsCount: "" });
    setShowForm(false);
  };

  const handleSend = (id) => {
    if (!window.confirm("هل تريد إرسال هذا الكتاب؟")) return;
    // TODO: استدعِ API لتغيير الحالة
    setLetters((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, status: "تم الإرسال", response: "بانتظار الرد" } : l
      )
    );
  };

  const handleDelete = (id) => {
    if (!window.confirm("هل تريد حذف هذا الكتاب؟")) return;
    // TODO: استدعِ API للحذف
    setLetters((prev) => prev.filter((l) => l.id !== id));
  };

  const filtered =
    filterStatus === "all" ? letters : letters.filter((l) => l.status === filterStatus);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-primary">الكتب الرسمية</h1>
        <p className="text-muted-foreground text-sm mt-1">
          إنشاء الكتب الرسمية وإرسالها إلى المديريات واستقبال الردود
        </p>
      </div>

      {/* Actions bar */}
      <div className="flex flex-wrap gap-3 mb-4">
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "إلغاء" : "➕ إنشاء كتاب رسمي"}
        </button>
        <select
          className="form-select"
          style={{ maxWidth: 200 }}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">جميع الحالات</option>
          <option value="مسودة">مسودة</option>
          <option value="تم الإرسال">تم الإرسال</option>
        </select>
      </div>

      {/* Create form */}
      {showForm && (
        <div className="card mb-5" style={{ borderColor: "rgba(176,141,87,0.4)" }}>
          <h3 className="font-black text-primary mb-4">إنشاء كتاب رسمي جديد</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">عنوان الكتاب</label>
              <input
                type="text"
                className="form-input"
                value={form.subject}
                onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                placeholder="مثال: كتاب توزيع طلبة التربية العملية"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">الجهة المستلمة</label>
                <select
                  className="form-select"
                  value={form.recipient}
                  onChange={(e) => setForm((p) => ({ ...p, recipient: e.target.value }))}
                >
                  <option value="">اختر الجهة</option>
                  {recipientOptions.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">عدد الطلبة</label>
                <input
                  type="number"
                  className="form-input"
                  value={form.studentsCount}
                  onChange={(e) => setForm((p) => ({ ...p, studentsCount: e.target.value }))}
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn btn-primary">إنشاء الكتاب</button>
              <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>إلغاء</button>
            </div>
          </form>
        </div>
      )}

      {/* Letters list */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <p className="text-3xl mb-3">📭</p>
          <h4 className="font-bold text-foreground mb-1">لا توجد كتب رسمية</h4>
          <p className="text-muted-foreground text-sm">
            {letters.length === 0
              ? "لم يتم ربط قاعدة البيانات بعد"
              : "لا توجد نتائج بهذه الحالة"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((letter) => (
            <div key={letter.id} className="card">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-foreground">{letter.subject}</h4>
                    <span className={`badge ${statusBadge(letter.status)}`}>
                      {letter.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">إلى: {letter.recipient}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground flex-wrap">
                    <span>📅 {letter.date}</span>
                    <span>👥 {letter.studentsCount} طالب/ة</span>
                    {letter.response && (
                      <span className={`badge ${responseBadge(letter.response)}`}>
                        {letter.response}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  {letter.status === "مسودة" && (
                    <button className="btn btn-success btn-sm" onClick={() => handleSend(letter.id)}>
                      إرسال
                    </button>
                  )}
                  <button className="btn btn-outline btn-sm">تفاصيل</button>
                  {letter.status === "مسودة" && (
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(letter.id)}>
                      حذف
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}