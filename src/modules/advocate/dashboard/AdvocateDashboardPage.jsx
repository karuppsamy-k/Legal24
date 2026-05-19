import { useState, useEffect } from 'react'
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
  const [requestsCount, setRequestsCount] = useState(0)
  const [instantRequests, setInstantRequests] = useState([])

  // Poll for instant requests
  useEffect(() => {
    const fetchInstantRequests = () => {
      const stored = JSON.parse(localStorage.getItem('legal24_instant_requests') || '[]');
      const pending = stored.filter(req => req.status === 'Pending');
      setInstantRequests(pending);
    };
    fetchInstantRequests();
    const interval = setInterval(fetchInstantRequests, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleAcceptInstant = (request) => {
    // Read fresh from storage to prevent race condition
    const stored = JSON.parse(localStorage.getItem('legal24_instant_requests') || '[]');
    const target = stored.find(r => r.id === request.id);
    
    if (target && target.status === 'Pending') {
      const updated = stored.map(r => 
        r.id === request.id 
          ? { ...r, status: 'Confirmed', handledBy: user?.name || 'Advocate' } 
          : r
      );
      localStorage.setItem('legal24_instant_requests', JSON.stringify(updated));
      alert(`You have accepted the instant consultation for ${request.mobile}. Connecting...`);
      // Update local state immediately
      setInstantRequests(prev => prev.filter(r => r.id !== request.id));
    } else {
      alert('This request has already been accepted by another advocate.');
      setInstantRequests(prev => prev.filter(r => r.id !== request.id));
    }
  };

  // Initialize Mock Case Requests if not exist
  useEffect(() => {
    const saved = localStorage.getItem('legal24_case_requests')
    const savedCases = JSON.parse(localStorage.getItem('legal24_cases') || '[]')
    
    const initialPool = [
      {
        id: 'REQ-188',
        title: 'Landlord Tenant Dispute - Illegal Eviction',
        client: 'Priyanka Sen',
        type: 'Civil',
        description: 'Landlord locked out premises without a court warrant and withheld security deposit.',
        date: '19 May 2026',
        status: 'Pending Approval'
      },
      {
        id: 'REQ-194',
        title: 'Breach of Partnership Agreement',
        client: 'Karan Malhotra',
        type: 'Corporate',
        description: 'Partner withdrew 40% equity from the corporate account violating Clause 12 of joint agreement.',
        date: '20 May 2026',
        status: 'Pending Approval'
      },
      {
        id: 'REQ-202',
        title: 'Custody & Child Support Dispute',
        client: 'Ananya Sharma',
        type: 'Family',
        description: 'Seeking court-ordered monthly child support and primary custodial residency privileges.',
        date: '20 May 2026',
        status: 'Pending Approval'
      },
      {
        id: 'REQ-210',
        title: 'Unauthorized Brand Trademark Registration',
        client: 'Rajesh Patel',
        type: 'Corporate',
        description: 'Competitor registered trademark identical to our brand logo under Class 35 despite prior use.',
        date: '20 May 2026',
        status: 'Pending Approval'
      },
      {
        id: 'REQ-215',
        title: 'Wrongful Termination & Severance Dispute',
        client: 'Vikram Malhotra',
        type: 'Labor',
        description: 'Terminated immediately without notice period or statutory severance pay package.',
        date: '19 May 2026',
        status: 'Pending Approval'
      },
      {
        id: 'REQ-222',
        title: 'Unreasonable Flat Possession Delay',
        client: 'Megha Rawat',
        type: 'Civil',
        description: 'Builder delayed apartment handover by over 18 months past the promised RERA deadline date.',
        date: '20 May 2026',
        status: 'Pending Approval'
      }
    ]

    let currentRequests = saved ? JSON.parse(saved) : []

    // Seed missing items that are not in currentRequests and not accepted into savedCases
    const toAdd = initialPool.filter(mock => {
      const alreadyRequest = currentRequests.some(r => r.id === mock.id)
      const alreadyCase = savedCases.some(c => c.title === mock.title || c.id === mock.id.replace('REQ-', 'C-'))
      return !alreadyRequest && !alreadyCase
    })

    if (toAdd.length > 0 || !saved) {
      currentRequests = [...currentRequests, ...toAdd]
      localStorage.setItem('legal24_case_requests', JSON.stringify(currentRequests))
    }

    setRequestsCount(currentRequests.length)
  }, [])

  // Dynamic user status from localStorage to sync immediately when approved by admin
  const registeredUsers = JSON.parse(localStorage.getItem('legal24_users') || '[]');
  const dbUser = registeredUsers.find(u => u.email === user?.email);
  const status = dbUser ? dbUser.status : (user?.status || 'approved');
  const isPending = status === 'pending';

  const stats = isPending ? [
    { title: "Active Cases", value: "0", detail: "Verification pending", badge: "Inactive" },
    { title: "Upcoming Hearings", value: "0", detail: "Verification pending", badge: "Inactive" },
    { title: "Client Messages", value: "0", detail: "Verification pending", badge: "Inactive" },
    { title: "Case Requests", value: "0", detail: "Verification pending", badge: "Inactive" },
    { title: "Total Billings", value: "₹0", detail: "Verification pending", badge: "0%" }
  ] : [
    { title: "Active Cases", value: "12", detail: "4 due this week", badge: "+2 New", onClick: () => navigate('/advocate-cases') },
    { title: "Upcoming Hearings", value: "5", detail: "Next: Tomorrow 10 AM", badge: "Urgent", onClick: () => navigate('/advocate-hearings') },
    { title: "Client Messages", value: "8", detail: "3 unread", badge: "Active", onClick: () => navigate('/advocate-communication') },
    { title: "Case Requests", value: String(requestsCount), detail: "Click to review", badge: requestsCount > 0 ? "Action Required" : "All Clear", onClick: () => navigate('/advocate-cases', { state: { openRequests: true } }) },
    { title: "Total Billings", value: "₹45,200", detail: "Last 30 days", badge: "+12%", onClick: () => navigate('/advocate-payments') }
  ];

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

      {instantRequests.length > 0 && !isPending && (
        <div className="fade-up" style={{ marginBottom: '24px' }}>
          <div style={{ background: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.4)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ color: '#fbbf24', margin: 0, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px' }}>
              <ShieldAlert size={20} /> Urgent: Instant Consultations Needed
            </h3>
            <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
              {instantRequests.map(req => (
                <div key={req.id} style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '16px' }}>{req.mobile}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Requested: {req.date}</div>
                  </div>
                  <button onClick={() => handleAcceptInstant(req)} style={{ background: '#fbbf24', color: '#000', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                    Accept Call
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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
                <div 
                  key={item.id} 
                  className="case-item fade-up"
                  onClick={() => navigate('/advocate-cases', { state: { openCaseId: item.id } })}
                  style={{ cursor: 'pointer' }}
                >
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
            <button className="add-case-btn" onClick={() => navigate('/advocate-cases', { state: { openNewCaseModal: true } })}>
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
                <div 
                  key={hearing.id} 
                  className="hearing-card"
                  onClick={() => navigate('/advocate-hearings')}
                  style={{ cursor: 'pointer' }}
                >
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
