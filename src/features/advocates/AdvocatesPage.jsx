import { useState } from 'react'
import '../dashboard/dashboard.css'
import { useAuth } from '../../core/context/AuthContext'
import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const advocates = [
  { id: 1, name: 'Advocate Ravi Gupta', specialization: 'Criminal Law', cases: 8, status: 'Active', experience: '15 years', rating: '4.8' },
  { id: 2, name: 'Advocate Neha Sharma', specialization: 'Civil Law', cases: 12, status: 'Active', experience: '10 years', rating: '4.9' },
  { id: 3, name: 'Advocate Arun Patel', specialization: 'Corporate Law', cases: 5, status: 'Active', experience: '8 years', rating: '4.7' },
  { id: 4, name: 'Advocate Priya Singh', specialization: 'Family Law', cases: 14, status: 'Active', experience: '12 years', rating: '4.6' },
]

export default function AdvocatesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const closeSidebar = () => setSidebarOpen(false)

  const handleNavClick = (id) => {
    closeSidebar()
    navigate(`/${id}`)
  }

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  }

  const navItems = [
    { label: 'Dash Board', id: 'admin-dashboard' },
    { label: 'Approval & Control', id: 'approval' },
    { label: 'Manage Users', id: 'users' },
    { label: 'Manage Advocates', id: 'advocates', active: true },
    { label: 'Reports & Analytics', id: 'reports' },
    { label: 'Feed Backs', id: 'feedbacks' },
  ]

  return (
    <div className="dashboard-shell">
      <div className="sidebar-overlay" style={{ display: sidebarOpen ? 'block' : 'none' }} onClick={closeSidebar} />
      
      <aside className="dashboard-sidebar" style={{ transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)' }}>
        <div className="sidebar-brand">
          <span className="brand-mark">L</span>
          <div>
            <strong>LEGAL 24</strong>
            <span>{user?.name || 'Admin'}</span>
          </div>
          <button className="sidebar-close-btn" onClick={closeSidebar} aria-label="Close sidebar">✕</button>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item${item.active ? ' active' : ''}`}
              type="button"
              onClick={() => handleNavClick(item.id)}
            >
              <span className="nav-icon" />
              {item.label}
            </button>
          ))}

          <button
            className="nav-item nav-logout"
            type="button"
            onClick={handleLogout}
          >
            <LogOut size={18} style={{ marginRight: '12px' }} />
            Logout
          </button>
        </nav>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-topbar">
          {!sidebarOpen && (
            <button
              className="hamburger-btn"
              onClick={() => setSidebarOpen(true)}
              type="button"
            >
              ☰
            </button>
          )}
          <div className="topbar-titles">
            <p className="topbar-small">ADVOCATE MANAGEMENT</p>
            <h1>Registered Advocates</h1>
          </div>
          <div className="topbar-actions">
            <button type="button" className="icon-button">🔔</button>
            <button type="button" className="icon-button">⚙️</button>
            <button type="button" className="profile-button">Profile</button>
          </div>
        </div>

        <section className="dashboard-grid fade-up">
          <article className="panel" style={{ gridColumn: '1 / -1' }}>
            <div className="panel-header">
              <div>
                <h2>Advocate Directory</h2>
                <p>Monitor and manage verified legal professionals</p>
              </div>
              <button type="button" style={{ padding: '8px 16px', background: '#6c9cff', border: 'none', borderRadius: '6px', color: '#fff', cursor: 'pointer' }}>+ Add Advocate</button>
            </div>
            <div className="table-grid">
              {advocates.map((advocate) => (
                <div key={advocate.id} className="table-row">
                  <div className="user-info">
                    <strong>{advocate.name}</strong>
                    <span>{advocate.specialization} • {advocate.experience}</span>
                  </div>
                  <div className="user-contact">
                    <span style={{ color: '#9aa6d2' }}>{advocate.cases} Cases</span>
                  </div>
                  <div className="user-status">
                    <span style={{ color: '#ffd700', fontSize: '13px' }}>⭐ {advocate.rating}</span>
                  </div>
                  <div className="user-actions" style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ flex: 1, padding: '8px 12px', background: 'rgba(108, 156, 255, 0.16)', color: '#7fb2ff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Profile</button>
                    <button style={{ flex: 1, padding: '8px 12px', background: 'rgba(76, 225, 177, 0.16)', color: '#4ce1b1', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Verify</button>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>
      </main>
    </div>
  )
}
