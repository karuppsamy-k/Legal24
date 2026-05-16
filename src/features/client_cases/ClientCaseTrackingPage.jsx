import { useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { useAuth } from '../../core/context/AuthContext'
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
  ExternalLink
} from 'lucide-react'
import TopBar from '../../shared/components/organisms/TopBar'
import './client_case_tracking.css'
import '../client_dashboard/client_dashboard.css'
import '../advocate_dashboard/advocate_dashboard.css'

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

export default function ClientCaseTrackingPage() {
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
        title="Case Timeline"
        subtitle="Case: C-204"
        isSidebarOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen(true)}
        actions={
          <button className="summary-action" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#6c9cff', color: '#fff', border: 'none' }}>
            <Activity size={16} /> File a Case
          </button>
        }
      />

        <section className="timeline-container fade-up">
          <div className="timeline-header-info">
            <div>
              <span className="milestone-badge">Civil Matter</span>
              <h2>Property Dispute - Sector 5</h2>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px', padding: '12px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(108, 156, 255, 0.2), rgba(76, 225, 177, 0.2))', color: '#4ce1b1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Activity size={20} />
                </div>
                <div>
                  <p style={{ color: '#fff', margin: 0, fontSize: '14px', fontWeight: 600 }}>Adv. Rajesh Kumar</p>
                  <p style={{ color: '#94a3b8', margin: 0, fontSize: '12px' }}>Consultant Advocate</p>
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Current Status</span>
              <p style={{ color: '#6c9cff', fontWeight: 700, margin: '4px 0', fontSize: '18px' }}>Document Verification</p>
            </div>
          </div>

          <div className="timeline-track">
            {MILESTONES.map((step, idx) => (
              <div key={step.id} className={`timeline-node ${step.status} fade-up`} style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className={`node-marker ${step.status}`} />
                <div className="node-content">
                  <span className="node-date">{step.date}</span>
                  <h3 className="node-title">{step.title}</h3>
                  <p className="node-desc">{step.desc}</p>
                  {step.actionLabel && (
                    <button className="view-btn" style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ExternalLink size={14} /> {step.actionLabel}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
    </>
  )
}
