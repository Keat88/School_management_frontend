import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/layout/DashBoardLayout";
import { AuthProvider } from "./context/AuthContext";
import AdminDashboard from "./page/admin/dashobard/AdminDashBoard"; // Fixed folder path typos
import StudentList from "./page/admin/student/Studentlist";
import TeacherList from "./page/admin/teacher/Teacherlist";
import ClassroomList from "./page/admin/classroom/Classroomlist";
import AttendancePage from "./page/admin/attendance/Attendancepage";
import PaymentPage from "./components/admin/PaymentPage";
import ClassroomDetail from "./components/admin/Classroomdetail";
import NoticePage from "./page/admin/notices/Noticepage";
import ReportPage from "./page/admin/reports/Reportpage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Redirect root URL "/" to the admin dashboard */}
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

        {/* Parent route using the layout */}
        <Route element={<DashboardLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/teachers" element={<TeacherList />} />
          <Route path="/classes" element={<ClassroomList />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/finance" element={<PaymentPage />} />
          <Route path="/classes/:id" element={<ClassroomDetail />} />
          <Route path="/notices" element={<NoticePage />} />
          <Route path="/reports" element={<ReportPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
