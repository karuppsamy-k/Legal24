import { useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import '../dashboard/dashboard.css'
import { useAuth } from '../../../core/context/AuthContext'
import { LogOut } from 'lucide-react'
import TopBar from '../../../shared/components/organisms/TopBar'

const advocates = [
  { id: 1, name: 'Advocate Ravi Gupta', specialization: 'Criminal Law', cases: 8, status: 'Active', experience: '15 years', rating: '4.8' },
  { id: 2, name: 'Advocate Neha Sharma', specialization: 'Civil Law', cases: 12, status: 'Active', experience: '10 years', rating: '4.9' },
  { id: 3, name: 'Advocate Arun Patel', specialization: 'Corporate Law', cases: 5, status: 'Active', experience: '8 years', rating: '4.7' },
  { id: 4, name: 'Advocate Priya Singh', specialization: 'Family Law', cases: 14, status: 'Active', experience: '12 years', rating: '4.6' },
]

export default function AdvocatesPage() {
  const { sidebarOpen, setSidebarOpen } = useOutletContext()
  const { user } = useAuth();
  const navigate = useNavigate();

  const [advocateList, setAdvocateList] = useState(() => {
    const dynamicAdvocates = JSON.parse(localStorage.getItem('legal24_advocates') || '[]');
    const approvedDynamic = dynamicAdvocates.filter(a => a.status === 'approved');
    return [...approvedDynamic, ...advocates];
  });

  return (
    <>
      <TopBar 
        title="Registered Advocates"
        subtitle="ADVOCATE MANAGEMENT"
        isSidebarOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen(true)}
      />

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
            {advocateList.map((advocate) => (
              <div key={advocate.id} className="table-row">
                <div className="user-info">
                  <strong>{advocate.name}</strong>
                  <span>{advocate.specialization} • {advocate.experience}</span>
                </div>
                <div className="user-contact">
                  <span style={{ color: '#9aa6d2' }}>{advocate.cases || 0} Cases</span>
                </div>
                <div className="user-status">
                  <span style={{ color: '#ffd700', fontSize: '13px' }}>⭐ {advocate.rating || '5.0'}</span>
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
    </>
  )
}
