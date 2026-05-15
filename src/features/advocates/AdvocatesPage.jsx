import { useState } from 'react'
import '../dashboard/dashboard.css'

const advocates = [
  { id: 1, name: 'Advocate Ravi Gupta', specialization: 'Criminal Law', cases: 8, status: 'Active', experience: '15 years', rating: '4.8' },
  { id: 2, name: 'Advocate Neha Sharma', specialization: 'Civil Law', cases: 12, status: 'Active', experience: '10 years', rating: '4.9' },
  { id: 3, name: 'Advocate Arun Patel', specialization: 'Corporate Law', cases: 5, status: 'Active', experience: '8 years', rating: '4.7' },
  { id: 4, name: 'Advocate Priya Singh', specialization: 'Family Law', cases: 14, status: 'Active', experience: '12 years', rating: '4.6' },
]

export default function AdvocatesPage({ onNavigate }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const closeSidebar = () => setSidebarOpen(false)

  const handleNavClick = (id) => {
    closeSidebar()
    onNavigate(id)
  }

  const navItems = [
    { label: 'Dash Board', id: 'dashboard' },
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
            <p className="topbar-small">ADVOCATE MANAGEMENT</p>
            <h1>Our Advocates</h1>
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
                <h2>Advocates Directory</h2>
                <p>Manage advocate profiles and assignments</p>
              </div>
            </div>
            <div className="table-grid">
              {advocates.map((advocate) => (
                <div key={advocate.id} className="table-row" style={{ gap: '24px' }}>
                  <div style={{ flex: 1.5 }}>
                    <strong>{advocate.name}</strong>
                    <span>{advocate.specialization}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{ color: '#9aa6d2' }}>Exp: {advocate.experience}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{ color: '#9aa6d2' }}>Cases: {advocate.cases}</span>
                  </div>
                  <div style={{ flex: 0.8 }}>
                    <span style={{ color: '#ffd68a' }}>★ {advocate.rating}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ padding: '6px 12px', background: 'rgba(108, 156, 255, 0.16)', color: '#7fb2ff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>View</button>
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
