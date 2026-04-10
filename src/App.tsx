import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import { DashboardLayout } from "@/components/DashboardLayout";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";

// Student pages
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProfile from "./pages/student/StudentProfile";
import StudentRoom from "./pages/student/StudentRoom";
import StudentFees from "./pages/student/StudentFees";
import StudentAttendance from "./pages/student/StudentAttendance";
import StudentLeave from "./pages/student/StudentLeave";
import StudentMess from "./pages/student/StudentMess";
import StudentNotices from "./pages/student/StudentNotices";
import StudentDocuments from "./pages/student/StudentDocuments";
import StudentComplaints from "./pages/student/StudentComplaints";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminRooms from "./pages/admin/AdminRooms";
import AdminLeave from "./pages/admin/AdminLeave";
import AdminMess from "./pages/admin/AdminMess";
import AdminNotices from "./pages/admin/AdminNotices";
import AdminFees from "./pages/admin/AdminFees";
import AdminComplaints from "./pages/admin/AdminComplaints";
import AdminAnalytics from "./pages/admin/AdminAnalytics";

const queryClient = new QueryClient();

function ProtectedRoute({ children, role }: { children: React.ReactNode; role?: "student" | "admin" }) {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role && user?.role !== role) return <Navigate to={user?.role === "admin" ? "/admin" : "/student"} replace />;
  return <DashboardLayout>{children}</DashboardLayout>;
}

function RootRedirect() {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Navigate to={user?.role === "admin" ? "/admin" : "/student"} replace />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootRedirect />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Student Routes */}
            <Route path="/student" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
            <Route path="/student/profile" element={<ProtectedRoute role="student"><StudentProfile /></ProtectedRoute>} />
            <Route path="/student/room" element={<ProtectedRoute role="student"><StudentRoom /></ProtectedRoute>} />
            <Route path="/student/fees" element={<ProtectedRoute role="student"><StudentFees /></ProtectedRoute>} />
            <Route path="/student/attendance" element={<ProtectedRoute role="student"><StudentAttendance /></ProtectedRoute>} />
            <Route path="/student/leave" element={<ProtectedRoute role="student"><StudentLeave /></ProtectedRoute>} />
            <Route path="/student/mess" element={<ProtectedRoute role="student"><StudentMess /></ProtectedRoute>} />
            <Route path="/student/notices" element={<ProtectedRoute role="student"><StudentNotices /></ProtectedRoute>} />
            <Route path="/student/documents" element={<ProtectedRoute role="student"><StudentDocuments /></ProtectedRoute>} />
            <Route path="/student/complaints" element={<ProtectedRoute role="student"><StudentComplaints /></ProtectedRoute>} />

            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/students" element={<ProtectedRoute role="admin"><AdminStudents /></ProtectedRoute>} />
            <Route path="/admin/rooms" element={<ProtectedRoute role="admin"><AdminRooms /></ProtectedRoute>} />
            <Route path="/admin/leave" element={<ProtectedRoute role="admin"><AdminLeave /></ProtectedRoute>} />
            <Route path="/admin/mess" element={<ProtectedRoute role="admin"><AdminMess /></ProtectedRoute>} />
            <Route path="/admin/notices" element={<ProtectedRoute role="admin"><AdminNotices /></ProtectedRoute>} />
            <Route path="/admin/fees" element={<ProtectedRoute role="admin"><AdminFees /></ProtectedRoute>} />
            <Route path="/admin/complaints" element={<ProtectedRoute role="admin"><AdminComplaints /></ProtectedRoute>} />
            <Route path="/admin/analytics" element={<ProtectedRoute role="admin"><AdminAnalytics /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
