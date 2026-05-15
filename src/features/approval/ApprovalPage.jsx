import { useState } from 'react'
import '../dashboard/dashboard.css'

const pendingApplications = [
  { id: 1, name: 'Ravi Singh', type: 'Advocate', date: '19/01/2022', status: 'Pending', experience: '5 years' },
  { id: 2, name: 'Anya Sharma', type: 'Advocate', date: '18/03/2021', status: 'Pending', experience: '8 years' },
  { id: 3, name: 'Priya Patel', type: 'Advocate', date: '26/09/2021', status: 'Pending', experience: '3 years' },
  { id: 4, name: 'Rajesh Kumar', type: 'Advocate', date: '15/11/2021', status: 'Pending', experience: '12 years' },
]

export default function ApprovalPage({ onNavigate }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const closeSidebar = () => setSidebarOpen(false)

  const handleNavClick = (id) => {
    closeSidebar()
    onNavigate(id)
  }

  const navItems = [
    { label: 'Dash Board', id: 'dashboard' },
    { label: 'Approval & Control', id: 'approval', active: true },
    { label: 'Manage Users', id: 'users' },
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
            <span>UserName</span>
          </div>
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
        </nav>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-topbar">
          <button
            className="hamburger-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            type="button"
          >
            ☰
          </button>
          <div>
            <p className="topbar-small">APPROVAL & CONTROL</p>
            <h1>Pending Approvals</h1>
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
                <h2>Pending Advocate Applications</h2>
                <p>Review and approve new advocate registrations</p>
              </div>
            </div>
            <div className="table-grid">
              {pendingApplications.map((app) => (
                <div key={app.id} className="table-row" style={{ gap: '24px' }}>
                  <div style={{ flex: 1 }}>
                    <strong>{app.name}</strong>
                    <span>{app.type} • {app.experience}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{ color: '#9aa6d2' }}>Applied: {app.date}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{ background: 'rgba(76, 225, 177, 0.16)', color: '#b9ffe5' }}>Approve</button>
                    <button style={{ background: 'rgba(255, 87, 87, 0.16)', color: '#ff9999' }}>Reject</button>
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
