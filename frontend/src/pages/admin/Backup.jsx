import React from "react";

export default function Backup() {
  const handleBackup = () => {
    alert("تم إنشاء نسخة احتياطية!"); 
    // هنا ممكن تربطي الـ API للنسخ الاحتياطي من Laravel
  };

  return (
    <div>
      <h2>النسخ الاحتياطي</h2>
      <button onClick={handleBackup}>إنشاء نسخة احتياطية</button>
    </div>
  );
}