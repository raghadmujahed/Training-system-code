import { useState, useEffect } from "react";
import { getAnnouncements, createAnnouncement, deleteAnnouncement } from "../../features/announcements/announcementsAPI";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await getAnnouncements();
      setAnnouncements(response.data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  const handleAddAnnouncement = async () => {
    if (!newTitle || !newContent) return alert("أدخل عنوان ومحتوى الإعلان");
    try {
      await createAnnouncement({ title: newTitle, content: newContent });
      setNewTitle("");
      setNewContent("");
      fetchAnnouncements();
    } catch (error) {
      console.error("Error creating announcement:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("هل تريد حذف هذا الإعلان؟")) {
      try {
        await deleteAnnouncement(id);
        fetchAnnouncements();
      } catch (error) {
        console.error("Error deleting announcement:", error);
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">الإعلانات العامة</h2>

      <div className="mb-4 border p-4">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="عنوان الإعلان"
          className="border p-2 w-full mb-2"
        />
        <textarea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          placeholder="محتوى الإعلان"
          className="border p-2 w-full mb-2"
        />
        <button onClick={handleAddAnnouncement} className="bg-green-500 text-white px-4 py-2 rounded">
          إضافة إعلان
        </button>
      </div>

      <ul>
        {announcements.map((a) => (
          <li key={a.id} className="border p-3 mb-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold">{a.title}</h3>
                <p>{a.content}</p>
                <small>{new Date(a.created_at).toLocaleString()}</small>
              </div>
              <button
                onClick={() => handleDelete(a.id)}
                className="bg-red-500 text-white px-2 py-1 rounded ml-2"
              >
                حذف
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}