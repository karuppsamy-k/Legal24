import { useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import '../dashboard/dashboard.css'
import { useAuth } from '../../core/context/AuthContext'
import { LogOut } from 'lucide-react'
import TopBar from '../../shared/components/organisms/TopBar'

const pendingApplications = [
  { id: 1, name: 'Ravi Singh', type: 'Advocate', date: '19/01/2022', status: 'Pending', experience: '5 years' },
  { id: 2, name: 'Anya Sharma', type: 'Advocate', date: '18/03/2021', status: 'Pending', experience: '8 years' },
  { id: 3, name: 'Priya Patel', type: 'Advocate', date: '26/09/2021', status: 'Pending', experience: '3 years' },
  { id: 4, name: 'Rajesh Kumar', type: 'Advocate', date: '15/11/2021', status: 'Pending', experience: '12 years' },
]

export default function ApprovalPage() {
  const { sidebarOpen, setSidebarOpen } = useOutletContext()
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
    { label: 'Approval & Control', id: 'approval', active: true },
    { label: 'Manage Users', id: 'users' },
    { label: 'Manage Advocates', id: 'advocates' },
    { label: 'Reports & Analytics', id: 'reports' },
    { label: 'Feed Backs', id: 'feedbacks' },
  ]

  return (
    <>
      <TopBar 
        title="Pending Approvals"
        subtitle="APPROVAL & CONTROL"
        isSidebarOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen(true)}
      />

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
    </>
  )
}
