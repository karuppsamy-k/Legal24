import { useState } from 'react'
import '../dashboard/dashboard.css'

const feedbacks = [
  { id: 1, user: 'Client Lee', message: 'Access issue on mobile app', priority: 'High', date: '2024-01-19', status: 'Open' },
  { id: 2, user: 'Sarah Johnson', message: 'Excellent service and support', priority: 'Low', date: '2024-01-18', status: 'Resolved' },
  { id: 3, user: 'Aditya Kumar', message: 'Document upload feature needs improvement', priority: 'Medium', date: '2024-01-17', status: 'In Progress' },
  { id: 4, user: 'Maria Garcia', message: 'Case tracking is very useful', priority: 'Low', date: '2024-01-16', status: 'Resolved' },
  { id: 5, user: 'David Chen', message: 'Request for email notification preferences', priority: 'Medium', date: '2024-01-15', status: 'Open' },
]

export default function FeedbacksPage({ onNavigate }) {
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
    { label: 'Manage Advocates', id: 'advocates' },
    { label: 'Reports & Analytics', id: 'reports' },
    { label: 'Feed Backs', id: 'feedbacks', active: true },
  ]

  const getPriorityColor = (priority) => {
    const colors = {
      'High': { bg: 'rgba(255, 87, 87, 0.16)', text: '#ff9999' },
      'Medium': { bg: 'rgba(255, 214, 138, 0.16)', text: '#ffd68a' },
      'Low': { bg: 'rgba(108, 156, 255, 0.16)', text: '#7fb2ff' },
    }
    return colors[priority] || colors.Low
  }

  const getStatusColor = (status) => {
    const colors = {
      'Open': { bg: 'rgba(108, 156, 255, 0.16)', text: '#7fb2ff' },
      'In Progress': { bg: 'rgba(255, 214, 138, 0.16)', text: '#ffd68a' },
      'Resolved': { bg: 'rgba(76, 225, 177, 0.16)', text: '#4ce1b1' },
    }
    return colors[status] || colors.Open
  }

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
            <p className="topbar-small">FEEDBACK & SUPPORT</p>
            <h1>User Feedbacks</h1>
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
                <h2>All Feedbacks & Reports</h2>
                <p>Manage user feedback and feature requests</p>
              </div>
            </div>
            <div className="table-grid">
              {feedbacks.map((feedback) => (
                <div key={feedback.id} className="table-row" style={{ gap: '24px' }}>
                  <div style={{ flex: 1.5 }}>
                    <strong>{feedback.user}</strong>
                    <span>{feedback.message}</span>
                  </div>
                  <div>
                    <div style={{ 
                      padding: '4px 12px', 
                      background: getPriorityColor(feedback.priority).bg, 
                      color: getPriorityColor(feedback.priority).text, 
                      borderRadius: '4px', 
                      fontSize: '13px' 
                    }}>
                      {feedback.priority}
                    </div>
                  </div>
                  <div>
                    <div style={{ 
                      padding: '4px 12px', 
                      background: getStatusColor(feedback.status).bg, 
                      color: getStatusColor(feedback.status).text, 
                      borderRadius: '4px', 
                      fontSize: '13px' 
                    }}>
                      {feedback.status}
                    </div>
                  </div>
                  <div style={{ color: '#9aa6d2', fontSize: '13px' }}>
                    {feedback.date}
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ padding: '6px 12px', background: 'rgba(108, 156, 255, 0.16)', color: '#7fb2ff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>View</button>
                    {feedback.status !== 'Resolved' && (
                      <button style={{ padding: '6px 12px', background: 'rgba(76, 225, 177, 0.16)', color: '#4ce1b1', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Mark Done</button>
                    )}
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
