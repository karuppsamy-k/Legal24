import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useAuth } from '../../../core/context/AuthContext'
import TopBar from '../../../shared/components/organisms/TopBar'
import { PhoneCall, CheckCircle } from 'lucide-react'

export default function AdvocateInstantConsultationsPage() {
  const { sidebarOpen, setSidebarOpen } = useOutletContext()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('active') // 'active', 'completed'
  const [history, setHistory] = useState([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('legal24_instant_requests') || '[]')
    // Filter for requests handled by THIS advocate
    const handledByMe = stored.filter(req => req.handledBy === (user?.name || 'Advocate'))
    setHistory(handledByMe)
  }, [user])

  const handleMarkCompleted = (id) => {
    if (window.confirm("Mark this consultation as completed?")) {
      const stored = JSON.parse(localStorage.getItem('legal24_instant_requests') || '[]')
      const updated = stored.map(req => req.id === id ? { ...req, status: 'Completed' } : req)
      localStorage.setItem('legal24_instant_requests', JSON.stringify(updated))
      setHistory(updated.filter(req => req.handledBy === (user?.name || 'Advocate')))
    }
  }

  const activeCases = history.filter(req => req.status === 'Confirmed')
  const completedCases = history.filter(req => req.status === 'Completed')

  return (
    <>
      <TopBar 
        title="Instant Consults History"
        subtitle="URGENT CALLS LOG"
        isSidebarOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen(true)}
      />

      <div className="fade-up" style={{ padding: '0 24px', boxSizing: 'border-box', width: '100%', maxWidth: 'none', marginTop: '24px' }}>
        <div className="panel-header" style={{ marginBottom: '20px' }}>
          <div>
            <h2>My Handled Requests</h2>
            <p>Track urgent public consultations you have accepted.</p>
          </div>
        </div>

        <div className="cases-tab-row" style={{ display: 'flex', gap: '16px', marginBottom: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '12px' }}>
          <button 
            onClick={() => setActiveTab('active')} 
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: activeTab === 'active' ? '#6c9cff' : 'var(--text-muted)', 
              fontWeight: 600, 
              fontSize: '15px', 
              padding: '6px 12px', 
              position: 'relative',
              cursor: 'pointer' 
            }}
          >
            Active / Confirmed ({activeCases.length})
            {activeTab === 'active' && <span style={{ position: 'absolute', bottom: '-13px', left: 0, right: 0, height: '2px', background: '#6c9cff' }} />}
          </button>
          
          <button 
            onClick={() => setActiveTab('completed')} 
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: activeTab === 'completed' ? '#6c9cff' : 'var(--text-muted)', 
              fontWeight: 600, 
              fontSize: '15px', 
              padding: '6px 12px', 
              position: 'relative',
              cursor: 'pointer' 
            }}
          >
            Completed ({completedCases.length})
            {activeTab === 'completed' && <span style={{ position: 'absolute', bottom: '-13px', left: 0, right: 0, height: '2px', background: '#6c9cff' }} />}
          </button>
        </div>

        <div className="advocate-panel" style={{ background: 'var(--bg-panel)', borderRadius: '16px', border: '1px solid var(--border-color)', padding: '24px' }}>
          
          {activeTab === 'active' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {activeCases.length > 0 ? (
                activeCases.map(req => (
                  <div key={req.id} className="history-item" style={{ borderLeft: '4px solid #6c9cff', padding: '16px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="history-details">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <PhoneCall size={16} color="#6c9cff" />
                        <h4 style={{ margin: 0, color: '#fff', fontSize: '16px' }}>{req.mobile}</h4>
                        <span className="status-pill accepted" style={{ background: 'rgba(108, 156, 255, 0.15)', color: '#6c9cff', padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: 'bold' }}>Accepted</span>
                      </div>
                      <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>Requested: {req.date}</p>
                    </div>
                    <button 
                      onClick={() => handleMarkCompleted(req.id)}
                      style={{ background: 'var(--accent-green)', color: '#000', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      <CheckCircle size={16} /> Mark Completed
                    </button>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>No active instant consultations.</p>
              )}
            </div>
          )}

          {activeTab === 'completed' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {completedCases.length > 0 ? (
                completedCases.map(req => (
                  <div key={req.id} className="history-item" style={{ borderLeft: '4px solid var(--accent-green)', padding: '16px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="history-details">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <PhoneCall size={16} color="var(--accent-green)" />
                        <h4 style={{ margin: 0, color: '#fff', fontSize: '16px' }}>{req.mobile}</h4>
                        <span className="status-pill accepted" style={{ background: 'rgba(76, 225, 177, 0.15)', color: 'var(--accent-green)', padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: 'bold' }}>Completed</span>
                      </div>
                      <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>Requested: {req.date}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>No completed instant consultations yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
