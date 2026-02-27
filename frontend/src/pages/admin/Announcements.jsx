import { useEffect, useState } from "react";
import { getAnnouncements } from "../../features/announcements/announcementsAPI";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getAnnouncements();
      setAnnouncements(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>الإعلانات العامة</h2>
      <ul>
        {announcements.map((a) => (
          <li key={a.id}>{a.title}</li>
        ))}
      </ul>
    </div>
  );
}