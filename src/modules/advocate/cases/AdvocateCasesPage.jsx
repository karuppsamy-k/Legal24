import { useState, useEffect } from 'react'
import { useOutletContext, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../../core/context/AuthContext'
import { 
  Search, 
  Filter, 
  Plus, 
  Briefcase, 
  User, 
  Calendar, 
  MoreVertical,
  ChevronRight,
  ArrowLeft,
  Bell,
  Settings,
  Clock,
  FileText,
  MessageSquare,
  LogOut,
  X,
  Check,
  AlertCircle,
  Trash2
} from 'lucide-react'
import TopBar from '../../../shared/components/organisms/TopBar'
import './advocate_cases.css'
import '../dashboard/advocate_dashboard.css'

const MOCK_CASES = [
  { id: 'C-204', title: "Property Dispute - Sector 5", client: "Amit Kumar", type: "Civil", status: "In Progress", progress: 65, date: "16 May 2026", description: "Property litigation regarding the structural encroachment of land in Sector 5." },
  { id: 'C-215', title: "Trademark Infringement", client: "Tech Corp", type: "Corporate", status: "Hearing Scheduled", progress: 40, date: "15 May 2026", description: "IP infringement claim against competitive marketing domain using proprietary marks." },
  { id: 'C-198', title: "Employment Contract Review", client: "Sarah J.", type: "Labor", status: "Completed", progress: 80, date: "12 May 2026", description: "Assessment of employment separation terms and compliance with labor rules." },
  { id: 'C-220', title: "Divorce Settlement", client: "Rajesh M.", type: "Family", status: "Pending Response", progress: 20, date: "10 May 2026", description: "Matrimonial separation, division of marital assets, and child custody arrangements." },
  { id: 'C-225', title: "Criminal Defense - Theft", client: "Vijay S.", type: "Criminal", status: "In Progress", progress: 55, date: "08 May 2026", description: "Defense representation in case of alleged petty larceny at corporate shop premises." }
]

const MOCK_REQUESTS = [
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

export default function AdvocateCasesPage() {
  const { sidebarOpen, setSidebarOpen } = useOutletContext()
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // State Management
  const [cases, setCases] = useState(() => {
    const saved = localStorage.getItem('legal24_cases')
    return saved ? JSON.parse(saved) : MOCK_CASES
  })

  const [caseRequests, setCaseRequests] = useState(() => {
    const saved = localStorage.getItem('legal24_case_requests')
    const savedCases = JSON.parse(localStorage.getItem('legal24_cases') || '[]')
    let currentRequests = saved ? JSON.parse(saved) : []

    // Seed missing items that are not in currentRequests and not accepted into savedCases
    const toAdd = MOCK_REQUESTS.filter(mock => {
      const alreadyRequest = currentRequests.some(r => r.id === mock.id)
      const alreadyCase = savedCases.some(c => c.title === mock.title || c.id === mock.id.replace('REQ-', 'C-'))
      return !alreadyRequest && !alreadyCase
    })

    if (toAdd.length > 0 || !saved) {
      currentRequests = [...currentRequests, ...toAdd]
      localStorage.setItem('legal24_case_requests', JSON.stringify(currentRequests))
    }
    return currentRequests
  })

  // Modal Dialogs
  const [isNewCaseOpen, setIsNewCaseOpen] = useState(false)
  const [selectedCase, setSelectedCase] = useState(null)
  const [showRequests, setShowRequests] = useState(false)

  // Edit details form states
  const [detailStatus, setDetailStatus] = useState('')
  const [detailProgress, setDetailProgress] = useState(0)
  const [detailDescription, setDetailDescription] = useState('')

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('legal24_cases', JSON.stringify(cases))
  }, [cases])

  useEffect(() => {
    localStorage.setItem('legal24_case_requests', JSON.stringify(caseRequests))
  }, [caseRequests])

  useEffect(() => {
    if (selectedCase) {
      setDetailStatus(selectedCase.status)
      setDetailProgress(selectedCase.progress)
      setDetailDescription(selectedCase.description || '')
    }
  }, [selectedCase])

  // Process navigation parameters from Advocate Dashboard overview links
  useEffect(() => {
    if (location.state) {
      if (location.state.openRequests) {
        setShowRequests(true)
      }
      if (location.state.openNewCaseModal) {
        setIsNewCaseOpen(true)
      }
      if (location.state.openCaseId) {
        const found = cases.find(c => c.id === location.state.openCaseId)
        if (found) {
          setSelectedCase(found)
        }
      }
      // Reset router state history so it doesn't reopen upon reloading or resizing
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location.state, cases, navigate])

  // Handlers
  const handleAcceptRequest = (req) => {
    const newCase = {
      id: 'C-' + Math.floor(230 + Math.random() * 50),
      title: req.title,
      client: req.client,
      type: req.type,
      status: 'In Progress',
      progress: 10,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      description: req.description
    }

    setCases(prev => [newCase, ...prev])
    setCaseRequests(prev => prev.filter(r => r.id !== req.id))
    alert(`Case request approved! New case ${newCase.id} has been registered and added to your portfolio.`);
  }

  const handleRejectRequest = (reqId, client) => {
    if (window.confirm(`Are you sure you want to decline the case filing request from ${client}?`)) {
      setCaseRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'Rejected' } : r))
    }
  }

  const handleCreateNewCase = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newCase = {
      id: 'C-' + Math.floor(230 + Math.random() * 50),
      title: formData.get('title'),
      client: formData.get('client'),
      type: formData.get('category'),
      status: formData.get('status'),
      progress: Number(formData.get('progress')),
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      description: formData.get('description')
    }

    setCases(prev => [newCase, ...prev])
    setIsNewCaseOpen(false)
    alert(`New case ${newCase.id} registered successfully!`)
  }

  const handleSaveCaseDetails = (e) => {
    e.preventDefault()
    setCases(prev => prev.map(c => {
      if (c.id === selectedCase.id) {
        return {
          ...c,
          status: detailStatus,
          progress: Number(detailProgress),
          description: detailDescription,
          date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        }
      }
      return c
    }))
    setSelectedCase(null)
    alert('Case details and progress updated successfully!')
  }

  const handleDeleteCase = (caseId) => {
    if (window.confirm(`Are you sure you want to delete case ${caseId} from your records?`)) {
      setCases(prev => prev.filter(c => c.id !== caseId))
      setSelectedCase(null)
      alert(`Case ${caseId} deleted.`);
    }
  }

  // Filter & Search Logic
  const filteredCases = cases.filter(c => {
    const matchesFilter = activeFilter === 'All' || c.type === activeFilter
    const matchesSearch = searchQuery === '' || 
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.client.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const pendingRequestsCount = caseRequests.filter(r => r.status === 'Pending Approval').length;

  const filteredRequests = caseRequests.filter(req => req.status === 'Pending Approval').filter(req => {
    const term = searchQuery.toLowerCase();
    return searchQuery === '' || 
      req.title.toLowerCase().includes(term) || 
      req.client.toLowerCase().includes(term) || 
      req.type.toLowerCase().includes(term)
  })

  return (
    <>
      <TopBar 
        title="My Cases"
        subtitle="Management"
        isSidebarOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen(true)}
      />

      {/* Main Cases Headers */}
      <section className="cases-header-actions fade-up" style={{ marginBottom: '20px' }}>
        <div className="search-bar">
          <Search size={18} />
          <input 
            type="text" 
            placeholder={showRequests ? "Search by Request ID, Title or Client..." : "Search by Case ID, Title or Client..."} 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button 
            className={`requests-toggle-btn ${pendingRequestsCount > 0 ? 'highlighted' : ''} ${showRequests ? 'active' : ''}`}
            onClick={() => setShowRequests(!showRequests)}
          >
            <AlertCircle size={16} />
            Requests ({pendingRequestsCount})
            {pendingRequestsCount > 0 && <span className="highlight-dot" />}
          </button>
          
          <button className="summary-action" onClick={() => setIsNewCaseOpen(true)}>
            <Plus size={18} /> New Case
          </button>
        </div>
      </section>

      {showRequests ? (
        <>
          {/* Back button and title */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '16px' }} className="fade-up">
            <button className="view-btn" onClick={() => setShowRequests(false)} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '10px', fontWeight: '600' }}>
              <ArrowLeft size={16} /> Back to Cases
            </button>
            <span style={{ fontSize: '13.5px', color: 'var(--text-muted)' }}>
              Showing <strong>{filteredRequests.length}</strong> Pending Requests
            </span>
          </div>

          {/* Requests list replacing cases */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="fade-up delay-1">
            {filteredRequests.length > 0 ? (
              filteredRequests.map(req => (
                <div key={req.id} className="case-req-row">
                  <div className="case-req-avatar">{req.client ? req.client[0] : 'C'}</div>
                  <div className="case-req-details">
                    <div className="case-req-header-line">
                      <span className="case-req-title-text">{req.title}</span>
                      <span className="case-req-badge">{req.type}</span>
                    </div>
                    <div className="case-req-sub-info">
                      Submitted by <strong>{req.client}</strong> on {req.date}
                    </div>
                    <p className="case-req-desc-quote">
                      "{req.description}"
                    </p>
                  </div>
                  <div className="case-req-actions">
                    <button onClick={() => handleAcceptRequest(req)} className="btn-approve-action">
                      <Check size={14} /> Accept Filing
                    </button>
                    <button onClick={() => handleRejectRequest(req.id, req.client)} className="btn-reject-action">
                      <X size={14} /> Decline
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-consult-state" style={{ padding: '60px 20px' }}>
                <AlertCircle size={40} color="var(--text-muted)" />
                <p>No client filing requests match the search query.</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Filter Options */}
          <section className="cases-filter-row fade-up delay-1">
            {['All', 'Civil', 'Criminal', 'Family', 'Corporate', 'Labor'].map(filter => (
              <button 
                key={filter} 
                className={`filter-chip ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </section>

          {/* Cases Grid */}
          <div className="case-card-grid fade-up delay-2">
            {filteredCases.length > 0 ? (
              filteredCases.map((caseItem, idx) => (
                <div key={caseItem.id} className="case-card">
                  <div className="case-card-header">
                    <span className="case-id">{caseItem.id}</span>
                    <span className={`status-pill ${caseItem.status.toLowerCase().replace(/ /g, '-')}`}>{caseItem.status}</span>
                  </div>
                  
                  <h3>{caseItem.title}</h3>
                  
                  <div className="case-client">
                    <User size={14} />
                    {caseItem.client} • {caseItem.type}
                  </div>

                  <div className="case-progress-section">
                    <div className="case-progress-label">
                      <span>Progress</span>
                      <span>{caseItem.progress}%</span>
                    </div>
                    <div className="case-progress-bar">
                      <div className="case-progress-fill" style={{ width: `${caseItem.progress}%` }} />
                    </div>
                  </div>

                  <div className="case-card-footer">
                    <div className="case-date">
                      <Clock size={14} />
                      Updated: {caseItem.date}
                    </div>
                    <button className="view-btn" onClick={() => setSelectedCase(caseItem)}>View Details</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-consult-state" style={{ gridColumn: '1 / -1', padding: '60px 20px' }}>
                <Briefcase size={40} color="var(--text-muted)" />
                <p>No active cases match the filter or search query.</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* MODAL 1: Create New Case Manual Registration */}
      {isNewCaseOpen && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Register New Case</h2>
              <button className="close-btn" onClick={() => setIsNewCaseOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleCreateNewCase} className="modal-form">
              <div className="form-group">
                <label>Case Title / Dispute Name</label>
                <input type="text" name="title" placeholder="e.g. Property Boundary Conflict" required />
              </div>
              <div className="form-group">
                <label>Client Name</label>
                <input type="text" name="client" placeholder="e.g. Rahul Sen" required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Case Category</label>
                  <select name="category" required>
                    <option value="Civil">Civil</option>
                    <option value="Criminal">Criminal</option>
                    <option value="Family">Family</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Labor">Labor</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Initial Status</label>
                  <select name="status" required>
                    <option value="In Progress">In Progress</option>
                    <option value="Hearing Scheduled">Hearing Scheduled</option>
                    <option value="Pending Response">Pending Response</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Progress percentage ({detailProgress}%)</label>
                <input 
                  type="range" 
                  name="progress" 
                  min="0" 
                  max="100" 
                  defaultValue="20"
                  onChange={e => setDetailProgress(e.target.value)} 
                />
              </div>
              <div className="form-group">
                <label>Brief Background/Notes</label>
                <textarea 
                  name="description" 
                  placeholder="Record summary details, court reference numbers, etc." 
                  rows={3} 
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsNewCaseOpen(false)}>Cancel</button>
                <button type="submit" className="btn-submit">Register Case</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: View and Update Case Details */}
      {selectedCase && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Case Details: {selectedCase.id}</h2>
              <button className="close-btn" onClick={() => setSelectedCase(null)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveCaseDetails} className="modal-form">
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', color: '#fff', fontSize: '16px' }}>{selectedCase.title}</h3>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    <strong>Client:</strong> {selectedCase.client} • <strong>Category:</strong> {selectedCase.type}
                  </span>
                </div>
                <button 
                  type="button" 
                  className="icon-only" 
                  style={{ color: '#ef4444' }} 
                  onClick={() => handleDeleteCase(selectedCase.id)}
                  title="Delete Case Record"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="form-group">
                <label>Case Description & Notes</label>
                <textarea 
                  value={detailDescription} 
                  onChange={e => setDetailDescription(e.target.value)} 
                  rows={3} 
                  required 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Status</label>
                  <select value={detailStatus} onChange={e => setDetailStatus(e.target.value)} required>
                    <option value="In Progress">In Progress</option>
                    <option value="Hearing Scheduled">Hearing Scheduled</option>
                    <option value="Pending Response">Pending Response</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Progress ({detailProgress}%)</label>
                  <input 
                    type="range" 
                    value={detailProgress} 
                    onChange={e => setDetailProgress(Number(e.target.value))} 
                    min="0" 
                    max="100" 
                  />
                </div>
              </div>

              {/* Milestones timeline representation */}
              <div style={{ marginTop: '10px' }}>
                <label className="control-label" style={{ fontSize: '12.5px', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                  CASE MILESTONES HISTORY
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: 'rgba(0,0,0,0.1)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                    <span style={{ color: '#4ce1b1', fontWeight: 600 }}>✓ Case Registered</span>
                    <span style={{ color: 'var(--text-muted)' }}>{selectedCase.date}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                    <span style={{ color: '#6c9cff', fontWeight: 600 }}>• In Progress Updates</span>
                    <span style={{ color: 'var(--text-muted)' }}>Active</span>
                  </div>
                </div>
              </div>

              <div className="modal-actions" style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px', marginTop: '8px' }}>
                <button type="button" className="btn-cancel" onClick={() => setSelectedCase(null)}>Close</button>
                <button type="submit" className="btn-submit">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
