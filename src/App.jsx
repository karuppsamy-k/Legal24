import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { AuthProvider, useAuth } from './core/context/AuthContext'
import { AdminRoute, AdvocateRoute, ClientRoute, PublicRoute } from './core/routes/ProtectedRoutes'

// Pages
import LandingPage from './features/landing/LandingPage'
import LoginPage from './features/auth/LoginPage'
import SignupPage from './features/auth/SignupPage'
import ForgotPasswordPage from './features/auth/ForgotPasswordPage'
import DashboardPage from './features/dashboard/DashboardPage'
import ApprovalPage from './features/approval/ApprovalPage'
import UsersPage from './features/users/UsersPage'
import AdvocatesPage from './features/advocates/AdvocatesPage'
import ReportsPage from './features/reports/ReportsPage'
import FeedbacksPage from './features/feedbacks/FeedbacksPage'
import './features/auth/auth.css'

// Simple Placeholders for other roles (since they weren't in the provided codebase)
const AdvocateDashboard = () => {
  const { user, logout } = useAuth();
  return (
    <div className="auth-container">
      <div className="auth-bg-blob" />
      <div className="auth-bg-blob-2" />
      <div className="auth-card" style={{ textAlign: 'center' }}>
        <h1 style={{ color: '#fff', marginBottom: '16px' }}>Advocate Dashboard</h1>
        <p style={{ color: '#94a3b8', marginBottom: '24px' }}>Welcome, <strong>{user?.name}</strong>. This is your professional workspace.</p>
        <button onClick={logout} className="auth-btn">Logout</button>
      </div>
    </div>
  );
};

const ClientDashboard = () => {
  const { user, logout } = useAuth();
  return (
    <div className="auth-container">
      <div className="auth-bg-blob" />
      <div className="auth-bg-blob-2" />
      <div className="auth-card" style={{ textAlign: 'center' }}>
        <h1 style={{ color: '#fff', marginBottom: '16px' }}>Client Dashboard</h1>
        <p style={{ color: '#94a3b8', marginBottom: '24px' }}>Welcome, <strong>{user?.name}</strong>. Manage your cases and consultations here.</p>
        <button onClick={logout} className="auth-btn">Logout</button>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Route>

          {/* Admin Protected Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin-dashboard" element={<DashboardPage />} />
            <Route path="/approval" element={<ApprovalPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/advocates" element={<AdvocatesPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/feedbacks" element={<FeedbacksPage />} />
          </Route>

          {/* Advocate Protected Routes */}
          <Route element={<AdvocateRoute />}>
            <Route path="/advocate-dashboard" element={<AdvocateDashboard />} />
          </Route>

          {/* Client Protected Routes */}
          <Route element={<ClientRoute />}>
            <Route path="/client-dashboard" element={<ClientDashboard />} />
          </Route>

          {/* Redirects */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
