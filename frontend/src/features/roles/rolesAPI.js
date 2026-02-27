export const getRoles = async () => [
  { id: 1, name: "Admin" },
  { id: 2, name: "Student" },
  { id: 3, name: "Supervisor" }
];

export const updateRole = async (role) => {
  alert(`تم تحديث الصلاحية: ${role.name} (mock)`);
};