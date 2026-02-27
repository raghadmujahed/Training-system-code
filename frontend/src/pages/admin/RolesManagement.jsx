import { useState, useEffect } from "react";
import { getRoles, updateRole } from "../../features/roles/rolesAPI";

export default function RolesManagement() {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    async function fetchRoles() {
      setRoles(await getRoles());
    }
    fetchRoles();
  }, []);

  const handleUpdate = async (role) => {
    await updateRole(role);
    alert("تم تحديث الصلاحية");
  };

  return (
    <div>
      <h2>إدارة الصلاحيات</h2>
      <ul>
        {roles.map(r => (
          <li key={r.id}>
            {r.name}
            <button onClick={() => handleUpdate(r)}>تحديث</button>
          </li>
        ))}
      </ul>
    </div>
  );
}