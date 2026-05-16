import { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../core/context/AuthContext'
import Sidebar from '../../shared/components/organisms/Sidebar'
import { LayoutDashboard, Activity, Calendar, FileText, CreditCard } from 'lucide-react'
import './client_dashboard.css'
import '../advocate_dashboard/advocate_dashboard.css'

const navItems = [
  { label: 'Dashboard', id: 'client-dashboard', icon: <LayoutDashboard size={18} /> },
  { label: 'My Cases', id: 'client-cases', icon: <Activity size={18} /> },
  { label: 'Consultations', id: 'client-consultations', icon: <Calendar size={18} /> },
  { label: 'Documents', id: 'client-documents', icon: <FileText size={18} /> },
  { label: 'Payments', id: 'client-payments', icon: <CreditCard size={18} /> }
]

export default function ClientLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const activeId = location.pathname.split('/')[1] || 'client-dashboard'

  const handleNavClick = (id) => {
    setSidebarOpen(false)
    navigate(`/${id}`)
  }

  return (
    <div className="client-dashboard-shell">
      <Sidebar 
        brandSub="Client Portal"
        user={user}
        navItems={navItems}
        onNavClick={handleNavClick}
        onLogout={logout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeId={activeId}
      />
      
      <main className="client-main">
        <Outlet context={{ setSidebarOpen, sidebarOpen }} />
      </main>
    </div>
  )
}
