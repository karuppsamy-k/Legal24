import { useState } from 'react'
import '../dashboard/dashboard.css'
import { useAuth } from '../../core/context/AuthContext'
import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const users = [
  { id: 1, name: 'Maria Khan', email: 'maria@example.com', status: 'Active', joined: '08/2023', phone: '+91-9876543210' },
  { id: 2, name: 'David Chen', email: 'david@example.com', status: 'Active', joined: '02/2023', phone: '+91-8765432109' },
  { id: 3, name: 'Sarah Lee', email: 'sarah@example.com', status: 'Inactive', joined: '03/2023', phone: '+91-7654321098' },
  { id: 4, name: 'Aditya Verma', email: 'aditya@example.com', status: 'Active', joined: '07/2023', phone: '+91-6543210987' },
]

export default function UsersPage() {
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
    { label: 'Manage Users', id: 'users', active: true },
    { label: 'Manage Advocates', id: 'advocates' },
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
            <p className="topbar-small">USER MANAGEMENT</p>
            <h1>All Users</h1>
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
                <h2>User Directory</h2>
                <p>Manage and monitor all registered users</p>
              </div>
              <button type="button" style={{ padding: '8px 16px', background: '#6c9cff', border: 'none', borderRadius: '6px', color: '#fff', cursor: 'pointer' }}>+ Add User</button>
            </div>
            <div className="table-grid">
              {users.map((user) => (
                <div key={user.id} className="table-row">
                  <div className="user-info">
                    <strong>{user.name}</strong>
                    <span>{user.email}</span>
                  </div>
                  <div className="user-contact">
                    <span style={{ color: '#9aa6d2' }}>{user.phone}</span>
                  </div>
                  <div className="user-status">
                    <div style={{ 
                      padding: '4px 12px', 
                      background: user.status === 'Active' ? 'rgba(76, 225, 177, 0.16)' : 'rgba(155, 155, 155, 0.16)', 
                      color: user.status === 'Active' ? '#4ce1b1' : '#9aa6d2', 
                      borderRadius: '4px', 
                      fontSize: '13px',
                      display: 'inline-block'
                    }}>
                      {user.status}
                    </div>
                  </div>
                  <div className="user-actions" style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ flex: 1, padding: '8px 12px', background: 'rgba(108, 156, 255, 0.16)', color: '#7fb2ff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Edit</button>
                    <button style={{ flex: 1, padding: '8px 12px', background: 'rgba(255, 87, 87, 0.16)', color: '#ff9999', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Remove</button>
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
