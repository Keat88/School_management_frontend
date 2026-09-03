import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/layout/DashBoardLayout";
import { AuthProvider } from "./context/AuthContext";

import AdminDashboard from "./page/admin/dashobard/AdminDashBoard";
import StudentList from "./page/admin/student/Studentlist";
import TeacherList from "./page/admin/teacher/Teacherlist";
import ClassroomList from "./page/admin/classroom/Classroomlist";
import AttendancePage from "./page/admin/attendance/Attendancepage";
import PaymentPage from "./components/admin/PaymentPage";
import ClassroomDetail from "./components/admin/Classroomdetail";
import NoticePage from "./page/admin/notices/Noticepage";
import ReportPage from "./page/admin/reports/Reportpage";
import StudentForm from "./components/common/StudentForm";

import ProtectRoute from "./routes/ProtectRoute";
import LoginForm from "./page/auth/LoginForm";
import GuestRoute from "./routes/GuestRoute";
import StudentView from "./components/common/StudentView";
import TeacherForm from "./components/common/TeacherForm";
import ClassForm from "./components/common/ClassForm";
import ManageCategories from "./page/admin/book/ManageCategories";
import BookCategoryForm from "./page/admin/book/BookCategoryForm";
import BookCategoryView from "./page/admin/book/BookCategoryView";
import ManageBooks from "./page/admin/book/ManageBooks";
import BookForm from "./page/admin/book/BookForm";
import SchedulePage from "./page/admin/schedules/SchedulePage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Guest Routes (Only accessible when NOT logged in) */}
        <Route element={<GuestRoute />}>
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Route>

        {/* Protected Routes (Only accessible when logged in) */}
        <Route element={<ProtectRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />

            {/* Student Routes */}
            <Route path="/students" element={<StudentList />} />
            <Route path="/students/add" element={<StudentForm />} />
            <Route path="/students/add/:id" element={<StudentForm />} />
            <Route path="/students/view/:id" element={<StudentView />} />

            {/* Teacher & Class Routes */}
            <Route path="/teachers" element={<TeacherList />} />
            <Route path="/teacher/add" element={<TeacherForm />} />
            <Route path="/teacher/add/:id" element={<TeacherForm />} />
            <Route path="/classes" element={<ClassroomList />} />
            <Route path="/classes/add" element={<ClassForm />} />
            <Route path="/classes/:id" element={<ClassroomDetail />} />

            {/* Other Admin Sections */}
           <Route path="/schedule" element={<SchedulePage/>}/>
            <Route path="/attendance" element={<AttendancePage />} />

            {/* for library it still not work cause not connect with api */} 
            <Route path="/library" element={<ManageCategories/>}/>
            <Route path='/library/category/add' element={<BookCategoryForm/>} />
            <Route path='/library/category/:id' element={<BookCategoryForm/>} />
            <Route path='/library/category/view/:id' element={<BookCategoryView/>} />
            <Route path="/library/book" element={<ManageBooks/>}/>
            <Route path="/library/book/add" element={<BookForm/>}/>
            <Route path="/library/book/add/:id" element={<BookForm/>}/>
            <Route path="/finance" element={<PaymentPage />} />
            <Route path="/notices" element={<NoticePage />} />
            <Route path="/reports" element={<ReportPage />} />
          </Route>
        </Route>

        {/* Fallback Redirect for unmatched paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
