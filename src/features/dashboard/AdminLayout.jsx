import { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../core/context/AuthContext'
import Sidebar from '../../shared/components/organisms/Sidebar'
import NotificationDrawer from '../../shared/components/organisms/NotificationDrawer'
import { LayoutDashboard, ShieldCheck, Users, Briefcase, BarChart3, MessageCircle, Settings } from 'lucide-react'
import '../dashboard/dashboard.css'

const navItems = [
  { label: 'Dash Board', id: 'admin-dashboard', icon: <LayoutDashboard size={18} /> },
  { label: 'Approval & Control', id: 'approval', icon: <ShieldCheck size={18} /> },
  { label: 'Manage Users', id: 'users', icon: <Users size={18} /> },
  { label: 'Manage Advocates', id: 'advocates', icon: <Briefcase size={18} /> },
  { label: 'Reports & Analytics', id: 'reports', icon: <BarChart3 size={18} /> },
  { label: 'Feed Backs', id: 'feedbacks', icon: <MessageCircle size={18} /> },
  { label: 'Settings', id: 'settings', icon: <Settings size={18} /> },
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const activeId = location.pathname.substring(1) || 'admin-dashboard'

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
    <div className="dashboard-shell">
      <Sidebar 
        brandSub="Admin Portal"
        user={user}
        navItems={navItems}
        onNavClick={handleNavClick}
        onLogout={handleLogout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeId={activeId}
      />
      
      <main className="dashboard-main">
        <Outlet context={{ setSidebarOpen, sidebarOpen }} />
      </main>

      <NotificationDrawer />
    </div>
  )
}
