export const loginUser = async (email, password) => {
  // بيانات وهمية
  const mockUser = {
    email: "admin@test.com",
    password: "123456",
    role: "admin"
  };

  if (email === mockUser.email && password === mockUser.password) {
    return { token: "fake-jwt-token", user: mockUser };
  } else {
    throw new Error("Invalid credentials");
  }
};
export const sendResetEmail = async (email) => {
  try {
    const response = await fetch('http://localhost:8000/api/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) throw new Error('Failed to send reset email');
    return await response.json();
  } catch (error) {
    console.error('Error in sendResetEmail:', error);
    throw error;
  }
};

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