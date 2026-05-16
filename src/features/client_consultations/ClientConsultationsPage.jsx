import { useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { useAuth } from '../../core/context/AuthContext'
import { 
  Calendar, 
  Search, 
  Clock, 
  User, 
  ChevronRight, 
  ArrowLeft,
  Plus,
  Video,
  Phone,
  LayoutDashboard,
  Activity,
  FileText,
  CreditCard,
  LogOut,
  Bell,
  Star,
  MessageSquare
} from 'lucide-react'
import TopBar from '../../shared/components/organisms/TopBar'
import './client_consultations.css'
import '../client_dashboard/client_dashboard.css'
import '../advocate_dashboard/advocate_dashboard.css'

const EXPERTS = [
  { id: 1, name: "Adv. Rajesh Kumar", specialty: "Property & Real Estate", experience: "12+ Years", rating: 4.9, price: "₹1,500/hr" },
  { id: 2, name: "Adv. Sunita Rao", specialty: "Corporate Law", experience: "15+ Years", rating: 4.8, price: "₹2,000/hr" },
  { id: 3, name: "Adv. Michael D.", specialty: "Family & Divorce", experience: "8 Years", rating: 4.7, price: "₹1,200/hr" }
]

const navItems = [
  { label: 'Dashboard', id: 'client-dashboard', icon: <LayoutDashboard size={18} /> },
  { label: 'My Cases', id: 'client-cases', icon: <Activity size={18} /> },
  { label: 'Consultations', id: 'client-consultations', icon: <Calendar size={18} />, active: true },
  { label: 'Documents', id: 'client-documents', icon: <FileText size={18} /> },
  { label: 'Payments', id: 'client-payments', icon: <CreditCard size={18} /> }
]

export default function ClientConsultationsPage() {
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
        title="Consultations"
        subtitle="Scheduling"
        isSidebarOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen(true)}
      />

        <div className="booking-grid">
          <section className="experts-panel fade-up">
            <div className="panel-header" style={{ marginBottom: '24px' }}>
              <div>
                <h2>Find a Legal Expert</h2>
                <p>Book a video or voice call with our top-rated advocates.</p>
              </div>
            </div>

            <div className="search-bar" style={{ marginBottom: '24px', maxWidth: '100%' }}>
              <Search size={18} />
              <input type="text" placeholder="Search by specialty or name..." />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {EXPERTS.map((expert, idx) => (
                <div key={expert.id} className="expert-card fade-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="expert-header">
                    <div className="expert-avatar">{expert.name[5]}</div>
                    <div className="expert-info">
                      <h3>{expert.name}</h3>
                      <p>{expert.specialty}</p>
                    </div>
                    <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ffd68a' }}>
                        <Star size={14} fill="#ffd68a" /> {expert.rating}
                      </div>
                      <span style={{ fontSize: '14px', color: '#fff', fontWeight: 700 }}>{expert.price}</span>
                    </div>
                  </div>
                  
                  <div className="expert-stats">
                    <div className="expert-stat-item">
                      <span>Experience</span>
                      <span>{expert.experience}</span>
                    </div>
                    <div className="expert-stat-item">
                      <span>Availability</span>
                      <span style={{ color: '#4ce1b1' }}>Available Today</span>
                    </div>
                  </div>

                  <div className="slot-grid">
                    <button className="slot-btn">10:00 AM</button>
                    <button className="slot-btn">11:30 AM</button>
                    <button className="slot-btn">02:00 PM</button>
                  </div>

                  <button className="summary-action" style={{ width: '100%' }}>Book Appointment</button>
                </div>
              ))}
            </div>
          </section>

          <aside className="fade-up delay-1">
            <div className="advocate-panel">
              <h3 style={{ marginBottom: '20px' }}>Upcoming Appointments</h3>
              <div className="history-item" style={{ borderLeft: '4px solid #6c9cff' }}>
                <div className="history-details">
                  <h4>Tomorrow, 11:30 AM</h4>
                  <p>Property Case Review with Adv. Rajesh</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="icon-only"><Video size={16} /></button>
                  <button className="icon-only"><MessageSquare size={16} /></button>
                </div>
              </div>
            </div>

            <div className="advocate-panel" style={{ marginTop: '24px' }}>
              <h3>Past Consultations</h3>
              <div className="consultation-history" style={{ marginTop: '16px' }}>
                <div className="history-item">
                  <div className="history-details">
                    <h4>12 May 2026</h4>
                    <p>Initial Consultation • Adv. Rajesh</p>
                  </div>
                  <span style={{ color: '#4ce1b1', fontSize: '12px' }}>Completed</span>
                </div>
                <div className="history-item">
                  <div className="history-details">
                    <h4>05 May 2026</h4>
                    <p>Document Review • Adv. Sunita</p>
                  </div>
                  <span style={{ color: '#4ce1b1', fontSize: '12px' }}>Completed</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
    </>
  )
}
