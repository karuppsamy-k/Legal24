import { useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../core/context/AuthContext'
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
import TopBar from '../../../shared/components/organisms/TopBar'
import './client_consultations.css'
import '../dashboard/client_dashboard.css'
import '../../advocate/dashboard/advocate_dashboard.css'

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

  const [expertsList] = useState(() => {
    const dynamicAdvocates = JSON.parse(localStorage.getItem('legal24_advocates') || '[]');
    const approvedDynamic = dynamicAdvocates
      .filter(a => a.status === 'approved')
      .map(a => ({
        id: a.id,
        name: `Adv. ${a.name}`,
        specialty: a.specialization,
        experience: a.experience,
        rating: 5.0,
        price: "₹1,500/hr"
      }));
    return [...approvedDynamic, ...EXPERTS];
  });

  const [selectedExpert, setSelectedExpert] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleNavClick = (id) => {
    setSidebarOpen(false)
    navigate(`/${id}`)
  }

  const handleBookAppointment = () => {
    if (!selectedSlot) {
      alert('Please select a time slot first.')
      return
    }
    alert(`Appointment successfully booked with ${selectedExpert.name} at ${selectedSlot} tomorrow!`)
    setSelectedExpert(null)
    setSelectedSlot(null)
  }

  return (
    <>
      <TopBar 
        title="Consultations"
        subtitle="Scheduling"
        isSidebarOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen(true)}
      />

      <div className="panel-header fade-up" style={{ marginBottom: '24px' }}>
        <div>
          <h2>Find a Legal Expert</h2>
          <p>Book a video or voice call with our top-rated advocates.</p>
        </div>
      </div>

      <div className="booking-grid">
        <section className="experts-panel fade-up">
          <div className="search-bar" style={{ marginBottom: '24px', maxWidth: '100%' }}>
              <Search size={18} />
              <input type="text" placeholder="Search by specialty or name..." />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {expertsList.map((expert, idx) => {
                const isSelected = selectedExpert?.id === expert.id;
                return (
                  <div 
                    key={expert.id} 
                    className={`expert-card fade-up ${isSelected ? 'active' : ''}`} 
                    style={{ 
                      animationDelay: `${idx * 0.1}s`, 
                      cursor: 'pointer',
                      border: isSelected ? '1px solid var(--accent-blue)' : '1px solid var(--border-color)',
                      background: isSelected ? 'rgba(108, 156, 255, 0.08)' : 'var(--bg-panel)'
                    }}
                    onClick={() => {
                      setSelectedExpert(expert);
                      setSelectedSlot(null);
                    }}
                  >
                    <div className="expert-header">
                      <div className="expert-avatar">{expert.name[5] || expert.name[0]}</div>
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
                    
                    <div className="expert-stats" style={{ borderBottom: 'none', paddingBottom: '0' }}>
                      <div className="expert-stat-item">
                        <span>Experience</span>
                        <span>{expert.experience}</span>
                      </div>
                      <div className="expert-stat-item">
                        <span>Availability</span>
                        <span style={{ color: '#4ce1b1' }}>Available Today</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <aside className="fade-up delay-1">
            {selectedExpert ? (
              <div className="advocate-panel fade-up" style={{ marginBottom: '24px', border: '1px solid var(--accent-blue)', background: 'rgba(108, 156, 255, 0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                  <div>
                    <span style={{ fontSize: '10px', color: 'var(--accent-blue)', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '0.05em' }}>Selected Advocate</span>
                    <h3 style={{ margin: '4px 0 0', fontSize: '18px', color: '#fff' }}>{selectedExpert.name}</h3>
                    <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#94a3b8' }}>{selectedExpert.specialty}</p>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedExpert(null); setSelectedSlot(null); }} 
                    style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}
                  >
                    Clear
                  </button>
                </div>

                <div className="expert-stats" style={{ paddingTop: '0', borderTop: 'none', borderBottom: 'none', marginBottom: '20px' }}>
                  <div className="expert-stat-item">
                    <span>Consultation Fee</span>
                    <span style={{ color: '#4ce1b1', fontSize: '15px' }}>{selectedExpert.price}</span>
                  </div>
                  <div className="expert-stat-item">
                    <span>Experience</span>
                    <span>{selectedExpert.experience}</span>
                  </div>
                </div>

                <h4 style={{ color: '#fff', fontSize: '13px', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Choose Time Slot</h4>
                <div className="slot-grid" style={{ marginBottom: '20px' }}>
                  {['10:00 AM', '11:30 AM', '02:00 PM'].map(slot => (
                    <button 
                      key={slot} 
                      className={`slot-btn ${selectedSlot === slot ? 'active' : ''}`}
                      onClick={() => setSelectedSlot(slot)}
                      style={selectedSlot === slot ? { background: 'rgba(108, 156, 255, 0.2)', borderColor: 'var(--accent-blue)', color: '#fff' } : {}}
                    >
                      {slot}
                    </button>
                  ))}
                </div>

                <button 
                  className="summary-action" 
                  style={{ width: '100%', padding: '12px', borderRadius: '10px' }}
                  onClick={handleBookAppointment}
                >
                  Book Appointment
                </button>
              </div>
            ) : (
              <div className="advocate-panel fade-up" style={{ marginBottom: '24px', textAlign: 'center', padding: '36px 20px', border: '1px dashed rgba(255, 255, 255, 0.1)', background: 'transparent' }}>
                <Calendar size={32} color="#94a3b8" style={{ margin: '0 auto 12px', opacity: 0.6 }} />
                <h4 style={{ color: '#94a3b8', margin: 0, fontWeight: '500', fontSize: '14px', lineHeight: '1.5' }}>
                  Select an advocate from the list to view available time slots and book a consultation.
                </h4>
              </div>
            )}

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
