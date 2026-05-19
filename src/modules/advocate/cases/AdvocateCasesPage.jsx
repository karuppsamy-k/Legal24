import { useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
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
  LogOut
} from 'lucide-react'
import TopBar from '../../../shared/components/organisms/TopBar'
import './advocate_cases.css'
import '../dashboard/advocate_dashboard.css'

const MOCK_CASES = [
  { id: 'C-204', title: "Property Dispute - Sector 5", client: "Amit Kumar", type: "Civil", status: "In Progress", progress: 65, date: "16 May 2026" },
  { id: 'C-215', title: "Trademark Infringement", client: "Tech Corp", type: "Corporate", status: "Hearing Scheduled", progress: 40, date: "15 May 2026" },
  { id: 'C-198', title: "Employment Contract Review", client: "Sarah J.", type: "Labor", status: "Completed", progress: 80, date: "12 May 2026" },
  { id: 'C-220', title: "Divorce Settlement", client: "Rajesh M.", type: "Family", status: "Pending Response", progress: 20, date: "10 May 2026" },
  { id: 'C-225', title: "Criminal Defense - Theft", client: "Vijay S.", type: "Criminal", status: "In Progress", progress: 55, date: "08 May 2026" }
]

const navItems = [
  { label: 'Dashboard', id: 'advocate-dashboard', icon: <Clock size={18} /> },
  { label: 'My Cases', id: 'advocate-cases', icon: <Briefcase size={18} />, active: true },
  { label: 'Hearings', id: 'advocate-hearings', icon: <Calendar size={18} /> },
  { label: 'Documents', id: 'advocate-documents', icon: <FileText size={18} /> },
  { label: 'Communication', id: 'advocate-messages', icon: <MessageSquare size={18} /> }
]

export default function AdvocateCasesPage() {
  const { sidebarOpen, setSidebarOpen } = useOutletContext()
  const [activeFilter, setActiveFilter] = useState('All')
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleNavClick = (id) => {
    setSidebarOpen(false)
    navigate(`/${id}`)
  }

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout()
    }
  }

  return (
    <>
      <TopBar 
        title="My Cases"
        subtitle="Management"
        isSidebarOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen(true)}
      />

        <section className="cases-header-actions fade-up">
          <div className="search-bar">
            <Search size={18} />
            <input type="text" placeholder="Search by Case ID, Title or Client..." />
          </div>
          <button className="summary-action">
            <Plus size={18} /> New Case
          </button>
        </section>

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

        <div className="case-card-grid fade-up delay-2">
          {MOCK_CASES.filter(c => activeFilter === 'All' || c.type === activeFilter).map((caseItem, idx) => (
            <div key={caseItem.id} className="case-card">
              <div className="case-card-header">
                <span className="case-id">{caseItem.id}</span>
                <span className={`status-pill ${caseItem.status.toLowerCase().replace(' ', '-')}`}>{caseItem.status}</span>
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
                <button className="view-btn">View Details</button>
              </div>
            </div>
          ))}
        </div>
    </>
  )
}
