import { useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { useAuth } from '../../core/context/AuthContext'
import { 
  FileText, 
  Folder, 
  Upload, 
  Search, 
  MoreVertical, 
  Download, 
  Trash2,
  Clock,
  Briefcase,
  Calendar,
  MessageSquare,
  LogOut,
  Bell,
  Settings,
  HardDrive,
  FolderOpen
} from 'lucide-react'
import TopBar from '../../shared/components/organisms/TopBar'
import './advocate_documents.css'
import '../advocate_dashboard/advocate_dashboard.css'

const MOCK_DOCS = [
  { id: 1, name: "Case_Affidavit_V1.pdf", type: "PDF", size: "1.2 MB", date: "16 May 2026" },
  { id: 2, name: "Evidence_Photos.zip", type: "ZIP", size: "45 MB", date: "15 May 2026" },
  { id: 3, name: "Court_Order_Notice.pdf", type: "PDF", size: "850 KB", date: "14 May 2026" },
  { id: 4, name: "Client_Identification.jpg", type: "JPG", size: "2.4 MB", date: "12 May 2026" },
  { id: 5, name: "Contract_Draft_Final.docx", type: "DOCX", size: "420 KB", date: "10 May 2026" },
  { id: 6, name: "Witness_Statements.pdf", type: "PDF", size: "3.1 MB", date: "08 May 2026" }
]

export default function AdvocateDocumentsPage() {
  const { sidebarOpen, setSidebarOpen } = useOutletContext()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout()
    }
  }

  return (
    <>
      <TopBar 
        title="Document Management"
        subtitle="Repository"
        isSidebarOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen(true)}
      />

        <div className="advocate-grid">
          <section className="docs-main-panel fade-up">
            <div className="search-bar" style={{ marginBottom: '24px', maxWidth: '100%' }}>
              <Search size={18} />
              <input type="text" placeholder="Search for documents..." />
            </div>

            <div className="docs-grid">
              {MOCK_DOCS.map((doc, idx) => (
                <div key={doc.id} className="doc-card fade-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                  <div className="doc-icon">
                    <FileText size={24} />
                  </div>
                  <h4>{doc.name}</h4>
                  <div className="doc-meta">
                    <span>{doc.size}</span>
                    <span>{doc.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="docs-sidebar-section fade-up delay-1">
            <div className="storage-info advocate-panel">
              <div className="panel-header" style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <HardDrive size={18} color="#6c9cff" />
                  <h3 style={{ margin: 0, fontSize: '16px' }}>Storage</h3>
                </div>
              </div>
              <div className="storage-bar">
                <div className="storage-fill" />
              </div>
              <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>4.5 GB of 10 GB used</p>
            </div>

            <div className="advocate-panel">
              <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>Folders</h3>
              <div className="folder-list">
                <div className="folder-item active"><Folder size={18} /> All Documents</div>
                <div className="folder-item"><Folder size={18} /> Case Filings</div>
                <div className="folder-item"><Folder size={18} /> Evidence Files</div>
                <div className="folder-item"><Folder size={18} /> Legal Templates</div>
              </div>
            </div>
          </aside>
        </div>
    </>
  )
}
