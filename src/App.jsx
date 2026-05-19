import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { AuthProvider, useAuth } from './core/context/AuthContext'
import { ThemeProvider } from './core/context/ThemeContext'
import { NotificationProvider } from './core/context/NotificationContext'
import { AdminRoute, AdvocateRoute, ClientRoute, PublicRoute } from './core/routes/ProtectedRoutes'

// Pages
import LandingPage from './modules/public/landing/LandingPage'
import LoginPage from './modules/public/auth/LoginPage'
import SignupPage from './modules/public/auth/SignupPage'
import ForgotPasswordPage from './modules/public/auth/ForgotPasswordPage'
import DashboardPage from './modules/admin/dashboard/DashboardPage'
import ApprovalPage from './modules/admin/approval/ApprovalPage'
import UsersPage from './modules/admin/users/UsersPage'
import AdvocatesPage from './modules/admin/advocates/AdvocatesPage'
import ReportsPage from './modules/admin/reports/ReportsPage'
import FeedbacksPage from './modules/admin/feedbacks/FeedbacksPage'
import SettingsPage from './modules/admin/settings/SettingsPage'
import ProfilePage from './modules/public/profile/ProfilePage'
import AdvocateDashboardPage from './modules/advocate/dashboard/AdvocateDashboardPage'
import AdvocateCasesPage from './modules/advocate/cases/AdvocateCasesPage'
import AdvocateHearingsPage from './modules/advocate/hearings/AdvocateHearingsPage'
import AdvocateDocumentsPage from './modules/advocate/documents/AdvocateDocumentsPage'
import AdvocateMessagesPage from './modules/advocate/messages/AdvocateMessagesPage'
import ClientDashboardPage from './modules/client/dashboard/ClientDashboardPage'
import ClientConsultationsPage from './modules/client/consultations/ClientConsultationsPage'
import ClientCaseTrackingPage from './modules/client/cases/ClientCaseTrackingPage'
import ClientDocumentsPage from './modules/client/documents/ClientDocumentsPage'
import ClientPaymentsPage from './modules/client/payments/ClientPaymentsPage'
import AdvocateLayout from './modules/advocate/dashboard/AdvocateLayout'
import ClientLayout from './modules/client/dashboard/ClientLayout'
import AdminLayout from './modules/admin/dashboard/AdminLayout'
import './modules/public/auth/auth.css'

// Simple Placeholders for other roles
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
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
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/admin-profile" element={<ProfilePage />} />
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
                  <Route path="/advocate-profile" element={<ProfilePage />} />
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
                  <Route path="/client-profile" element={<ProfilePage />} />
                </Route>
              </Route>

              {/* Redirects */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
