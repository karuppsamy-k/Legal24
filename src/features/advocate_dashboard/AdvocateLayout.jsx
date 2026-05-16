import { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../core/context/AuthContext'
import Sidebar from '../../shared/components/organisms/Sidebar'
import { Clock, Briefcase, Calendar, FileText, MessageSquare } from 'lucide-react'
import './advocate_dashboard.css'

const navItems = [
  { label: 'Dashboard', id: 'advocate-dashboard', icon: <Clock size={18} /> },
  { label: 'My Cases', id: 'advocate-cases', icon: <Briefcase size={18} /> },
  { label: 'Hearings', id: 'advocate-hearings', icon: <Calendar size={18} /> },
  { label: 'Documents', id: 'advocate-documents', icon: <FileText size={18} /> },
  { label: 'Communication', id: 'advocate-messages', icon: <MessageSquare size={18} /> }
]

export default function AdvocateLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const activeId = location.pathname.split('/')[1] || 'advocate-dashboard'

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
    <div className="advocate-dashboard-shell">
      <Sidebar 
        brandSub="Advocate Portal"
        user={user}
        navItems={navItems}
        onNavClick={handleNavClick}
        onLogout={handleLogout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeId={activeId}
      />
      
      <main className="advocate-main">
        <Outlet context={{ setSidebarOpen, sidebarOpen }} />
      </main>
    </div>
  )
}
