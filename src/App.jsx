import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { AuthProvider, useAuth } from './core/context/AuthContext'
import { ThemeProvider } from './core/context/ThemeContext'
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
import AdvocateDashboardPage from './features/advocate_dashboard/AdvocateDashboardPage'
import AdvocateCasesPage from './features/advocate_cases/AdvocateCasesPage'
import AdvocateHearingsPage from './features/advocate_hearings/AdvocateHearingsPage'
import AdvocateDocumentsPage from './features/advocate_documents/AdvocateDocumentsPage'
import AdvocateMessagesPage from './features/advocate_messages/AdvocateMessagesPage'
import ClientDashboardPage from './features/client_dashboard/ClientDashboardPage'
import ClientConsultationsPage from './features/client_consultations/ClientConsultationsPage'
import ClientCaseTrackingPage from './features/client_cases/ClientCaseTrackingPage'
import ClientDocumentsPage from './features/client_documents/ClientDocumentsPage'
import ClientPaymentsPage from './features/client_payments/ClientPaymentsPage'
import AdvocateLayout from './features/advocate_dashboard/AdvocateLayout'
import ClientLayout from './features/client_dashboard/ClientLayout'
import AdminLayout from './features/dashboard/AdminLayout'
import './features/auth/auth.css'

// Simple Placeholders for other roles
function App() {
  return (
    <ThemeProvider>
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
              <Route element={<AdminLayout />}>
                <Route path="/admin-dashboard" element={<DashboardPage />} />
                <Route path="/approval" element={<ApprovalPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/advocates" element={<AdvocatesPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/feedbacks" element={<FeedbacksPage />} />
              </Route>
            </Route>

            {/* Advocate Protected Routes */}
            <Route element={<AdvocateRoute />}>
              <Route element={<AdvocateLayout />}>
                <Route path="/advocate-dashboard" element={<AdvocateDashboardPage />} />
                <Route path="/advocate-cases" element={<AdvocateCasesPage />} />
                <Route path="/advocate-hearings" element={<AdvocateHearingsPage />} />
                <Route path="/advocate-documents" element={<AdvocateDocumentsPage />} />
                <Route path="/advocate-messages" element={<AdvocateMessagesPage />} />
              </Route>
            </Route>

            {/* Client Protected Routes */}
            <Route element={<ClientRoute />}>
              <Route element={<ClientLayout />}>
                <Route path="/client-dashboard" element={<ClientDashboardPage />} />
                <Route path="/client-consultations" element={<ClientConsultationsPage />} />
                <Route path="/client-cases" element={<ClientCaseTrackingPage />} />
                <Route path="/client-documents" element={<ClientDocumentsPage />} />
                <Route path="/client-payments" element={<ClientPaymentsPage />} />
              </Route>
            </Route>

            {/* Redirects */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
