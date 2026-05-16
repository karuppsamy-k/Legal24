import { useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { useAuth } from '../../core/context/AuthContext'
import { 
  LogOut, 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  CreditCard, 
  MapPin,
  Clock,
  Plus,
  Bell,
  Settings,
  ChevronRight,
  TrendingUp,
  Activity,
  MessageSquare
} from 'lucide-react'
import StatCard from '../../shared/components/organisms/StatCard.jsx'
import TopBar from '../../shared/components/organisms/TopBar.jsx'
import './client_dashboard.css'
import '../advocate_dashboard/advocate_dashboard.css'

const navItems = [
  { label: 'Dashboard', id: 'client-dashboard', icon: <LayoutDashboard size={18} />, active: true },
  { label: 'My Cases', id: 'client-cases', icon: <Activity size={18} /> },
  { label: 'Consultations', id: 'client-consultations', icon: <Calendar size={18} /> },
  { label: 'Documents', id: 'client-documents', icon: <FileText size={18} /> },
  { label: 'Payments', id: 'client-payments', icon: <CreditCard size={18} /> }
]

export default function ClientDashboardPage() {
  const { sidebarOpen, setSidebarOpen } = useOutletContext()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleNavClick = (id) => {
    setSidebarOpen(false)
    navigate(`/${id}`)
  }

  return (
    <>
      <TopBar 
        title={`Welcome, ${user?.name?.split(' ')[0]}`}
        subtitle="Overview"
        isSidebarOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen(true)}
      />

        <section className="client-welcome-banner fade-up">
          <div className="banner-content">
            <h1>Ready to secure your rights?</h1>
            <p>You have 2 active cases and 1 upcoming consultation tomorrow at 11:00 AM.</p>
            <div className="quick-actions-row">
              <div className="action-card" onClick={() => navigate('/client-consultations')}>
                <div className="action-icon"><Plus size={20} /></div>
                <div>
                  <strong>Book Consultation</strong>
                  <p style={{ fontSize: '12px', color: '#94a3b8' }}>Speak with an expert</p>
                </div>
              </div>
              <div className="action-card" onClick={() => navigate('/client-payments')}>
                <div className="action-icon"><CreditCard size={20} /></div>
                <div>
                  <strong>Pay Invoice</strong>
                  <p style={{ fontSize: '12px', color: '#94a3b8' }}>Due: ₹1,500</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="advocate-grid">
          <div className="advocate-panel fade-up delay-1">
            <div className="panel-header">
              <h2>Recent Case Activity</h2>
              <button className="summary-action" onClick={() => navigate('/client-cases')}>View Timeline</button>
            </div>
            <div className="timeline-preview">
              <div className="timeline-step">
                <div className="step-marker completed" />
                <div className="step-info">
                  <h4>Initial Consultation Completed</h4>
                  <p>12 May 2026 • Legal Strategy established</p>
                </div>
              </div>
              <div className="timeline-step">
                <div className="step-marker active" />
                <div className="step-info">
                  <h4>Document Verification</h4>
                  <p>In Progress • Pending property deeds upload</p>
                </div>
              </div>
              <div className="timeline-step">
                <div className="step-marker" />
                <div className="step-info">
                  <h4>Court Filing</h4>
                  <p>Scheduled for 25 May 2026</p>
                </div>
              </div>
            </div>
          </div>

          <aside className="advocate-panel fade-up delay-2">
            <h3>My Advocate</h3>
            <div className="chat-item active" style={{ marginTop: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="chat-avatar">RK</div>
              <div className="chat-info">
                <h4>Adv. Rajesh Kumar</h4>
                <p>Senior Associate • 12 years exp.</p>
              </div>
            </div>
            <button className="view-calendar-btn" style={{ background: 'rgba(108,156,255,0.1)', color: '#6c9cff', border: 'none' }}>
              Message Advocate
            </button>
          </aside>
        </div>
    </>
  )
}
