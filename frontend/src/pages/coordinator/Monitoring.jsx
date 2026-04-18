import { useState } from "react";

const statusBadge = (status) => {
  const map = {
    "مقبول": "badge-success",
    "قيد المتابعة": "badge-warning",
    "منجز": "badge-primary",
    "منسحب": "badge-danger",
  };
  return map[status] ?? "badge-soft";
};

const attendanceBadge = (rate) => {
  if (rate >= 90) return "badge-success";
  if (rate >= 70) return "badge-warning";
  return "badge-danger";
};

const evalBadge = (ev) => {
  const map = {
    "مكتمل": "badge-success",
    "قيد الإدخال": "badge-warning",
    "غير مكتمل": "badge-danger",
  };
  return map[ev] ?? "badge-soft";
};

// --- استبدل هذا المصفوفة الفارغة ببيانات API ---
const initialRecords = [];

export default function Monitoring() {
  const [records] = useState(initialRecords);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = records.filter((r) => {
    const matchSearch =
      r.studentName.includes(search) ||
      r.supervisor.includes(search) ||
      r.trainingSite.includes(search);
    const matchStatus = filterStatus === "all" || r.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-primary">متابعة سير التدريب الميداني</h1>
        <p className="text-muted-foreground text-sm mt-1">
          الاطلاع على حالة كل طالب ومراقبة تقارير المشرفين الأكاديميين
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        {[
          { label: "إجمالي", value: records.length, cls: "primary" },
          { label: "مقبول / منجز", value: records.filter((r) => r.status === "مقبول" || r.status === "منجز").length, cls: "success" },
          { label: "قيد المتابعة", value: records.filter((r) => r.status === "قيد المتابعة").length, cls: "warning" },
          { label: "منسحب", value: records.filter((r) => r.status === "منسحب").length, cls: "danger" },
        ].map((stat) => (
          <div key={stat.label} className={`stat-card ${stat.cls} rounded-2xl p-4`}>
            <div className="text-white/70 text-xs mb-1">{stat.label}</div>
            <div className="text-2xl font-black">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card mb-4">
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="بحث بالاسم أو مكان التدريب أو المشرف..."
            className="form-input flex-1 min-w-48"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="form-select"
            style={{ maxWidth: 200 }}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">جميع الحالات</option>
            <option value="مقبول">مقبول</option>
            <option value="قيد المتابعة">قيد المتابعة</option>
            <option value="منجز">منجز</option>
            <option value="منسحب">منسحب</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <h3 className="font-black text-primary mb-4">حالة الطلبة في التدريب</h3>
        {filtered.length === 0 ? (
          <div className="empty-state">
            <p className="text-3xl mb-3">📊</p>
            <h4 className="font-bold text-foreground mb-1">لا توجد بيانات</h4>
            <p className="text-muted-foreground text-sm">
              {records.length === 0
                ? "لم يتم ربط قاعدة البيانات بعد"
                : "لا توجد نتائج تطابق البحث"}
            </p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>الطالب</th>
                  <th>الشعبة</th>
                  <th>المشرف</th>
                  <th>مكان التدريب</th>
                  <th>الحالة</th>
                  <th>الحضور</th>
                  <th>التقييم</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id}>
                    <td className="font-bold">{r.studentName}</td>
                    <td className="text-sm">{r.section}</td>
                    <td className="text-sm">{r.supervisor}</td>
                    <td className="text-sm">{r.trainingSite}</td>
                    <td><span className={`badge ${statusBadge(r.status)}`}>{r.status}</span></td>
                    <td><span className={`badge ${attendanceBadge(r.attendanceRate)}`}>{r.attendanceRate}%</span></td>
                    <td><span className={`badge ${evalBadge(r.evalStatus)}`}>{r.evalStatus}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}