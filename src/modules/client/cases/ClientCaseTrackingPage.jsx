import { useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../core/context/AuthContext'
import { 
  Activity, 
  ChevronRight, 
  CheckCircle2, 
  Circle, 
  Clock, 
  FileText, 
  LayoutDashboard,
  Calendar,
  CreditCard,
  LogOut,
  Bell,
  MessageSquare,
  ArrowLeft,
  ExternalLink,
  X
} from 'lucide-react'
import TopBar from '../../../shared/components/organisms/TopBar'
import './client_case_tracking.css'
import '../dashboard/client_dashboard.css'
import '../../advocate/dashboard/advocate_dashboard.css'

const MILESTONES = [
  { id: 1, title: "Case Filed", date: "10 May 2026", status: "completed", desc: "The property dispute case has been officially filed in the District Court.", actionLabel: "View Receipt" },
  { id: 2, title: "Initial Hearing", date: "15 May 2026", status: "completed", desc: "First hearing completed. Judge requested original property deeds for verification.", actionLabel: "Download Minutes" },
  { id: 3, title: "Document Verification", date: "Pending", status: "current", desc: "Advocate is currently verifying the submitted deeds with the sub-registrar office.", actionLabel: "View Documents" },
  { id: 4, title: "Response from Opposing Party", date: "Estimated 25 May", status: "upcoming", desc: "Waiting for the counter-affidavit from the opposing party's counsel." },
  { id: 5, title: "Evidence Submission", date: "TBD", status: "upcoming", desc: "Submission of witness statements and photographic evidence." }
]

const navItems = [
  { label: 'Dashboard', id: 'client-dashboard', icon: <LayoutDashboard size={18} /> },
  { label: 'My Cases', id: 'client-cases', icon: <Activity size={18} />, active: true },
  { label: 'Consultations', id: 'client-consultations', icon: <Calendar size={18} /> },
  { label: 'Documents', id: 'client-documents', icon: <FileText size={18} /> },
  { label: 'Payments', id: 'client-payments', icon: <CreditCard size={18} /> }
]

import { User as UserIcon } from 'lucide-react'

const MOCK_CASES_SEED = [
  { id: 'C-204', title: "Property Dispute - Sector 5", client: "Regular User", type: "Civil", status: "In Progress", progress: 65, date: "10 May 2026", description: "Property litigation regarding the structural encroachment of land in Sector 5.", advocate: "Adv. Rajesh Kumar" },
  { id: 'C-215', title: "Trademark Infringement Claim", client: "Regular User", type: "Corporate", status: "Hearing Scheduled", progress: 40, date: "15 May 2026", description: "IP infringement dispute with competitive web domains using registered symbols.", advocate: "Adv. Sunita Rao" },
  { id: 'C-198', title: "Employment Contract Review", client: "Regular User", type: "Labor", status: "Completed", progress: 100, date: "12 May 2026", description: "Assessment of contract severance terms and compliance with local labor codes.", advocate: "Adv. Rajesh Kumar" }
]

export default function ClientCaseTrackingPage() {
  const { sidebarOpen, setSidebarOpen } = useOutletContext()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [isFileCaseOpen, setIsFileCaseOpen] = useState(false)
  const [selectedCase, setSelectedCase] = useState(null)
  const [activeTab, setActiveTab] = useState('active') // 'active', 'pending', 'declined'

  // Local storage linked active cases
  const [cases, setCases] = useState(() => {
    const saved = localStorage.getItem('legal24_cases')
    if (saved) {
      const parsed = JSON.parse(saved)
      const userCases = parsed.map(c => {
        if (c.client === "Amit Kumar" || c.client === "Regular User" || !c.client) {
          return { ...c, client: "Regular User" }
        }
        return c
      })
      return userCases.filter(c => c.client === "Regular User")
    }
    localStorage.setItem('legal24_cases', JSON.stringify(MOCK_CASES_SEED))
    return MOCK_CASES_SEED
  })

  // Filing requests database linked requests
  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem('legal24_case_requests')
    if (saved) {
      const parsed = JSON.parse(saved)
      return parsed.filter(r => r.client === "Regular User")
    }
    const initial = [
      { id: 'REQ-188', title: 'Landlord Tenant Dispute - Illegal Eviction', advocate: 'Adv. Rajesh Kumar', client: 'Regular User', type: 'Civil', description: 'Landlord locked out premises without a court warrant and withheld security deposit.', date: '19 May 2026', status: 'Pending Approval' },
      { id: 'REQ-210', title: 'Unauthorized Brand Trademark Registration', advocate: 'Adv. Sunita Rao', client: 'Regular User', type: 'Corporate', description: 'Competitor registered trademark identical to our brand logo.', date: '20 May 2026', status: 'Rejected' }
    ]
    localStorage.setItem('legal24_case_requests', JSON.stringify(initial))
    return initial
  })

  // Dynamic milestone generation depending on case ID and category
  const getMilestonesForCase = (c) => {
    if (c.id === 'C-204') {
      return [
        { id: 1, title: "Case Filed", date: "10 May 2026", status: "completed", desc: "The property dispute case has been officially filed in the District Court.", actionLabel: "View Receipt" },
        { id: 2, title: "Initial Hearing", date: "15 May 2026", status: "completed", desc: "First hearing completed. Judge requested original deeds.", actionLabel: "Download Minutes" },
        { id: 3, title: "Document Verification", date: "Pending", status: "current", desc: "Advocate is verifying deeds with the sub-registrar office.", actionLabel: "View Documents" },
        { id: 4, title: "Opposing Party Reply", date: "Estimated 25 May", status: "upcoming", desc: "Waiting for opposing counsel counter-affidavit." },
        { id: 5, title: "Evidence Submission", date: "TBD", status: "upcoming", desc: "Submission of witness statements." }
      ]
    }
    if (c.id === 'C-215') {
      return [
        { id: 1, title: "Cease & Desist Sent", date: "02 May 2026", status: "completed", desc: "Formal notice served to infringing domains.", actionLabel: "View Notice" },
        { id: 2, title: "Injunction Appeal Filed", date: "08 May 2026", status: "completed", desc: "Filed application for temporary injunction in High Court.", actionLabel: "View Appeal" },
        { id: 3, title: "Ad-Interim Hearing", date: "Tomorrow 10:00 AM", status: "current", desc: "Scheduled for oral arguments regarding interlocutory stay.", actionLabel: "Join Video Call" }
      ]
    }
    if (c.id === 'C-198') {
      return [
        { id: 1, title: "Contract Assessment", date: "05 May 2026", status: "completed", desc: "Advocate assessed separation clauses.", actionLabel: "View Report" },
        { id: 2, title: "Arbitration Notice Sent", date: "10 May 2026", status: "completed", desc: "Sent formal request for mediation.", actionLabel: "View Notice" },
        { id: 3, title: "Settlement Sign-off", date: "12 May 2026", status: "completed", desc: "Both parties agreed to severance terms. Case resolved.", actionLabel: "Download Accord" }
      ]
    }
    // Generic fallback for newly registered cases
    return [
      { id: 1, title: "Case Filing Requested", date: c.date || "Today", status: "completed", desc: "Filing details drafted and submitted for advocate review.", actionLabel: "View Details" },
      { id: 2, title: "Initial Assessment", date: "Awaiting Action", status: "current", desc: "Advocate is currently reviewing documents and facts to petition." }
    ]
  }

  const handleFileCaseSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Save to request queue for Advocate dashboard approval flow
    const newRequest = {
      id: 'REQ-' + Math.floor(300 + Math.random() * 900),
      title: formData.get('title'),
      advocate: formData.get('advocate'),
      client: "Regular User",
      type: formData.get('category'),
      description: formData.get('description'),
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: "Pending Approval"
    };

    const currentRequests = JSON.parse(localStorage.getItem('legal24_case_requests') || '[]');
    const updatedRequests = [newRequest, ...currentRequests]
    localStorage.setItem('legal24_case_requests', JSON.stringify(updatedRequests));

    // Refresh client local page state
    setRequests(updatedRequests.filter(r => r.client === "Regular User"))
    alert(`Your case filing request for "${newRequest.title}" has been successfully submitted to ${newRequest.advocate}! It is currently awaiting advocate confirmation.`);
    setIsFileCaseOpen(false);
    
    // Auto-switch to pending requests tab to track it
    setActiveTab('pending')
  };

  return (
    <>
      <TopBar 
        title={selectedCase ? "Case Timeline" : "My Cases"}
        subtitle={selectedCase ? `Case: ${selectedCase.id}` : "Case Portfolio"}
        isSidebarOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen(true)}
        actions={
          <button 
            onClick={() => setIsFileCaseOpen(true)}
            className="summary-action" 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#6c9cff', color: '#fff', border: 'none' }}
          >
            <Activity size={16} /> File a Case
          </button>
        }
      />

      {selectedCase ? (
        /* Detailed Case Timeline view */
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <button className="back-header-btn" onClick={() => setSelectedCase(null)}>
            <ArrowLeft size={16} /> Back to Cases
          </button>
          
          <section className="timeline-container fade-up">
            <div className="timeline-header-info">
              <div>
                <span className="milestone-badge">{selectedCase.type} Matter</span>
                <h2>{selectedCase.title}</h2>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px', padding: '12px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(108, 156, 255, 0.2), rgba(76, 225, 177, 0.2))', color: '#4ce1b1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Activity size={20} />
                  </div>
                  <div>
                    <p style={{ color: '#fff', margin: 0, fontSize: '14px', fontWeight: 600 }}>{selectedCase.advocate || 'Adv. Rajesh Kumar'}</p>
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '12px' }}>Consultant Advocate</p>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Current Status</span>
                <p style={{ color: '#6c9cff', fontWeight: 700, margin: '4px 0', fontSize: '18px' }}>{selectedCase.status}</p>
              </div>
            </div>

            <div className="timeline-track">
              {getMilestonesForCase(selectedCase).map((step, idx) => (
                <div key={step.id} className={`timeline-node ${step.status} fade-up`} style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className={`node-marker ${step.status}`} />
                  <div className="node-content">
                    <span className="node-date">{step.date}</span>
                    <h3 className="node-title">{step.title}</h3>
                    <p className="node-desc">{step.desc}</p>
                    {step.actionLabel && (
                      <button className="view-btn" style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => alert(`Accessing file attachments for: ${step.title}`)}>
                        <ExternalLink size={14} /> {step.actionLabel}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : (
        /* Multi-Case / Requests portfolio view */
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Tabs bar */}
          <div className="cases-tab-row" style={{ display: 'flex', gap: '16px', marginBottom: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '12px' }}>
            <button 
              onClick={() => setActiveTab('active')} 
              style={{ 
                background: 'transparent', 
                border: 'none', 
                color: activeTab === 'active' ? '#6c9cff' : 'var(--text-muted)', 
                fontWeight: 600, 
                fontSize: '15px', 
                padding: '6px 12px', 
                position: 'relative',
                cursor: 'pointer' 
              }}
            >
              Active Cases ({cases.length})
              {activeTab === 'active' && <span style={{ position: 'absolute', bottom: '-13px', left: 0, right: 0, height: '2px', background: '#6c9cff' }} />}
            </button>
            
            <button 
              onClick={() => setActiveTab('pending')} 
              style={{ 
                background: 'transparent', 
                border: 'none', 
                color: activeTab === 'pending' ? '#6c9cff' : 'var(--text-muted)', 
                fontWeight: 600, 
                fontSize: '15px', 
                padding: '6px 12px', 
                position: 'relative',
                cursor: 'pointer' 
              }}
            >
              Pending Requests ({requests.filter(r => r.status !== 'Rejected' && r.status !== 'Declined').length})
              {activeTab === 'pending' && <span style={{ position: 'absolute', bottom: '-13px', left: 0, right: 0, height: '2px', background: '#6c9cff' }} />}
            </button>

            <button 
              onClick={() => setActiveTab('declined')} 
              style={{ 
                background: 'transparent', 
                border: 'none', 
                color: activeTab === 'declined' ? '#6c9cff' : 'var(--text-muted)', 
                fontWeight: 600, 
                fontSize: '15px', 
                padding: '6px 12px', 
                position: 'relative',
                cursor: 'pointer' 
              }}
            >
              Declined Requests ({requests.filter(r => r.status === 'Rejected' || r.status === 'Declined').length})
              {activeTab === 'declined' && <span style={{ position: 'absolute', bottom: '-13px', left: 0, right: 0, height: '2px', background: '#6c9cff' }} />}
            </button>
          </div>

          {activeTab === 'active' && (
            /* Active cases portfolio list */
            <div className="client-cases-grid fade-up">
              {cases.length > 0 ? (
                cases.map((c, idx) => (
                  <div key={c.id} className="client-case-card fade-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                    <div>
                      <div className="case-card-header">
                        <span className="milestone-badge">{c.type} Matter</span>
                        <span className="case-id-badge">{c.id}</span>
                      </div>
                      <div className="case-card-body">
                        <h3>{c.title}</h3>
                        <p>{c.description || 'Active legal litigation under court review.'}</p>
                      </div>
                    </div>
                    <div>
                      <div className="case-progress-section">
                        <div className="progress-label-row">
                          <span>Status: <strong style={{ color: 'var(--accent-blue)' }}>{c.status}</strong></span>
                          <span>{c.progress || 10}%</span>
                        </div>
                        <div className="case-progress-bar">
                          <div className="case-progress-fill" style={{ width: `${c.progress || 10}%` }} />
                        </div>
                      </div>
                      <div className="card-advocate-row">
                        <UserIcon size={14} style={{ marginRight: '6px' }} />
                        <span>Advocate: <strong>{c.advocate || 'Adv. Rajesh Kumar'}</strong></span>
                      </div>
                      <button 
                        className="summary-action" 
                        style={{ width: '100%', marginTop: '16px', padding: '10px', borderRadius: '10px' }}
                        onClick={() => setSelectedCase(c)}
                      >
                        Track Timeline
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '20px', border: '1px dashed rgba(255, 255, 255, 0.05)', gridColumn: '1 / -1' }}>
                  <p style={{ color: 'var(--text-muted)' }}>No active cases found.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'pending' && (
            /* Pending Filing Requests list */
            <div className="client-cases-grid fade-up">
              {requests.filter(r => r.status !== 'Rejected' && r.status !== 'Declined').length > 0 ? (
                requests.filter(r => r.status !== 'Rejected' && r.status !== 'Declined').map((r, idx) => (
                  <div key={r.id} className="client-case-card fade-up" style={{ animationDelay: `${idx * 0.05}s`, borderLeft: '4px solid #ffd68a' }}>
                    <div>
                      <div className="case-card-header">
                        <span className="milestone-badge" style={{ background: 'rgba(251, 191, 36, 0.1)', color: '#fbbf24' }}>{r.type} Matter</span>
                        <span className="case-id-badge">{r.id}</span>
                      </div>
                      <div className="case-card-body">
                        <h3>{r.title}</h3>
                        <p>{r.description || 'Filing request context not provided.'}</p>
                      </div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>Status:</span>
                        <span style={{ background: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold' }}>Pending Review</span>
                      </div>
                      <div className="card-advocate-row">
                        <UserIcon size={14} style={{ marginRight: '6px' }} />
                        <span>Requested: <strong>{r.advocate}</strong></span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '20px', border: '1px dashed rgba(255, 255, 255, 0.05)', gridColumn: '1 / -1' }}>
                  <p style={{ color: 'var(--text-muted)' }}>No pending case filing requests found.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'declined' && (
            /* Declined Filing Requests list */
            <div className="client-cases-grid fade-up">
              {requests.filter(r => r.status === 'Rejected' || r.status === 'Declined').length > 0 ? (
                requests.filter(r => r.status === 'Rejected' || r.status === 'Declined').map((r, idx) => (
                  <div key={r.id} className="client-case-card fade-up" style={{ animationDelay: `${idx * 0.05}s`, borderLeft: '4px solid #ef4444' }}>
                    <div>
                      <div className="case-card-header">
                        <span className="milestone-badge" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>{r.type} Matter</span>
                        <span className="case-id-badge">{r.id}</span>
                      </div>
                      <div className="case-card-body">
                        <h3>{r.title}</h3>
                        <p>{r.description || 'Filing request context not provided.'}</p>
                      </div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>Status:</span>
                        <span style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold' }}>Filing Declined</span>
                      </div>
                      <div className="card-advocate-row">
                        <UserIcon size={14} style={{ marginRight: '6px' }} />
                        <span>Requested: <strong>{r.advocate}</strong></span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '20px', border: '1px dashed rgba(255, 255, 255, 0.05)', gridColumn: '1 / -1' }}>
                  <p style={{ color: 'var(--text-muted)' }}>No declined case filing requests found.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* File Case Modal Dialog */}
      {isFileCaseOpen && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <div className="modal-header">
              <h2>File a New Case</h2>
              <button className="close-btn" onClick={() => setIsFileCaseOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleFileCaseSubmit} className="modal-form">
              <div className="form-group">
                <label>Case Title / Dispute Name</label>
                <input type="text" name="title" placeholder="e.g. Property Dispute - Sector 3" required />
              </div>
              <div className="form-group">
                <label>Select Advocate</label>
                <select name="advocate" required>
                  <option value="Adv. Rajesh Kumar">Adv. Rajesh Kumar (Property & Real Estate)</option>
                  <option value="Adv. Sunita Rao">Adv. Sunita Rao (Corporate Law)</option>
                  <option value="Adv. Michael D.">Adv. Michael D. (Family & Divorce)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Case Type</label>
                <select name="category" required>
                  <option value="Civil">Civil</option>
                  <option value="Criminal">Criminal</option>
                  <option value="Family">Family</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Labor">Labor</option>
                </select>
              </div>
              <div className="form-group">
                <label>Description & Legal Facts</label>
                <textarea 
                  name="description" 
                  placeholder="Provide background context and client grievances..." 
                  rows={4} 
                  required 
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsFileCaseOpen(false)}>Cancel</button>
                <button type="submit" className="btn-submit">Submit Filing</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
