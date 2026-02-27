import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// استدعاء كل الصفحات
import Login from "./features/auth/Login";
import ForgotPassword from "./features/auth/ForgotPassword";
import CreateUser from "./pages/Admin/CreateUser";
//import Profile from "./pages/Admin/Profile";
import Announcements from "./pages/Admin/Announcements";
import Dashboard from "./pages/Admin/Dashboard";
import UsersManagement from "./pages/Admin/ManageUsers";
import RolesManagement from "./pages/Admin/RolesManagement";
import Backup from "./pages/Admin/Backup";
//import Reports from "./pages/Admin/Reports";

function App() {
  return (
    <Router>
      <div>
        {/* قائمة التنقل البسيطة */}
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/login">Login</Link> |{" "}
          <Link to="/forgot-password">Forgot Password</Link> |{" "}
          <Link to="/dashboard">Admin Dashboard</Link> |{" "}
          <Link to="/create-user">Create User</Link> |{" "}
          <Link to="/users">Users Management</Link> |{" "}
          <Link to="/roles">Roles Management</Link> |{" "}
          <Link to="/backup">Backup</Link> |{" "}
          <Link to="/reports">Reports</Link> |{" "}
          <Link to="/announcements">Announcements</Link> |{" "}
        
        </nav>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/users" element={<UsersManagement />} />
          <Route path="/roles" element={<RolesManagement />} />
          <Route path="/backup" element={<Backup />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/announcements" element={<Announcements />} />
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;