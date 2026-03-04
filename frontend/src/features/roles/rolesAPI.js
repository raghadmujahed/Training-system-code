import axios from "axios";

/*export const getRoles = async () => [
  { id: 1, name: "Admin" },
  { id: 2, name: "Student" },
  { id: 3, name: "Supervisor" }
];*/

export const updateRole = async (role) => {
  alert(`تم تحديث الصلاحية: ${role.name} (mock)`);
};


const API_URL = "http://127.0.0.1:8000/api";

export const getRoles = () => axios.get(`${API_URL}/roles`);
export const createRole = (data) => axios.post(`${API_URL}/roles`, data);
export const deleteRole = (id) => axios.delete(`${API_URL}/roles/${id}`);