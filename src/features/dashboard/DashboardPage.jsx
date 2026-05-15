import { useState } from 'react'
import StatCard from '../../shared/components/organisms/StatCard.jsx'
import './dashboard.css'

const navItems = [
  { label: 'Dash Board', id: 'dashboard', active: true },
  { label: 'Approval & Control', id: 'approval' },
  { label: 'Manage Users', id: 'users' },
  { label: 'Manage Advocates', id: 'advocates' },
  { label: 'Reports & Analytics', id: 'reports' },
  { label: 'Feed Backs', id: 'feedbacks' },
]

const applications = [
  { name: 'Ravi Singh', date: '19/01/2022', status: 'Approve / Reject' },
  { name: 'Anya Sharma', date: '18/03/2021', status: 'Approve / Reject' },
  { name: 'Ravi Singh', date: '26/09/2021', status: 'Approve / Reject' },
]

const users = [
  { name: 'Maria Khan', status: 'Pending', detail: 'Registered: 08/23' },
  { name: 'David Chen', status: 'Paired', detail: 'Registered: 02/23' },
  { name: 'David Chen', status: 'Pending', detail: 'Registered: 03/23' },
]

const auditFeed = [
  { time: '10:05 AM', title: 'Advocate Gupta updated case #314', accent: 'blue' },
  { time: '09:58 AM', title: 'New client Sarah registered via mobile', accent: 'green' },
  { time: '09:42 AM', title: 'Admin approved Advocate Patel’s request', accent: 'green' },
  { time: '09:30 AM', title: 'Appointment scheduled for Case #301', accent: 'gray' },
  { time: '09:15 AM', title: 'New document uploaded for Case #298', accent: 'gray' },
  { time: '08:50 AM', title: 'Feed Back received from Client Lee', accent: 'gray' },
]

export default function DashboardPage({ onNavigate }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const closeSidebar = () => setSidebarOpen(false)

  const handleNavClick = (id) => {
    closeSidebar()
    if (onNavigate) {
      onNavigate(id)
    }
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
            <p className="topbar-small">Dash Board</p>
            <h1>Welcome back, Admin</h1>
          </div>
          <div className="topbar-actions">
            <button type="button" className="icon-button">🔔</button>
            <button type="button" className="icon-button">⚙️</button>
            <button type="button" className="profile-button">Profile</button>
          </div>
        </div>

        <section className="dashboard-overview">
          <div className="overview-cards">
            <StatCard title="Active Advocates" value="42" detail="+5% from yesterday" badge="Active" />
            <StatCard title="Active Users" value="187" detail="+12% from last week" badge="Users" />
            <StatCard title="Active Cases" value="314" detail="+1% stable" badge="Cases" />
          </div>

          <div className="overview-summary fade-up delay-1">
            <div className="summary-header">
              <div>
                <span className="dashboard-subtitle">Realtime monitoring</span>
                <h2>System Pulse</h2>
              </div>
              <button type="button" className="summary-action">View report</button>
            </div>
            <div className="summary-info">
              <div>
                <strong>24</strong>
                <span>Active court cases</span>
              </div>
              <div>
                <strong>12</strong>
                <span>Pending approvals</span>
              </div>
            </div>
            <div className="summary-graph">
              <span className="summary-bar bar-1" />
              <span className="summary-bar bar-2" />
              <span className="summary-bar bar-3" />
              <span className="summary-bar bar-4" />
            </div>
          </div>
        </section>

        <section className="dashboard-grid">
          <article className="panel panel-chart fade-up delay-2">
            <div className="panel-header">
              <div>
                <h2>New Cases and Client Onboarding</h2>
                <p>Case volume, civil vs criminal, and onboarding trends.</p>
              </div>
              <div className="legend-row">
                <span className="legend legend-civil">Civil</span>
                <span className="legend legend-criminal">Criminal</span>
              </div>
            </div>
            <div className="chart-card">
              <div className="chart-grid">
                <div className="chart-line chart-line-1" />
                <div className="chart-line chart-line-2" />
                <div className="chart-line chart-line-3" />
                <div className="chart-line chart-line-4" />
              </div>
              <div className="chart-axis">
                <span>0</span>
                <span>Third</span>
                <span>Wed</span>
                <span>Thira</span>
                <span>Wone</span>
              </div>
            </div>
          </article>

          <aside className="panel panel-feed fade-up delay-3">
            <div className="panel-header">
              <div>
                <h2>Real-time System Audit Feed</h2>
                <p>Latest activity from the platform and approvals.</p>
              </div>
            </div>
            <div className="feed-list">
              {auditFeed.map((item) => (
                <div key={item.time + item.title} className="feed-item">
                  <span className={`feed-dot ${item.accent}`} />
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="dashboard-lower-grid">
          <article className="panel panel-applications fade-up delay-4">
            <div className="panel-header">
              <div>
                <h2>Recent Advocate Applications</h2>
                <p>Approval flow</p>
              </div>
            </div>
            <div className="table-grid">
              {applications.map((item) => (
                <div key={item.name + item.date} className="table-row">
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.date}</span>
                  </div>
                  <button>{item.status}</button>
                </div>
              ))}
            </div>
          </article>

          <article className="panel panel-users fade-up delay-5">
            <div className="panel-header">
              <div>
                <h2>Recent New Users</h2>
                <p>User management</p>
              </div>
            </div>
            <div className="table-grid">
              {users.map((item) => (
                <div key={item.name + item.status} className="table-row">
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.detail}</span>
                  </div>
                  <div className={`status-pill ${item.status.toLowerCase()}`}>
                    {item.status}
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="panel panel-reports fade-up delay-6">
            <div className="panel-header">
              <div>
                <h2>Critical Feed Backs & Reports</h2>
                <p>Analytics / Support</p>
              </div>
            </div>
            <div className="report-list">
              <div className="report-card report-high">
                <strong>Client Lee: Report of access issue</strong>
                <span>High priority</span>
                <div className="report-actions">
                  <button>Go to Reports</button>
                  <button className="outline">Resolve</button>
                </div>
              </div>
              <div className="report-card report-warning">
                <strong>Monthly report generated</strong>
                <span>Download</span>
                <div className="report-actions">
                  <button>Go to Reports</button>
                  <button className="outline">Resolve</button>
                </div>
              </div>
            </div>
          </article>
        </section>
      </main>
    </div>
  )
}
