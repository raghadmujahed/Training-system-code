// إنشاء مستخدم جديد
export const createUser = async (userData) => {
  try {
    const response = await fetch('http://localhost:8000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (!response.ok) throw new Error('Failed to create user');
    return await response.json();
  } catch (error) {
    console.error('Error in createUser:', error);
    throw error;
  }
};

// حذف مستخدم
export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error('Failed to delete user');
    return await response.json();
  } catch (error) {
    console.error('Error in deleteUser:', error);
    throw error;
  }
};

// جلب قائمة المستخدمين
export const getUsers = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/users', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error('Failed to fetch users');
    return await response.json();
  } catch (error) {
    console.error('Error in getUsers:', error);
    throw error;
  }
};