import { useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import '../dashboard/dashboard.css'
import { useAuth } from '../../../core/context/AuthContext'
import { LogOut } from 'lucide-react'
import TopBar from '../../../shared/components/organisms/TopBar'

const pendingApplications = [
  { id: 1, name: 'Ravi Singh', type: 'Advocate', date: '19/01/2022', status: 'Pending', experience: '5 years', specialization: 'Criminal Law', barCouncilId: 'BCI/6523/2016', practiceCourts: 'District Court' },
  { id: 2, name: 'Anya Sharma', type: 'Advocate', date: '18/03/2021', status: 'Pending', experience: '8 years', specialization: 'Corporate Law', barCouncilId: 'BCI/1094/2013', practiceCourts: 'High Court' },
  { id: 3, name: 'Priya Patel', type: 'Advocate', date: '26/09/2021', status: 'Pending', experience: '3 years', specialization: 'Family Law', barCouncilId: 'BCI/7412/2019', practiceCourts: 'Family Court' },
  { id: 4, name: 'Rajesh Kumar', type: 'Advocate', date: '15/11/2021', status: 'Pending', experience: '12 years', specialization: 'Property Law', barCouncilId: 'BCI/3218/2009', practiceCourts: 'Supreme Court' },
]

export default function ApprovalPage() {
  const { sidebarOpen, setSidebarOpen } = useOutletContext()
  const { user } = useAuth();
  const navigate = useNavigate();

  const [apps, setApps] = useState(() => {
    const dynamicAdvocates = JSON.parse(localStorage.getItem('legal24_advocates') || '[]');
    const pendingDynamic = dynamicAdvocates.filter(a => a.status === 'pending');
    return [...pendingDynamic, ...pendingApplications];
  });

  const handleApprove = (app) => {
    if (app.email) {
      // 1. Update in legal24_advocates list
      const dynamicAdvocates = JSON.parse(localStorage.getItem('legal24_advocates') || '[]');
      const updatedAdvs = dynamicAdvocates.map(a => {
        if (a.email === app.email) {
          return { ...a, status: 'approved' };
        }
        return a;
      });
      localStorage.setItem('legal24_advocates', JSON.stringify(updatedAdvs));

      // 2. Update in legal24_users list
      const registeredUsers = JSON.parse(localStorage.getItem('legal24_users') || '[]');
      const updatedUsers = registeredUsers.map(u => {
        if (u.email === app.email) {
          return { ...u, status: 'approved' };
        }
        return u;
      });
      localStorage.setItem('legal24_users', JSON.stringify(updatedUsers));
    }

    setApps(prev => prev.filter(item => item.id !== app.id));
    alert(`${app.name} has been approved.`);
  };

  const handleReject = (app) => {
    if (app.email) {
      const dynamicAdvocates = JSON.parse(localStorage.getItem('legal24_advocates') || '[]');
      const updatedAdvs = dynamicAdvocates.map(a => {
        if (a.email === app.email) {
          return { ...a, status: 'rejected' };
        }
        return a;
      });
      localStorage.setItem('legal24_advocates', JSON.stringify(updatedAdvs));

      const registeredUsers = JSON.parse(localStorage.getItem('legal24_users') || '[]');
      const updatedUsers = registeredUsers.map(u => {
        if (u.email === app.email) {
          return { ...u, status: 'rejected' };
        }
        return u;
      });
      localStorage.setItem('legal24_users', JSON.stringify(updatedUsers));
    }

    setApps(prev => prev.filter(item => item.id !== app.id));
    alert(`${app.name} has been rejected.`);
  };

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
            {apps.length > 0 ? (
              apps.map((app) => (
                <div key={app.id} className="table-row" style={{ gap: '24px', alignItems: 'center', padding: '16px' }}>
                  <div style={{ flex: 2 }}>
                    <strong style={{ fontSize: '15px', color: 'var(--text-heading)', display: 'block' }}>{app.name}</strong>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>
                      {app.type || 'Advocate'} • {app.specialization || 'General Practice'} • {app.experience}
                    </span>
                    <div style={{ marginTop: '8px', display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                      <span><strong>Bar Council ID:</strong> {app.barCouncilId || 'BCI-PENDING'}</span>
                      <span><strong>Courts:</strong> {app.practiceCourts || 'District Court'}</span>
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{ color: '#9aa6d2', fontSize: '13px' }}>Applied: {app.date}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button 
                      onClick={() => handleApprove(app)} 
                      style={{ padding: '8px 16px', border: 'none', borderRadius: '6px', background: 'rgba(76, 225, 177, 0.16)', color: '#b9ffe5', cursor: 'pointer', fontWeight: '600' }}
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleReject(app)} 
                      style={{ padding: '8px 16px', border: 'none', borderRadius: '6px', background: 'rgba(255, 87, 87, 0.16)', color: '#ff9999', cursor: 'pointer', fontWeight: '600' }}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: '40px', textAlignment: 'center', color: 'var(--text-muted)' }}>
                No pending advocate applications found.
              </div>
            )}
          </div>
        </article>
      </section>
    </>
  )
}
