import { useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../core/context/AuthContext'
import TopBar from '../../../shared/components/organisms/TopBar'
import { 
  LogOut, 
  Briefcase, 
  Calendar, 
  MessageSquare, 
  FileText, 
  Clock, 
  ChevronRight,
  Plus,
  Bell,
  Settings,
  User,
  ShieldAlert
} from 'lucide-react'
import StatCard from '../../../shared/components/organisms/StatCard.jsx'
import './advocate_dashboard.css'

const MOCK_STATS = [
  { title: "Active Cases", value: "12", detail: "4 due this week", badge: "+2 New" },
  { title: "Upcoming Hearings", value: "5", detail: "Next: Tomorrow 10 AM", badge: "Urgent" },
  { title: "Client Messages", value: "8", detail: "3 unread", badge: "Active" },
  { title: "Total Billings", value: "₹45,200", detail: "Last 30 days", badge: "+12%" }
]

const UPCOMING_HEARINGS = [
  { id: 1, time: "10:00 AM", case: "State vs. Sharma", court: "District Court, Room 4", date: "Tomorrow" },
  { id: 2, time: "02:30 PM", case: "Mehta vs. ICICI Bank", court: "High Court, Bench B", date: "Tomorrow" },
  { id: 3, time: "11:15 AM", case: "Desai Family Trust", court: "Family Court", date: "May 20" }
]

const RECENT_CASES = [
  { id: 'C-204', name: "Property Dispute - Sector 5", status: "In Progress", client: "Amit Kumar", date: "16 May 2026" },
  { id: 'C-215', name: "Trademark Infringement", status: "Hearing Scheduled", client: "Tech Corp", date: "15 May 2026" },
  { id: 'C-198', name: "Employment Contract Review", status: "Completed", client: "Sarah J.", date: "12 May 2026" }
]

export default function AdvocateDashboardPage() {
  const { sidebarOpen, setSidebarOpen } = useOutletContext()
  const { user } = useAuth()
  const navigate = useNavigate()

  // Dynamic user status from localStorage to sync immediately when approved by admin
  const registeredUsers = JSON.parse(localStorage.getItem('legal24_users') || '[]');
  const dbUser = registeredUsers.find(u => u.email === user?.email);
  const status = dbUser ? dbUser.status : (user?.status || 'approved');
  const isPending = status === 'pending';

  const stats = isPending ? [
    { title: "Active Cases", value: "0", detail: "Verification pending", badge: "Inactive" },
    { title: "Upcoming Hearings", value: "0", detail: "Verification pending", badge: "Inactive" },
    { title: "Client Messages", value: "0", detail: "Verification pending", badge: "Inactive" },
    { title: "Total Billings", value: "₹0", detail: "Verification pending", badge: "0%" }
  ] : MOCK_STATS;

  const cases = isPending ? [] : RECENT_CASES;
  const hearings = isPending ? [] : UPCOMING_HEARINGS;

  return (
    <>
      <TopBar 
        title={`Welcome, Adv. ${user?.name?.split(' ')[0]}`}
        subtitle="Overview"
        isSidebarOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen(true)}
      />

      {isPending && (
        <div className="pending-verification-banner fade-up" style={{ animationDelay: '0.05s' }}>
          <ShieldAlert size={28} className="banner-icon" />
          <div className="banner-content">
            <h3>Account Verification Pending</h3>
            <p>
              Your professional credentials are currently being reviewed by the Legal24 administration. 
              Until approved, you will not receive consultation requests, and your profile remains hidden from the client index.
            </p>
          </div>
        </div>
      )}

      <section className="advocate-stats-row fade-up">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </section>

      <div className="advocate-grid">
        <div className="advocate-panel fade-up delay-1">
          <div className="panel-header">
            <h2>Active Cases</h2>
          </div>
          
          <div className="cases-list">
            {cases.length > 0 ? (
              cases.map((item) => (
                <div key={item.id} className="case-item fade-up">
                  <div className="case-info">
                    <h4>{item.name}</h4>
                    <span>{item.client} • {item.date}</span>
                  </div>
                  <div className="case-actions">
                    <span className="status-pill">{item.status}</span>
                    <button className="icon-only"><ChevronRight size={16} /></button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-dashboard-placeholder">
                <Briefcase size={40} className="placeholder-icon" />
                <p>No cases assigned. Your dashboard is empty because you are a new applicant under review.</p>
              </div>
            )}
          </div>
          
          {!isPending && (
            <button className="add-case-btn" onClick={() => navigate('/advocate-cases')}>
              <Plus size={18} /> Add New Case
            </button>
          )}
        </div>

        <aside className="advocate-panel fade-up delay-2">
          <div className="panel-header">
            <h2>Hearings</h2>
          </div>
          <div className="hearings-list">
            {hearings.length > 0 ? (
              hearings.map((hearing) => (
                <div key={hearing.id} className="hearing-card">
                  <div className="hearing-time">{hearing.time}</div>
                  <div className="hearing-details">
                    <strong>{hearing.case}</strong>
                    <span>{hearing.court} • {hearing.date}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-dashboard-placeholder">
                <Calendar size={40} className="placeholder-icon" />
                <p>No upcoming court hearings scheduled.</p>
              </div>
            )}
          </div>
          {!isPending && (
            <button className="view-calendar-btn" onClick={() => navigate('/advocate-hearings')}>
              Full Calendar
            </button>
          )}
        </aside>
      </div>
    </>
  )
}
