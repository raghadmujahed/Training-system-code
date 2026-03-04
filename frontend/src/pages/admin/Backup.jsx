import { useEffect, useState } from "react";
import { createBackup, getBackups } from "../../features/backup/backupAPI";

export default function Backup() {
  const [backups, setBackups] = useState([]);

  useEffect(() => {
    fetchBackups();
  }, []);

  const fetchBackups = async () => {
    try {
      const response = await getBackups();
      setBackups(response.data);
    } catch (error) {
      console.error("Error fetching backups:", error);
    }
  };

  const handleCreateBackup = async () => {
    if (window.confirm("هل تريد إنشاء نسخة احتياطية الآن؟")) {
      try {
        await createBackup();
        fetchBackups();
        alert("تم إنشاء النسخة الاحتياطية بنجاح!");
      } catch (error) {
        console.error("Error creating backup:", error);
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">النسخ الاحتياطي</h2>

      <button
        onClick={handleCreateBackup}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        إنشاء نسخة احتياطية
      </button>

      <h3 className="text-xl font-semibold mb-2">آخر النسخ الاحتياطية</h3>
      <ul>
        {backups.map((backup) => (
          <li key={backup.id} className="border p-2 mb-1">
            <span>{backup.filename}</span> - 
            <span> {new Date(backup.created_at).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}