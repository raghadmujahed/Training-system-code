import { useState, useEffect } from "react";
import { getRoles, createRole, deleteRole } from "../../features/roles/rolesAPI";

export default function RolesManagement() {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await getRoles();
      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const handleAddRole = async () => {
    if (!newRole) return alert("Enter role name");
    try {
      await createRole({ name: newRole });
      setNewRole("");
      fetchRoles();
    } catch (error) {
      console.error("Error creating role:", error);
    }
  };

  const handleDeleteRole = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteRole(id);
        fetchRoles();
      } catch (error) {
        console.error("Error deleting role:", error);
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">إدارة الصلاحيات</h2>

      <div className="mb-4">
        <input
          type="text"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          placeholder="أدخل اسم الدور"
          className="border p-2 mr-2"
        />
        <button onClick={handleAddRole} className="bg-green-500 text-white px-3 py-1 rounded">
          إضافة
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">اسم الدور</th>
            <th className="p-2">إجراءات</th>
          </tr>
        </thead>

        <tbody>
          {roles.map((role) => (
            <tr key={role.id} className="text-center border-t">
              <td className="p-2">{role.name}</td>
              <td className="p-2">
                <button
                  onClick={() => handleDeleteRole(role.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}