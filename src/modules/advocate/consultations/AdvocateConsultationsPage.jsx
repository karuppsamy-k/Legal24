import { useState, useEffect } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../core/context/AuthContext'
import { 
  Users, 
  Calendar, 
  Clock, 
  Video, 
  MessageSquare, 
  Check, 
  X, 
  DollarSign, 
  CheckCircle,
  HelpCircle,
  FileText,
  Sliders
} from 'lucide-react'
import TopBar from '../../../shared/components/organisms/TopBar'
import './advocate_consultations.css'

const INITIAL_REQUESTS = [
  { id: 101, clientName: "Pooja Sharma", topic: "Lease Deed Verification", type: "Video Call", date: "22 May 2026", time: "10:30 AM", fee: "₹1,500", status: "pending" },
  { id: 102, clientName: "Vikram Malhotra", topic: "Trademark Registration Process", type: "Chat Consultation", date: "23 May 2026", time: "04:00 PM", fee: "₹1,500", status: "pending" }
]

const INITIAL_UPCOMING = [
  { id: 201, clientName: "Amit Kumar", topic: "Property Dispute Consultation", type: "Video Call", date: "Tomorrow", time: "11:30 AM", fee: "₹1,500", status: "confirmed" },
  { id: 202, clientName: "Sarah Jenkins", topic: "Contract Terms Advisory", type: "Video Call", date: "24 May 2026", time: "10:00 AM", fee: "₹1,500", status: "confirmed" }
]

const INITIAL_PAST = [
  { id: 301, clientName: "Rajesh Mehta", topic: "Corporate Formation Doubt", type: "Video Call", date: "12 May 2026", time: "02:00 PM", fee: "₹1,500", status: "completed" },
  { id: 302, clientName: "Meera Nair", topic: "Power of Attorney Query", type: "Chat Consultation", date: "08 May 2026", time: "11:00 AM", fee: "₹1,500", status: "completed" }
]

