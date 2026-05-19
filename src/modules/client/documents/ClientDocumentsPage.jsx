import { useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../core/context/AuthContext'
import { 
  FileText, 
  Upload, 
  CloudUpload, 
  Search, 
  Download, 
  Trash2, 
  LayoutDashboard,
  Calendar,
  Activity,
  CreditCard,
  LogOut,
  Bell,
  MessageSquare,
  FileCheck,
  Clock
} from 'lucide-react'
import TopBar from '../../../shared/components/organisms/TopBar'
import './client_documents.css'
import '../dashboard/client_dashboard.css'
import '../../advocate/dashboard/advocate_dashboard.css'

const CLIENT_DOCS = [
  { id: 1, name: "ID_Proof_Aadhar.pdf", type: "PDF", date: "10 May 2026", status: "Verified" },
  { id: 2, name: "Property_Tax_Receipt.pdf", type: "PDF", date: "11 May 2026", status: "Verified" },
  { id: 3, name: "Sale_Deed_Copy.pdf", type: "PDF", date: "12 May 2026", status: "Pending Review" },
  { id: 4, name: "Encumbrance_Certificate.pdf", type: "PDF", date: "15 May 2026", status: "Uploaded" }
]

const navItems = [
  { label: 'Dashboard', id: 'client-dashboard', icon: <LayoutDashboard size={18} /> },
  { label: 'My Cases', id: 'client-cases', icon: <Activity size={18} /> },
  { label: 'Consultations', id: 'client-consultations', icon: <Calendar size={18} /> },
  { label: 'Documents', id: 'client-documents', icon: <FileText size={18} />, active: true },
  { label: 'Payments', id: 'client-payments', icon: <CreditCard size={18} /> }
]

export default function ClientDocumentsPage() {
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
        title="My Documents"
        subtitle="Management"
        isSidebarOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen(true)}
      />

        <section className="upload-zone fade-up">
          <div className="upload-icon">
            <CloudUpload size={32} />
          </div>
          <h3>Upload Legal Documents</h3>
          <p>Drag and drop your files here or click to browse. (Max 50MB, PDF/JPG/PNG)</p>
          <button className="summary-action" style={{ marginTop: '8px' }}>Select Files</button>
        </section>

        <div className="panel-header" style={{ marginBottom: '20px' }}>
          <h2>Uploaded Files</h2>
          <div className="search-bar" style={{ maxWidth: '300px' }}>
            <Search size={16} />
            <input type="text" placeholder="Search files..." />
          </div>
        </div>

        <div className="client-docs-grid">
          {CLIENT_DOCS.map((doc, idx) => (
            <div key={doc.id} className="client-doc-card fade-up" style={{ animationDelay: `${idx * 0.05}s` }}>
              <div className="doc-type-icon">
                <FileText size={24} />
              </div>
              <div className="doc-info">
                <h4>{doc.name}</h4>
                <span>{doc.date}</span>
                <span className={`doc-status ${doc.status.toLowerCase().includes('pending') ? 'pending' : ''}`}>
                  {doc.status === 'Verified' ? <FileCheck size={12} style={{ display: 'inline', marginRight: '4px' }} /> : ''}
                  {doc.status}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button className="icon-only" style={{ width: '32px', height: '32px' }}><Download size={14} /></button>
                <button className="icon-only" style={{ width: '32px', height: '32px', color: '#f87171' }}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
    </>
  )
}
