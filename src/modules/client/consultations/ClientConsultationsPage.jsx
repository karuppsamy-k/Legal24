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
  const [activeTab, setActiveTab] = useState('book'); // 'book', 'appointments', 'history'
  const [searchQuery, setSearchQuery] = useState('');
  const [subTab, setSubTab] = useState('approved'); // 'approved', 'pending', 'declined'

  // Synchronized appointment states from local storage databases
  const [pendingBookings, setPendingBookings] = useState(() => {
    const saved = localStorage.getItem('advocate_consult_requests')
    if (saved) return JSON.parse(saved)
    const initial = [
      { id: 101, clientName: "Pooja Sharma", topic: "Lease Deed Verification", type: "Video Call", date: "22 May 2026", time: "10:30 AM", fee: "₹1,500", status: "pending" },
      { id: 102, clientName: "Vikram Malhotra", topic: "Trademark Registration Process", type: "Chat Consultation", date: "23 May 2026", time: "04:00 PM", fee: "₹1,500", status: "pending" }
    ]
    localStorage.setItem('advocate_consult_requests', JSON.stringify(initial))
    return initial
  })

  const [confirmedBookings, setConfirmedBookings] = useState(() => {
    const saved = localStorage.getItem('advocate_consult_upcoming')
    if (saved) return JSON.parse(saved)
    const initial = [
      { id: 201, clientName: "Amit Kumar", topic: "Property Dispute Consultation", type: "Video Call", date: "Tomorrow", time: "11:30 AM", fee: "₹1,500", status: "confirmed" },
      { id: 202, clientName: "Sarah Jenkins", topic: "Contract Terms Advisory", type: "Video Call", date: "24 May 2026", time: "10:00 AM", fee: "₹1,500", status: "confirmed" }
    ]
    localStorage.setItem('advocate_consult_upcoming', JSON.stringify(initial))
    return initial
  })

  const handleNavClick = (id) => {
    setSidebarOpen(false)
    navigate(`/${id}`)
  }

  const filteredExperts = expertsList.filter(expert => {
    const term = searchQuery.toLowerCase()
    return expert.name.toLowerCase().includes(term) || expert.specialty.toLowerCase().includes(term)
  })

  const handleBookAppointment = () => {
    if (!selectedSlot) {
      alert('Please select a time slot first.')
      return
    }

    const newRequest = {
      id: Date.now(),
      clientName: user?.name || "Regular User",
      topic: `${selectedExpert.specialty} Consultation`,
      type: "Video Call",
      date: "Tomorrow",
      time: selectedSlot,
      fee: selectedExpert.price,
      status: "pending"
    }

    const currentRequests = JSON.parse(localStorage.getItem('advocate_consult_requests') || '[]')
    const updatedRequests = [...currentRequests, newRequest]
    localStorage.setItem('advocate_consult_requests', JSON.stringify(updatedRequests))

    alert(`Appointment successfully requested with ${selectedExpert.name} at ${selectedSlot} tomorrow! It is currently awaiting advocate confirmation.`)

    setPendingBookings(updatedRequests)
    setSelectedExpert(null)
    setSelectedSlot(null)
    setActiveTab('appointments') // Switch to appointments tab automatically
  }

  return (
    <>
      <TopBar 
        title="Consultations"
        subtitle="Scheduling"
        isSidebarOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen(true)}
      />

      {/* Tabs / Chips Row */}
      <div className="consult-chips-row fade-up" style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <button 
          onClick={() => setActiveTab('book')}
          style={{
            padding: '10px 20px',
            borderRadius: '24px',
            border: activeTab === 'book' ? '1px solid #6c9cff' : '1px solid rgba(255, 255, 255, 0.05)',
            background: activeTab === 'book' ? 'rgba(108, 156, 255, 0.15)' : 'rgba(255, 255, 255, 0.02)',
            color: activeTab === 'book' ? '#fff' : 'var(--text-muted)',
            fontWeight: 600,
            fontSize: '13.5px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: activeTab === 'book' ? '0 0 12px rgba(108, 156, 255, 0.2)' : 'none'
          }}
        >
          Book Consultation
        </button>

        <button 
          onClick={() => setActiveTab('appointments')}
          style={{
            padding: '10px 20px',
            borderRadius: '24px',
            border: activeTab === 'appointments' ? '1px solid #6c9cff' : '1px solid rgba(255, 255, 255, 0.05)',
            background: activeTab === 'appointments' ? 'rgba(108, 156, 255, 0.15)' : 'rgba(255, 255, 255, 0.02)',
            color: activeTab === 'appointments' ? '#fff' : 'var(--text-muted)',
            fontWeight: 600,
            fontSize: '13.5px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: activeTab === 'appointments' ? '0 0 12px rgba(108, 156, 255, 0.2)' : 'none'
          }}
        >
          My Appointments ({confirmedBookings.length + pendingBookings.length})
        </button>

        <button 
          onClick={() => setActiveTab('history')}
          style={{
            padding: '10px 20px',
            borderRadius: '24px',
            border: activeTab === 'history' ? '1px solid #6c9cff' : '1px solid rgba(255, 255, 255, 0.05)',
            background: activeTab === 'history' ? 'rgba(108, 156, 255, 0.15)' : 'rgba(255, 255, 255, 0.02)',
            color: activeTab === 'history' ? '#fff' : 'var(--text-muted)',
            fontWeight: 600,
            fontSize: '13.5px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: activeTab === 'history' ? '0 0 12px rgba(108, 156, 255, 0.2)' : 'none'
          }}
        >
          Past Consultations
        </button>
      </div>

      {activeTab === 'book' && (
        <div className="fade-up">
          <div className="panel-header" style={{ marginBottom: '20px' }}>
            <div>
              <h2>Find a Legal Expert</h2>
              <p>Book a video or voice call with our top-rated advocates.</p>
            </div>
          </div>

          <div className="booking-grid">
            <section className="experts-panel">
              <div className="search-bar" style={{ marginBottom: '24px', maxWidth: '100%' }}>
                <Search size={18} />
                <input 
                  type="text" 
                  placeholder="Search by specialty or name..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {filteredExperts.length > 0 ? (
                  filteredExperts.map((expert, idx) => {
                    const isSelected = selectedExpert?.id === expert.id;
                    return (
                      <div 
                        key={expert.id} 
                        className={`expert-card ${isSelected ? 'active' : ''}`} 
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
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ffd68a', justifyContent: 'flex-end' }}>
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
                  })
                ) : (
                  <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '16px', border: '1px dashed rgba(255, 255, 255, 0.05)' }}>
                    <p style={{ color: 'var(--text-muted)', margin: 0 }}>No advocates match your search criteria.</p>
                  </div>
                )}
              </div>
            </section>

            <aside>
              {selectedExpert ? (
                <div className="advocate-panel" style={{ border: '1px solid var(--accent-blue)', background: 'rgba(108, 156, 255, 0.05)' }}>
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
                <div className="advocate-panel" style={{ textAlign: 'center', padding: '40px 20px', border: '1px dashed rgba(255, 255, 255, 0.1)', background: 'transparent' }}>
                  <Calendar size={32} color="#94a3b8" style={{ margin: '0 auto 12px', opacity: 0.6 }} />
                  <h4 style={{ color: '#94a3b8', margin: 0, fontWeight: '500', fontSize: '14px', lineHeight: '1.5' }}>
                    Select an advocate from the list to view available time slots and book a consultation.
                  </h4>
                </div>
              )}
            </aside>
          </div>
        </div>
      )}

      {activeTab === 'appointments' && (
        <div className="fade-up">
          <div className="panel-header" style={{ marginBottom: '20px' }}>
            <div>
              <h2>My Scheduled Appointments</h2>
              <p>Track your confirmed, pending, and declined consultations.</p>
            </div>
          </div>

          {/* Underline Sub-tabs (identical layout to cases page tabs) */}
          <div className="cases-tab-row" style={{ display: 'flex', gap: '16px', marginBottom: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '12px' }}>
            <button 
              onClick={() => setSubTab('approved')} 
              style={{ 
                background: 'transparent', 
                border: 'none', 
                color: subTab === 'approved' ? '#6c9cff' : 'var(--text-muted)', 
                fontWeight: 600, 
                fontSize: '15px', 
                padding: '6px 12px', 
                position: 'relative',
                cursor: 'pointer' 
              }}
            >
              Approved ({confirmedBookings.length})
              {subTab === 'approved' && <span style={{ position: 'absolute', bottom: '-13px', left: 0, right: 0, height: '2px', background: '#6c9cff' }} />}
            </button>
            
            <button 
              onClick={() => setSubTab('pending')} 
              style={{ 
                background: 'transparent', 
                border: 'none', 
                color: subTab === 'pending' ? '#6c9cff' : 'var(--text-muted)', 
                fontWeight: 600, 
                fontSize: '15px', 
                padding: '6px 12px', 
                position: 'relative',
                cursor: 'pointer' 
              }}
            >
              Pending Acceptance ({pendingBookings.filter(b => b.status !== 'Rejected' && b.status !== 'Declined').length})
              {subTab === 'pending' && <span style={{ position: 'absolute', bottom: '-13px', left: 0, right: 0, height: '2px', background: '#6c9cff' }} />}
            </button>

            <button 
              onClick={() => setSubTab('declined')} 
              style={{ 
                background: 'transparent', 
                border: 'none', 
                color: subTab === 'declined' ? '#6c9cff' : 'var(--text-muted)', 
                fontWeight: 600, 
                fontSize: '15px', 
                padding: '6px 12px', 
                position: 'relative',
                cursor: 'pointer' 
              }}
            >
              Declined ({pendingBookings.filter(b => b.status === 'Rejected' || b.status === 'Declined').length})
              {subTab === 'declined' && <span style={{ position: 'absolute', bottom: '-13px', left: 0, right: 0, height: '2px', background: '#6c9cff' }} />}
            </button>
          </div>

          <div className="advocate-panel" style={{ background: 'var(--bg-panel)', borderRadius: '16px', border: '1px solid var(--border-color)', padding: '24px' }}>
            {subTab === 'approved' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {confirmedBookings.length > 0 ? (
                  confirmedBookings.map(app => (
                    <div key={app.id} className="history-item" style={{ borderLeft: '4px solid var(--accent-green)', padding: '16px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className="history-details" style={{ width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <h4 style={{ margin: 0, color: '#fff', fontSize: '15px' }}>{app.date}, {app.time}</h4>
                          <span className="status-pill accepted" style={{ background: 'rgba(76, 225, 177, 0.15)', color: 'var(--accent-green)', padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: 'bold' }}>Confirmed</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>{app.topic} • {app.clientName}</p>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginLeft: '16px' }}>
                        <button className="icon-only" style={{ background: 'rgba(108, 156, 255, 0.1)', color: '#6c9cff', border: 'none', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => alert('Starting video call room...')}><Video size={16} /></button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>No approved appointments scheduled.</p>
                )}
              </div>
            )}

            {subTab === 'pending' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {pendingBookings.filter(b => b.status !== 'Rejected' && b.status !== 'Declined').length > 0 ? (
                  pendingBookings.filter(b => b.status !== 'Rejected' && b.status !== 'Declined').map(app => (
                    <div key={app.id} className="history-item" style={{ borderLeft: '4px solid #ffd68a', padding: '16px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '8px' }}>
                      <div className="history-details" style={{ width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <h4 style={{ margin: 0, color: '#fff', fontSize: '15px' }}>{app.date}, {app.time}</h4>
                          <span className="status-pill pending" style={{ background: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24', padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: 'bold' }}>Pending Acceptance</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>{app.topic} • {app.clientName}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>No pending requests.</p>
                )}
              </div>
            )}

            {subTab === 'declined' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {pendingBookings.filter(b => b.status === 'Rejected' || b.status === 'Declined').length > 0 ? (
                  pendingBookings.filter(b => b.status === 'Rejected' || b.status === 'Declined').map(app => (
                    <div key={app.id} className="history-item" style={{ borderLeft: '4px solid #ef4444', padding: '16px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '8px' }}>
                      <div className="history-details" style={{ width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <h4 style={{ margin: 0, color: '#fff', fontSize: '15px' }}>{app.date}, {app.time}</h4>
                          <span className="status-pill rejected" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: 'bold' }}>Declined</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>{app.topic} • {app.clientName}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>No declined appointments.</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="fade-up">
          <div className="panel-header" style={{ marginBottom: '20px' }}>
            <div>
              <h2>Consultation History</h2>
              <p>View history of your completed sessions and consultations.</p>
            </div>
          </div>

          <div className="advocate-panel" style={{ background: 'var(--bg-panel)', borderRadius: '16px', border: '1px solid var(--border-color)', padding: '24px' }}>
            <div className="consultation-history" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="history-item" style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="history-details">
                  <h4 style={{ margin: 0, color: '#fff', fontSize: '15px' }}>12 May 2026</h4>
                  <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>Initial Consultation • Adv. Rajesh Kumar</p>
                </div>
                <span style={{ color: '#4ce1b1', fontSize: '13px', fontWeight: 600 }}>Completed</span>
              </div>
              
              <div className="history-item" style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="history-details">
                  <h4 style={{ margin: 0, color: '#fff', fontSize: '15px' }}>05 May 2026</h4>
                  <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>Document Review • Adv. Sunita Rao</p>
                </div>
                <span style={{ color: '#4ce1b1', fontSize: '13px', fontWeight: 600 }}>Completed</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
