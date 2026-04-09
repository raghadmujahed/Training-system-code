import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../app/layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

import Login from "../pages/auth/Login";

// Admin
import Dashboard from "../pages/dashboard/Dashboard";
import Users from "../pages/admin/Users";
import Reports from "../pages/admin/Reports";

// Student
import TrainingRequest from "../pages/student/TrainingRequest";
import StudentDashboard from "../pages/dashboard/StudentDashboard";
import Schedule from "../pages/student/Schedule";
import Portfolio from "../pages/student/Portfolio";
import TrainingLog from "../pages/student/TrainingLog";
import Assignments from "../pages/student/Assignments";
import NotificationsUpdates from "../pages/student/NotificationsUpdates";

// Common
import Profile from "../pages/common/Profile";
import ChangePassword from "../pages/common/ChangePassword";
import Notifications from "../pages/common/Notifications";

// Supervisor
import SupervisorDashboard from "../pages/dashboard/SupervisorDashboard";
import Tasks from "../pages/supervisor/Tasks";
import FieldVisits from "../pages/supervisor/FieldVisits";
import Sections from "../pages/supervisor/Sections";
import Evaluations from "../pages/supervisor/Evaluations";
import SupervisorReports from "../pages/supervisor/Reports";
import Submissions from "../pages/supervisor/Submissions";
import TrainingLogs from "../pages/supervisor/TrainingLogs";

// Mentor
import MentorDashboard from "../pages/dashboard/MentorDashboard";
import Attendance from "../pages/mentor/Attendance";

// Coordinator
import CoordinatorDashboard from "../pages/dashboard/CoordinatorDashboard";

// Principal
import PrincipalDashboard from "../pages/dashboard/PrincipalDashboard";
import PrincipalProfile from "../pages/principal/Profile";
import MentorAssignment from "../pages/principal/MentorAssignment";
import TraineeStudents from "../pages/principal/TraineeStudents";
import PrincipalOfficialLetters from "../pages/principal/OfficialLetters";

// Health Directorate
import HealthDirectorateDashboard from "../pages/dashboard/HealthDirectorateDashboard";

// Education Directorate
import EducationDirectorateDashboard from "../pages/dashboard/EducationDirectorateDashboard";
import TrainingSites from "../pages/educationDirectorate/TrainingSites";
import EducationOfficialLetters from "../pages/educationDirectorate/OfficialLetters";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* Admin */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/reports" element={<Reports />} />

          {/* Student */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/schedule" element={<Schedule />} />
          <Route path="/student/portfolio" element={<Portfolio />} />
          <Route path="/student/training-log" element={<TrainingLog />} />
          <Route path="/student/assignments" element={<Assignments />} />
          <Route path="/student/training-request" element={<TrainingRequest />} />
          <Route
            path="/student/notifications-updates"
            element={<NotificationsUpdates />}
          />

          {/* Supervisor */}
          <Route path="/supervisor/dashboard" element={<SupervisorDashboard />} />
          <Route path="/supervisor/tasks" element={<Tasks />} />
          <Route path="/supervisor/field-visits" element={<FieldVisits />} />
          <Route path="/supervisor/sections" element={<Sections />} />
          <Route path="/supervisor/evaluations" element={<Evaluations />} />
          <Route path="/supervisor/reports" element={<SupervisorReports />} />
          <Route path="/supervisor/submissions" element={<Submissions />} />
          <Route path="/supervisor/training-logs" element={<TrainingLogs />} />

          {/* Mentor */}
          <Route path="/mentor/dashboard" element={<MentorDashboard />} />
          <Route path="/mentor/attendance" element={<Attendance />} />

          {/* Coordinator */}
          <Route
            path="/coordinator/dashboard"
            element={<CoordinatorDashboard />}
          />

          {/* Principal */}
          <Route path="/principal/dashboard" element={<PrincipalDashboard />} />
          <Route path="/principal/profile" element={<PrincipalProfile />} />
          <Route
            path="/principal/mentor-assignment"
            element={<MentorAssignment />}
          />
          <Route
            path="/principal/trainee-students"
            element={<TraineeStudents />}
          />
          <Route
            path="/principal/official-letters"
            element={<PrincipalOfficialLetters />}
          />

          {/* Health Directorate */}
          <Route
            path="/health/dashboard"
            element={<HealthDirectorateDashboard />}
          />

          {/* Education Directorate */}
          <Route
            path="/education/dashboard"
            element={<EducationDirectorateDashboard />}
          />
          <Route
            path="/education/training-sites"
            element={<TrainingSites />}
          />
          <Route
            path="/education/official-letters"
            element={<EducationOfficialLetters />}
          />

          {/* Common */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}