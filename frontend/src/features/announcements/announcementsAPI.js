import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export const getAnnouncements = () => axios.get(`${API_URL}/announcements`);
export const createAnnouncement = (data) => axios.post(`${API_URL}/announcements`, data);
export const deleteAnnouncement = (id) => axios.delete(`${API_URL}/announcements/${id}`);