// reportsAPI.js

export const getReports = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/reports');

    if (!response.ok) {
      throw new Error('Failed to fetch reports');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in getReports:', error);
    throw error;
  }
};