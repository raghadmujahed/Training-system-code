import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../../features/users/usersAPI";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      setUsers(await getUsers());
    }
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div>
      <h2>إدارة المستخدمين</h2>
      <ul>
        {users.map(u => (
          <li key={u.id}>
            {u.name} ({u.role})
            <button onClick={() => handleDelete(u.id)}>حذف</button>
          </li>
        ))}
      </ul>
    </div>
  );
}