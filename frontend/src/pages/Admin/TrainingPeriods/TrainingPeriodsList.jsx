import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTrainingPeriods, deleteTrainingPeriod, setActivePeriod } from "../../../services/api";

export default function TrainingPeriodsList() {
  const [periods, setPeriods] = useState([]);
  useEffect(() => { fetch(); }, []);
  const fetch = async () => { const data = await getTrainingPeriods(); setPeriods(data.data || []); };
  const handleDelete = async (id) => { if (confirm("حذف الفترة؟")) { await deleteTrainingPeriod(id); fetch(); } };
  const handleSetActive = async (id) => { await setActivePeriod(id); fetch(); };
  return (
    <div>
      <div className="page-header"><h1>الفترات التدريبية</h1><Link to="/admin/training-periods/create" className="btn-primary">+ إضافة فترة</Link></div>
      <table className="data-table">
        <thead><tr><th>الاسم</th><th>تاريخ البدء</th><th>تاريخ النهاية</th><th>نشطة</th><th>إجراءات</th></tr></thead>
        <tbody>{periods.map(p => (
          <tr key={p.id}>
            <td>{p.name}</td><td>{p.start_date}</td><td>{p.end_date}</td><td>{p.is_active ? "نعم" : "لا"}</td>
            <td>
              <Link to={`/admin/training-periods/edit/${p.id}`} className="btn-sm">تعديل</Link>
              {!p.is_active && <button onClick={() => handleSetActive(p.id)} className="btn-sm">تفعيل</button>}
              <button onClick={() => handleDelete(p.id)} className="btn-sm danger">حذف</button>
            </td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}