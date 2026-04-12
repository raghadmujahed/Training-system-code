import { useEffect, useState } from "react";
import { getBackups, createBackup, restoreBackup, deleteBackup } from "../../../services/api";

export default function BackupsList() {
  const [backups, setBackups] = useState([]);
  useEffect(() => { fetch(); }, []);
  const fetch = async () => { const data = await getBackups(); setBackups(data.data || []); };
  const handleCreate = async () => { await createBackup({ type: "full" }); fetch(); };
  const handleRestore = async (id) => { if (confirm("استعادة النسخة؟")) { await restoreBackup(id); alert("تمت الاستعادة"); } };
  const handleDelete = async (id) => { if (confirm("حذف النسخة؟")) { await deleteBackup(id); fetch(); } };
  return (
    <div>
      <div className="page-header"><h1>النسخ الاحتياطية</h1><button onClick={handleCreate} className="btn-primary">إنشاء نسخة جديدة</button></div>
      <table className="data-table">
        <thead><tr><th>الاسم</th><th>التاريخ</th><th>الحجم</th><th>إجراءات</th></tr></thead>
        <tbody>{backups.map(b => (
          <tr key={b.id}><td>{b.name}</td><td>{new Date(b.created_at).toLocaleString()}</td><td>{b.size} bytes</td>
          <td><button onClick={() => handleRestore(b.id)} className="btn-sm">استعادة</button><button onClick={() => handleDelete(b.id)} className="btn-sm danger">حذف</button></td></tr>
        ))}</tbody>
      </table>
    </div>
  );
}