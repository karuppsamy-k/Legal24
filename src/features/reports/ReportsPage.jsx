import { useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import '../dashboard/dashboard.css'
import { useAuth } from '../../core/context/AuthContext'
import { LogOut, FileText, Download, TrendingUp, Users, Briefcase } from 'lucide-react'
import TopBar from '../../shared/components/organisms/TopBar'

export default function ReportsPage() {
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
    { label: 'Approval & Control', id: 'approval' },
    { label: 'Manage Users', id: 'users' },
    { label: 'Manage Advocates', id: 'advocates' },
    { label: 'Reports & Analytics', id: 'reports', active: true },
    { label: 'Feed Backs', id: 'feedbacks' },
  ]

  return (
    <>
      <TopBar 
        title="Reports & Analytics"
        subtitle="PLATFORM DATA"
        isSidebarOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen(true)}
      />

        <section className="dashboard-overview">
          <div className="overview-cards">
            <div style={{ padding: '26px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ color: '#9aa6d2', fontSize: '14px' }}>Total Cases</span>
                <span style={{ padding: '4px 8px', background: 'rgba(76, 225, 177, 0.16)', color: '#4ce1b1', borderRadius: '4px', fontSize: '12px' }}>+8%</span>
              </div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#eef2ff', marginBottom: '8px' }}>1,247</div>
              <div style={{ color: '#9aa6d2', fontSize: '13px' }}>Across all advocates</div>
            </div>
            <div style={{ padding: '26px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ color: '#9aa6d2', fontSize: '14px' }}>Resolved Cases</span>
                <span style={{ padding: '4px 8px', background: 'rgba(76, 225, 177, 0.16)', color: '#4ce1b1', borderRadius: '4px', fontSize: '12px' }}>+12%</span>
              </div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#eef2ff', marginBottom: '8px' }}>892</div>
              <div style={{ color: '#9aa6d2', fontSize: '13px' }}>Success rate: 71.5%</div>
            </div>
            <div style={{ padding: '26px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ color: '#9aa6d2', fontSize: '14px' }}>Pending Cases</span>
                <span style={{ padding: '4px 8px', background: 'rgba(255, 214, 138, 0.16)', color: '#ffd68a', borderRadius: '4px', fontSize: '12px' }}>-3%</span>
              </div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#eef2ff', marginBottom: '8px' }}>355</div>
              <div style={{ color: '#9aa6d2', fontSize: '13px' }}>Under review</div>
            </div>
          </div>
        </section>

        <section className="dashboard-grid">
          <article className="panel fade-up" style={{ gridColumn: '1 / -1' }}>
            <div className="panel-header">
              <div>
                <h2>Monthly Case Statistics</h2>
                <p>Case resolution trends and performance metrics</p>
              </div>
              <button type="button" style={{ padding: '8px 16px', background: '#6c9cff', border: 'none', borderRadius: '6px', color: '#fff', cursor: 'pointer' }}>📥 Export Report</button>
            </div>
            <div style={{ padding: '24px', color: '#9aa6d2', textAlign: 'center', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div>📊 Chart will display here with real-time case metrics</div>
            </div>
          </article>
        </section>
    </>
  )
}
