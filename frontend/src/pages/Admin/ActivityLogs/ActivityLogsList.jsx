import { useEffect, useState } from "react";
import { getActivityLogs } from "../../../services/api";

export default function ActivityLogsList() {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({ user_id: "", action: "" });
  useEffect(() => { fetch(); }, [filters]);
  const fetch = async () => { const data = await getActivityLogs(filters); setLogs(data.data || []); };
  return (
    <div>
      <h1>سجل النشاطات</h1>
      <div className="filters-bar">
        <input type="text" placeholder="معرف المستخدم" value={filters.user_id} onChange={e => setFilters({...filters, user_id: e.target.value})} />
        <input type="text" placeholder="الإجراء" value={filters.action} onChange={e => setFilters({...filters, action: e.target.value})} />
      </div>
      <table className="data-table">
        <thead><tr><th>المستخدم</th><th>الإجراء</th><th>الوصف</th><th>IP</th><th>التاريخ</th></tr></thead>
        <tbody>{logs.map(log => (
          <tr key={log.id}><td>{log.user?.name}</td><td>{log.action}</td><td>{log.description}</td><td>{log.ip_address}</td><td>{new Date(log.created_at).toLocaleString()}</td></tr>
        ))}</tbody>
      </table>
    </div>
  );
}