import { useEffect, useState } from "react";
import { getReports } from "../../features/reports/reportsAPI";

export default function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    async function fetchReports() {
      setReports(await getReports());
    }
    fetchReports();
  }, []);

  return (
    <div>
      <h2>التقارير العامة</h2>
      <ul>
        {reports.map(r => (
          <li key={r.id}>{r.title}</li>
        ))}
      </ul>
    </div>
  );
}