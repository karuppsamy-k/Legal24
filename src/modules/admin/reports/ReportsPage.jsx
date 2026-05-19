import { useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import '../dashboard/dashboard.css'
import { useAuth } from '../../../core/context/AuthContext'
import { LogOut, FileText, Download, TrendingUp, Users, Briefcase } from 'lucide-react'
import TopBar from '../../../shared/components/organisms/TopBar'
import { Case, MockDataProvider, CASE_STATUS } from '../../../core/models'

const advocatesList = MockDataProvider.getMockAdvocates();
const clientsList = MockDataProvider.getMockClients();

const generateMockCases = () => {
  const baseCases = [];
  const categories = ['Criminal Law', 'Civil Law', 'Corporate Law', 'Family Law', 'Property Law'];
  
  // Generate 35 mock cases using Case model
  for (let i = 1; i <= 35; i++) {
    const adv = advocatesList[(i - 1) % advocatesList.length];
    const client = clientsList[(i - 1) % clientsList.length];
    const category = categories[i % categories.length];
    
    // Distribute statuses: 15 completed, 15 active/hearing, 5 pending
    let status = CASE_STATUS.ACTIVE;
    if (i <= 15) {
      status = CASE_STATUS.COMPLETED;
    } else if (i > 30) {
      status = CASE_STATUS.PENDING;
    }

    baseCases.push(
      new Case({
        caseId: `C-${String(i).padStart(3, '0')}`,
        advocateId: adv.advocateId,
        clientId: client.clientId,
        title: `${category} Case Dispute #${i}`,
        description: `Case investigation review for ${category}`,
        category: category,
        status: status,
        createdAt: new Date(Date.now() - i * 86400000).toISOString()
      })
    );
  }
  return baseCases;
};

const ALL_MOCK_REPORT_CASES = generateMockCases();

export default function ReportsPage() {
  const { sidebarOpen, setSidebarOpen } = useOutletContext()
  const { user } = useAuth();
  const navigate = useNavigate();

  const [selectedCard, setSelectedCard] = useState(null); // null, 'total', 'resolved', 'pending'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleCardClick = (card) => {
    setSelectedCard(selectedCard === card ? null : card);
    setCurrentPage(1);
  };

  const getFilteredCases = () => {
    if (selectedCard === 'total') return ALL_MOCK_REPORT_CASES;
    if (selectedCard === 'resolved') return ALL_MOCK_REPORT_CASES.filter(c => c.status === CASE_STATUS.COMPLETED);
    if (selectedCard === 'pending') return ALL_MOCK_REPORT_CASES.filter(c => c.status === CASE_STATUS.PENDING);
    return [];
  };

  const getAdvocateName = (advocateId) => {
    const adv = advocatesList.find(a => a.advocateId === advocateId);
    return adv ? `Adv. ${adv.name}` : 'Unknown';
  };

  const getClientName = (clientId) => {
    const cl = clientsList.find(c => c.clientId === clientId);
    return cl ? cl.name : 'Unknown';
  };

  const filteredCases = getFilteredCases();
  const totalPages = Math.ceil(filteredCases.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCases = filteredCases.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <TopBar 
        title="Reports & Analytics"
        subtitle="PLATFORM DATA"
        isSidebarOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen(true)}
      />

      <div className="analytics-container fade-up">
        <section className="dashboard-overview">
          <div className="overview-cards">
            {/* Total Cases Card */}
            <div 
              onClick={() => handleCardClick('total')}
              style={{ 
                padding: '26px', 
                borderRadius: '12px', 
                background: selectedCard === 'total' ? 'rgba(108, 156, 255, 0.12)' : 'rgba(255,255,255,0.04)', 
                border: selectedCard === 'total' ? '2px solid #6c9cff' : '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: selectedCard === 'total' ? '0 0 20px rgba(108, 156, 255, 0.2)' : 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ color: '#9aa6d2', fontSize: '14px' }}>Total Cases</span>
                <span style={{ padding: '4px 8px', background: 'rgba(76, 225, 177, 0.16)', color: '#4ce1b1', borderRadius: '4px', fontSize: '12px' }}>+8%</span>
              </div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#eef2ff', marginBottom: '8px' }}>1,247</div>
              <div style={{ color: '#9aa6d2', fontSize: '13px' }}>Across all advocates</div>
            </div>

            {/* Resolved Cases Card */}
            <div 
              onClick={() => handleCardClick('resolved')}
              style={{ 
                padding: '26px', 
                borderRadius: '12px', 
                background: selectedCard === 'resolved' ? 'rgba(76, 225, 177, 0.12)' : 'rgba(255,255,255,0.04)', 
                border: selectedCard === 'resolved' ? '2px solid #4ce1b1' : '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: selectedCard === 'resolved' ? '0 0 20px rgba(76, 225, 177, 0.2)' : 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ color: '#9aa6d2', fontSize: '14px' }}>Resolved Cases</span>
                <span style={{ padding: '4px 8px', background: 'rgba(76, 225, 177, 0.16)', color: '#4ce1b1', borderRadius: '4px', fontSize: '12px' }}>+12%</span>
              </div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#eef2ff', marginBottom: '8px' }}>892</div>
              <div style={{ color: '#9aa6d2', fontSize: '13px' }}>Success rate: 71.5%</div>
            </div>

            {/* Pending Cases Card */}
            <div 
              onClick={() => handleCardClick('pending')}
              style={{ 
                padding: '26px', 
                borderRadius: '12px', 
                background: selectedCard === 'pending' ? 'rgba(255, 214, 138, 0.12)' : 'rgba(255,255,255,0.04)', 
                border: selectedCard === 'pending' ? '2px solid #ffd68a' : '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: selectedCard === 'pending' ? '0 0 20px rgba(255, 214, 138, 0.2)' : 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ color: '#9aa6d2', fontSize: '14px' }}>Pending Cases</span>
                <span style={{ padding: '4px 8px', background: 'rgba(255, 214, 138, 0.16)', color: '#ffd68a', borderRadius: '4px', fontSize: '12px' }}>-3%</span>
              </div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#eef2ff', marginBottom: '8px' }}>355</div>
              <div style={{ color: '#9aa6d2', fontSize: '13px' }}>Under review</div>
            </div>
          </div>
        </section>

        <section className="dashboard-grid" style={{ marginTop: '24px' }}>
          <article className="panel fade-up" style={{ gridColumn: '1 / -1' }}>
            <div className="panel-header" style={{ paddingBottom: '20px', borderBottom: '1px solid var(--border-color)', marginBottom: '20px' }}>
              <div>
                <h2>{selectedCard ? `${selectedCard.toUpperCase()} Cases Details` : 'Monthly Case Statistics'}</h2>
                <p>{selectedCard ? `List of cases currently classified under ${selectedCard}` : 'Case resolution trends and performance metrics'}</p>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                {selectedCard && (
                  <button 
                    type="button"
                    onClick={() => setSelectedCard(null)}
                    style={{ 
                      padding: '8px 16px', 
                      background: 'rgba(255, 255, 255, 0.05)', 
                      border: '1px solid rgba(255, 255, 255, 0.1)', 
                      borderRadius: '6px', 
                      color: '#94a3b8', 
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '500',
                      transition: 'all 0.2s'
                    }}
                  >
                    ← Back to Chart
                  </button>
                )}
                <button type="button" style={{ padding: '8px 16px', background: '#6c9cff', border: 'none', borderRadius: '6px', color: '#fff', cursor: 'pointer' }}>📥 Export Report</button>
              </div>
            </div>

            {selectedCard ? (
              <>
                <div className="table-grid">
                  <div className="table-row header" style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', borderBottom: '1px solid var(--border-color)', background: 'rgba(255, 255, 255, 0.01)' }}>
                    <span style={{ width: '120px' }}>Case ID</span>
                    <span style={{ flex: 2 }}>Case Title</span>
                    <span style={{ flex: 1.2 }}>Client</span>
                    <span style={{ flex: 1.2 }}>Advocate</span>
                    <span style={{ width: '120px', textAlign: 'right' }}>Status</span>
                  </div>
                  {paginatedCases.length > 0 ? (
                    paginatedCases.map((c) => (
                      <div key={c.caseId} className="table-row" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <span style={{ width: '120px', fontWeight: '600', color: '#6c9cff' }}>{c.caseId}</span>
                        <span style={{ flex: 2, color: 'var(--text-primary)' }}>{c.title}</span>
                        <span style={{ flex: 1.2, color: 'var(--text-secondary)' }}>{getClientName(c.clientId)}</span>
                        <span style={{ flex: 1.2, color: 'var(--text-secondary)' }}>{getAdvocateName(c.advocateId)}</span>
                        <span style={{ width: '120px', textAlign: 'right' }}>
                          <span className={`status-pill ${c.status === CASE_STATUS.COMPLETED ? 'completed' : c.status === CASE_STATUS.PENDING ? 'pending-response' : 'in-progress'}`}>
                            {c.status}
                          </span>
                        </span>
                      </div>
                    ))
                  ) : (
                    <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No cases match this filter.
                    </div>
                  )}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', padding: '16px 20px', borderTop: '1px solid var(--border-color)' }}>
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      style={{
                        padding: '8px 16px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '6px',
                        color: currentPage === 1 ? '#475569' : '#eef2ff',
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      ← Previous
                    </button>
                    <span style={{ color: '#94a3b8', fontSize: '13px' }}>
                      Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong> (Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredCases.length)} of {filteredCases.length})
                    </span>
                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      style={{
                        padding: '8px 16px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '6px',
                        color: currentPage === totalPages ? '#475569' : '#eef2ff',
                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div style={{ padding: '24px', color: '#9aa6d2', textAlign: 'center', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div>📊 Chart will display here with real-time case metrics</div>
              </div>
            )}
          </article>
        </section>
      </div>
    </>
  )
}
