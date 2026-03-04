import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export const getBackups = () => axios.get(`${API_URL}/backups`);
export const createBackup = () => axios.post(`${API_URL}/backups`);