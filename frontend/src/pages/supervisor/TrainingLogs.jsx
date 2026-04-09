import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import EmptyState from "../../components/common/EmptyState";

export default function TrainingLogs() {
  const [logs, setLogs] = useState([
    {
      id: 1,
      studentName: "أحمد محمد",
      date: "2026-04-06",
      title: "تنفيذ حصة صفية",
      description: "تم تنفيذ حصة صفية في مادة اللغة العربية للصف السابع.",
      status: "قيد المراجعة",
      notes: "",
    },
    {
      id: 2,
      studentName: "سارة خالد",
      date: "2026-04-07",
      title: "ملاحظة صفية",
      description: "تمت ملاحظة أداء المعلمة داخل الصف وتوثيق أهم الملاحظات.",
      status: "مقبول",
      notes: "سجل جيد ومنظم.",
    },
    {
      id: 3,
      studentName: "محمد يوسف",
      date: "2026-04-08",
      title: "نشاط تدريبي",
      description: "تم تنفيذ نشاط تربوي جماعي مع الطلبة داخل الصف.",
      status: "بحاجة تعديل",
      notes: "يرجى توضيح أهداف النشاط ونتائجه بشكل أفضل.",
    },
  ]);

  const updateStatus = (id, status) => {
    setLogs((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const updateNotes = (id, notes) => {
    setLogs((prev) =>
      prev.map((item) => (item.id === id ? { ...item, notes } : item))
    );
  };

  const getBadgeClass = (status) => {
    if (status === "مقبول") return "badge-success";
    if (status === "بحاجة تعديل") return "badge-danger";
    return "badge-warning";
  };

  return (
    <>
      <PageHeader
        title="متابعة سجل التدريب اليومي"
        subtitle="مراجعة السجلات اليومية المرسلة من الطلبة وإضافة الملاحظات عليها"
      />

      {!logs.length ? (
        <EmptyState
          title="لا توجد سجلات تدريب يومية"
          description="لم يتم إرسال أي سجل يومي حتى الآن."
        />
      ) : (
        <div className="list-clean">
          {logs.map((item) => (
            <div key={item.id} className="list-item-card">
              <div className="panel-header">
                <div>
                  <h4 className="panel-title">{item.studentName}</h4>
                  <p className="panel-subtitle">
                    {item.title} — {item.date}
                  </p>
                </div>

                <span className={`badge-custom ${getBadgeClass(item.status)}`}>
                  {item.status}
                </span>
              </div>

              <div className="list-clean" style={{ marginTop: "12px", gap: "8px" }}>
                <p className="text-soft mb-0">{item.description}</p>

                <div className="form-group-custom" style={{ marginBottom: 0 }}>
                  <label className="form-label-custom">ملاحظات المشرف</label>
                  <textarea
                    className="form-textarea-custom"
                    value={item.notes}
                    onChange={(e) => updateNotes(item.id, e.target.value)}
                    placeholder="أدخل ملاحظاتك على السجل اليومي..."
                  />
                </div>

                <div className="table-actions">
                  <button
                    className="btn-success-custom btn-sm-custom"
                    onClick={() => updateStatus(item.id, "مقبول")}
                  >
                    قبول
                  </button>

                  <button
                    className="btn-warning-custom btn-sm-custom"
                    onClick={() => updateStatus(item.id, "قيد المراجعة")}
                  >
                    قيد المراجعة
                  </button>

                  <button
                    className="btn-danger-custom btn-sm-custom"
                    onClick={() => updateStatus(item.id, "بحاجة تعديل")}
                  >
                    بحاجة تعديل
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}