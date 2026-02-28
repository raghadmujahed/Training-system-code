// src/routes/AppRouter.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../features/auth/Login";
import ForgotPassword from "../features/auth/ForgotPassword";
import Dashboard from "../pages/admin/Dashboard";
import CreateUser from "../pages/admin/CreateUser";
import ManageUsers from "../pages/admin/ManageUsers";
import RolesManagement from "../pages/admin/RolesManagement";
import Backup from "../pages/admin/Backup";
import Announcements from "../pages/admin/Announcements";
import Reports from "../pages/DepartmentHead/Reports";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/users" element={<ManageUsers />} />
        <Route path="/roles" element={<RolesManagement />} />
        <Route path="/backup" element={<Backup />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/announcements" element={<Announcements />} />
      </Routes>
    </Router>
  );
}