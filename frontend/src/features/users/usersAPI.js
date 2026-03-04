import axios from "axios";

const API_URL = "http://localhost:8000/api";

// إنشاء مستخدم جديد
export const createUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
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
    const response = await fetch(`${API_URL}/users/${userId}`, {
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
    const response = await fetch(`${API_URL}/users`, {
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

// جلب بيانات الملف الشخصي للمستخدم الحالي
export const getProfile = async () => {
  try {
    const response = await fetch(`${API_URL}/user/profile`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to fetch profile');
    return await response.json();
  } catch (error) {
    console.error('Error in getProfile:', error);
    throw error;
  }
};

// تحديث بيانات الملف الشخصي
export const updateProfile = async (data, isMultipart = false) => {
  try {
    const options = {
      method: 'PUT',
      headers: isMultipart ? {} : { 'Content-Type': 'application/json' },
      body: isMultipart ? data : JSON.stringify(data),
    };

    const response = await fetch(`${API_URL}/user/profile`, options);

    if (!response.ok) throw new Error('Failed to update profile');
    return await response.json();
  } catch (error) {
    console.error('Error in updateProfile:', error);
    throw error;
  }
};