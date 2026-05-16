import { useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { useAuth } from '../../core/context/AuthContext'
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Clock, 
  Plus,
  Bell,
  Search,
  Briefcase,
  FileText,
  MessageSquare,
  LogOut
} from 'lucide-react'
import TopBar from '../../shared/components/organisms/TopBar'
import './advocate_hearings.css'
import '../advocate_dashboard/advocate_dashboard.css'

const MOCK_HEARINGS = [
  { id: 1, time: "09:30 AM", type: "Preliminary", title: "State vs. Sharma", court: "District Court, Room 4", duration: "45 mins" },
  { id: 2, time: "11:00 AM", type: "Evidence", title: "Mehta vs. ICICI Bank", court: "High Court, Bench B", duration: "2 hours" },
  { id: 3, time: "02:30 PM", type: "Final Argument", title: "Desai Family Trust", court: "Family Court", duration: "1 hour" }
]

const navItems = [
  { label: 'Dashboard', id: 'advocate-dashboard', icon: <Clock size={18} /> },
  { label: 'My Cases', id: 'advocate-cases', icon: <Briefcase size={18} /> },
  { label: 'Hearings', id: 'advocate-hearings', icon: <CalendarIcon size={18} />, active: true },
  { label: 'Documents', id: 'advocate-documents', icon: <FileText size={18} /> },
  { label: 'Communication', id: 'advocate-messages', icon: <MessageSquare size={18} /> }
]

export default function AdvocateHearingsPage() {
  const { sidebarOpen, setSidebarOpen } = useOutletContext()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleNavClick = (id) => {
    setSidebarOpen(false)
    navigate(`/${id}`)
  }

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout()
    }
  }

  return (
    <>
      <TopBar 
        title="Hearings & Appointments"
        subtitle="Schedule"
        isSidebarOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen(true)}
      />

        <div className="hearings-grid">
          <section className="hearings-timeline-panel fade-up">
            <div className="panel-header">
              <h2>Today's Schedule</h2>
              <span className="date-display">Thursday, 17 May 2026</span>
            </div>
            
            <div className="hearings-timeline">
              {MOCK_HEARINGS.map((hearing, idx) => (
                <div key={hearing.id} className="timeline-item fade-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="timeline-time">{hearing.time}</div>
                  <div className="timeline-content">
                    <span className="hearing-type-pill">{hearing.type}</span>
                    <h3>{hearing.title}</h3>
                    <div className="case-client" style={{ marginTop: '8px' }}>
                      <MapPin size={14} /> {hearing.court}
                    </div>
                    <div className="case-client" style={{ marginTop: '4px' }}>
                      <Clock size={14} /> {hearing.duration}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="calendar-panel fade-up delay-1">
            <div className="calendar-mini">
              <div className="calendar-header">
                <h3>May 2026</h3>
                <div className="calendar-nav">
                  <button className="icon-only"><ChevronLeft size={16} /></button>
                  <button className="icon-only"><ChevronRight size={16} /></button>
                </div>
              </div>
              
              <div className="calendar-days">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="day-name">{d}</div>)}
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                  <div 
                    key={day} 
                    className={`day-cell ${day === 17 ? 'active' : ''} ${[5, 12, 17, 24].includes(day) ? 'has-event' : ''}`}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>

            <div className="advocate-panel" style={{ marginTop: '24px' }}>
              <h3>Reminders</h3>
              <div className="table-grid" style={{ marginTop: '16px' }}>
                <div className="table-row">
                  <span>Draft counter affidavit for Case C-204</span>
                </div>
                <div className="table-row">
                  <span>Call Client Amit regarding hearing</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
    </>
  )
}