export default function AdvocateConsultationsPage() {
  const { sidebarOpen, setSidebarOpen } = useOutletContext()
  const { user } = useAuth()
  const navigate = useNavigate()

  // State Management
  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem('advocate_consult_requests')
    return saved ? JSON.parse(saved) : INITIAL_REQUESTS
  })
  
  const [upcoming, setUpcoming] = useState(() => {
    const saved = localStorage.getItem('advocate_consult_upcoming')
    return saved ? JSON.parse(saved) : INITIAL_UPCOMING
  })

  const [past] = useState(INITIAL_PAST)

  const [availableForBooking, setAvailableForBooking] = useState(() => {
    return localStorage.getItem('advocate_consult_available') !== 'false'
  })

  const [consultationFee, setConsultationFee] = useState(() => {
    return localStorage.getItem('advocate_consult_fee') || '1500'
  })

  const [isEditingSettings, setIsEditingSettings] = useState(false)
  const [tempFee, setTempFee] = useState(consultationFee)

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('advocate_consult_requests', JSON.stringify(requests))
  }, [requests])

  useEffect(() => {
    localStorage.setItem('advocate_consult_upcoming', JSON.stringify(upcoming))
  }, [upcoming])

  useEffect(() => {
    localStorage.setItem('advocate_consult_available', String(availableForBooking))
  }, [availableForBooking])

  // Handlers
  const handleAccept = (req) => {
    setRequests(prev => prev.filter(r => r.id !== req.id))
    setUpcoming(prev => [
      ...prev,
      {
        ...req,
        id: req.id + 1000,
        status: "confirmed"
      }
    ])
    alert(`Accepted consultation request from ${req.clientName}!`)
  }

  const handleReject = (reqId, clientName) => {
    if (window.confirm(`Are you sure you want to decline the request from ${clientName}?`)) {
      setRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'Rejected' } : r))
    }
  }

  const handleSaveSettings = (e) => {
    e.preventDefault()
    setConsultationFee(tempFee)
    localStorage.setItem('advocate_consult_fee', tempFee)
    setIsEditingSettings(false)
    alert('Consultation settings updated successfully!')
  }

  const handleStartCall = (clientName) => {
    alert(`Initializing secure WebRTC video room. Ringing ${clientName}...`)
  }

  return (
    <>
      <TopBar 
        title="Consultations"
        subtitle="APPOINTMENTS & SCHEDULING"
        isSidebarOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen(true)}
      />

      <div className="consultations-adv-grid fade-up">
        {/* LEFT COLUMN: Main Appointments Control */}
        <div className="consultations-main-col">
          
          {/* Summary Dashboard Cards */}
          <div className="consult-stats-row">
            <div className="consult-stat-card">
              <div className="stat-icon-wrapper blue">
                <Users size={20} />
              </div>
              <div className="stat-content">
                <span className="stat-label">Total Appointments</span>
                <span className="stat-value">{upcoming.length + past.length}</span>
              </div>
            </div>

            <div className="consult-stat-card">
              <div className="stat-icon-wrapper green">
                <CheckCircle size={20} />
              </div>
              <div className="stat-content">
                <span className="stat-label">Confirmed Sessions</span>
                <span className="stat-value">{upcoming.length}</span>
              </div>
            </div>

            <div className="consult-stat-card">
              <div className="stat-icon-wrapper gold">
                <DollarSign size={20} />
              </div>
              <div className="stat-content">
                <span className="stat-label">Total Revenue</span>
                <span className="stat-value">₹{(upcoming.length + past.length) * Number(consultationFee)}</span>
              </div>
            </div>
          </div>

          {/* Pending Consultation Requests */}
          <article className="panel">
            <div className="panel-header">
              <div>
                <h2>Pending Consultation Requests</h2>
                <p>New consultation requests from citizens awaiting your approval</p>
              </div>
              <span className="badge-count">{requests.filter(r => r.status === 'pending').length} Requests</span>
            </div>

            <div className="consult-list">
              {requests.filter(r => r.status === 'pending').length > 0 ? (
                requests.filter(r => r.status === 'pending').map(req => (
                  <div key={req.id} className="consult-item-row pending">
                    <div className="consult-item-info">
                      <div className="client-avatar-circle">{req.clientName[0]}</div>
                      <div>
                        <h3>{req.clientName}</h3>
                        <p className="topic-text"><strong>Query:</strong> {req.topic}</p>
                        <div className="consult-meta-tags">
                          <span className="tag-date"><Calendar size={12} /> {req.date}</span>
                          <span className="tag-time"><Clock size={12} /> {req.time}</span>
                          <span className={`tag-type ${req.type.includes('Video') ? 'video' : 'chat'}`}>
                            {req.type.includes('Video') ? <Video size={12} /> : <MessageSquare size={12} />} {req.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="consult-item-actions">
                      <div className="consult-price-badge">{req.fee}</div>
                      <div className="action-buttons-group">
                        <button 
                          onClick={() => handleAccept(req)}
                          className="btn-accept-consult" 
                          title="Accept Appointment"
                        >
                          <Check size={16} /> Accept
                        </button>
                        <button 
                          onClick={() => handleReject(req.id, req.clientName)}
                          className="btn-decline-consult" 
                          title="Decline Appointment"
                        >
                          <X size={16} /> Decline
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-consult-state">
                  <CheckCircle size={36} color="var(--accent-green)" />
                  <p>All consultation requests processed. You're up to date!</p>
                </div>
              )}
            </div>
          </article>

          {/* Upcoming Booked Appointments */}
          <article className="panel" style={{ marginTop: '24px' }}>
            <div className="panel-header">
              <div>
                <h2>Confirmed Appointments</h2>
                <p>Your scheduled consultations with clients</p>
              </div>
              <span className="badge-count active">{upcoming.length} Booked</span>
            </div>

            <div className="consult-list">
              {upcoming.length > 0 ? (
                upcoming.map(item => (
                  <div key={item.id} className="consult-item-row confirmed">
                    <div className="consult-item-info">
                      <div className="client-avatar-circle active-avatar">{item.clientName[0]}</div>
                      <div>
                        <h3>{item.clientName}</h3>
                        <p className="topic-text"><strong>Query:</strong> {item.topic}</p>
                        <div className="consult-meta-tags">
                          <span className="tag-date"><Calendar size={12} /> {item.date}</span>
                          <span className="tag-time"><Clock size={12} /> {item.time}</span>
                          <span className={`tag-type ${item.type.includes('Video') ? 'video' : 'chat'}`}>
                            {item.type.includes('Video') ? <Video size={12} /> : <MessageSquare size={12} />} {item.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="consult-item-actions">
                      <div className="consult-price-badge">₹{consultationFee}</div>
                      <div className="action-buttons-group">
                        {item.type.includes('Video') ? (
                          <button 
                            onClick={() => handleStartCall(item.clientName)}
                            className="btn-launch-video"
                          >
                            <Video size={16} /> Launch Video
                          </button>
                        ) : (
                          <button 
                            onClick={() => navigate('/advocate-messages')}
                            className="btn-launch-chat"
                          >
                            <MessageSquare size={16} /> Open Chat
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-consult-state">
                  <Calendar size={36} color="var(--text-muted)" />
                  <p>No upcoming appointments confirmed.</p>
                </div>
              )}
            </div>
          </article>
        </div>

        {/* RIGHT COLUMN: Settings & Past History */}
        <div className="consultations-sidebar-col">
          
          {/* Availability & Fee Panel */}
          <article className="panel">
            <div className="panel-header" style={{ marginBottom: '16px' }}>
              <h2>Consultation Controls</h2>
            </div>
            
            <div className="control-card">
              <div className="toggle-container-row">
                <div>
                  <span className="control-label">Receive Bookings</span>
                  <p className="control-desc">When enabled, citizens can schedule new consultations with you.</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={availableForBooking} 
                    onChange={e => setAvailableForBooking(e.target.checked)} 
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="fee-display-row" style={{ marginTop: '20px', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
                {!isEditingSettings ? (
                  <>
                    <div>
                      <span className="control-label">Consultation Rate</span>
                      <p className="control-desc">Hourly fee paid by users for a session.</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span className="fee-value-text">₹{consultationFee}</span>
                      <button 
                        className="btn-edit-rate" 
                        onClick={() => { setTempFee(consultationFee); setIsEditingSettings(true); }}
                      >
                        Change Rate
                      </button>
                    </div>
                  </>
                ) : (
                  <form onSubmit={handleSaveSettings} style={{ width: '100%' }}>
                    <label className="control-label" style={{ marginBottom: '6px', display: 'block' }}>Set Hourly Consultation Fee (₹)</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input 
                        type="number" 
                        className="fee-settings-input"
                        value={tempFee} 
                        onChange={e => setTempFee(e.target.value)} 
                        min="200" 
                        max="10000"
                        required
                      />
                      <button type="submit" className="btn-save-fee"><Check size={16} /></button>
                      <button type="button" className="btn-cancel-fee" onClick={() => setIsEditingSettings(false)}><X size={16} /></button>
                    </div>
                    <small style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '6px', display: 'block' }}>
                      Range: ₹200 - ₹10,000 per consultation session.
                    </small>
                  </form>
                )}
              </div>
            </div>
          </article>

          {/* Past Consultations */}
          <article className="panel" style={{ marginTop: '24px' }}>
            <div className="panel-header">
              <h2>History</h2>
            </div>
            
            <div className="past-consult-list">
              {past.map(item => (
                <div key={item.id} className="past-consult-item">
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <strong style={{ color: 'var(--text-heading)', fontSize: '13.5px' }}>{item.clientName}</strong>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.date}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>{item.topic}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', fontSize: '11.5px' }}>
                      <span style={{ color: 'var(--accent-green)', fontWeight: '600' }}>Completed</span>
                      <span style={{ color: 'var(--text-muted)' }}>Paid: {item.fee}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </>
  )
}
