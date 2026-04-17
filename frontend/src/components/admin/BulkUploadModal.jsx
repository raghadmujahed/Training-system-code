// src/components/admin/BulkUploadModal.jsx
import { useState } from "react";
import * as XLSX from "xlsx";
import { createUser } from "../../services/api";

export default function BulkUploadModal({ isOpen, onClose, onSuccess, roleId = 5 }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({ success: [], errors: [] });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResults({ success: [], errors: [] });
  };

  const processExcel = async () => {
    if (!file) {
      alert("الرجاء اختيار ملف Excel أولاً");
      return;
    }

    setLoading(true);
    setResults({ success: [], errors: [] });

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const binaryData = evt.target.result;
        const workbook = XLSX.read(binaryData, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(worksheet);

        if (rows.length === 0) {
          alert("الملف فارغ أو لا يحتوي على بيانات");
          setLoading(false);
          return;
        }

        // تحويل الصفوف إلى كائنات المستخدم
        const users = rows.map((row) => ({
          name: row["الاسم الكامل"] || row["name"] || "",
          email: row["البريد الإلكتروني"] || row["email"] || "",
          password: row["كلمة المرور"] || row["password"] || "12345678",
          password_confirmation: row["كلمة المرور"] || row["password"] || "12345678",
          university_id: row["الرقم الجامعي"] || row["university_id"] || "",
          major: row["التخصص"] || row["major"] || "",
          role_id: roleId,
          status: "active",
        }));

        // التحقق من البيانات الأساسية
        const validUsers = users.filter(
          (u) => u.name && u.email && u.university_id
        );
        if (validUsers.length === 0) {
          alert("لا توجد بيانات صالحة للإضافة (تأكد من وجود الاسم، البريد، الرقم الجامعي)");
          setLoading(false);
          return;
        }

        const successList = [];
        const errorList = [];

        // إرسال كل مستخدم على حدة
        for (const user of validUsers) {
          try {
            const response = await createUser(user);
            successList.push({ email: user.email, id: response.data?.id });
          } catch (err) {
            const msg = err.response?.data?.message || err.message;
            errorList.push({ email: user.email, error: msg });
          }
        }

        setResults({ success: successList, errors: errorList });
        if (successList.length) {
          onSuccess?.(); // تحديث القائمة الرئيسية
          setFile(null);
        }
      } catch (err) {
        console.error(err);
        alert("حدث خطأ أثناء معالجة الملف");
      } finally {
        setLoading(false);
      }
    };

    reader.readAsBinaryString(file);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>استيراد مستخدمين من ملف Excel</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <p>قم بتحميل ملف Excel يحتوي على الأعمدة التالية:</p>
          <ul>
            <li><strong>الاسم الكامل</strong> (مطلوب)</li>
            <li><strong>البريد الإلكتروني</strong> (مطلوب)</li>
            <li><strong>الرقم الجامعي</strong> (مطلوب)</li>
            <li><strong>التخصص</strong> (اختياري)</li>
            <li><strong>كلمة المرور</strong> (اختياري، افتراضي 12345678)</li>
          </ul>
          <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
          <button onClick={processExcel} disabled={loading} className="btn-primary">
            {loading ? "جاري الرفع..." : "رفع والإضافة"}
          </button>

          {results.success.length > 0 && (
            <div className="success-box">
              <h4>✅ تمت إضافة {results.success.length} مستخدم بنجاح</h4>
            </div>
          )}
          {results.errors.length > 0 && (
            <div className="error-box">
              <h4>❌ فشلت إضافة {results.errors.length} مستخدم</h4>
              <ul>
                {results.errors.map((e, idx) => (
                  <li key={idx}>{e.email} : {e.error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}