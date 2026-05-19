import { useState, useEffect } from 'react'
import { useOutletContext, useNavigate, useLocation } from 'react-router-dom'
import '../dashboard/dashboard.css'
import { useAuth } from '../../../core/context/AuthContext'
import { useTheme } from '../../../core/context/ThemeContext'
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
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedCard, setSelectedCard] = useState(() => {
    return location.state?.selectedCard || null;
  });
  const [instantRequests, setInstantRequests] = useState([]);
  
  useEffect(() => {
    const fetchInstantRequests = () => {
      const stored = JSON.parse(localStorage.getItem('legal24_instant_requests') || '[]');
      setInstantRequests(stored);
    };
    fetchInstantRequests();
    const interval = setInterval(fetchInstantRequests, 2000);
    return () => clearInterval(interval);
  }, []);
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
    if (selectedCard === 'active') return ALL_MOCK_REPORT_CASES.filter(c => c.status === CASE_STATUS.ACTIVE || c.status === CASE_STATUS.HEARING);
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
          <div className="reports-overview-cards">
            {/* Total Cases Card */}
             <div 
              onClick={() => handleCardClick('total')}
              style={{ 
                padding: '26px', 
                borderRadius: '12px', 
                background: selectedCard === 'total' ? 'rgba(108, 156, 255, 0.15)' : 'var(--bg-panel)', 
                border: selectedCard === 'total' ? '2px solid var(--accent-blue)' : '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: selectedCard === 'total' ? '0 4px 20px rgba(108, 156, 255, 0.15)' : 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '600' }}>Total Cases</span>
                <span style={{ padding: '4px 8px', background: theme === 'light' ? 'rgba(5, 150, 105, 0.15)' : 'rgba(76, 225, 177, 0.16)', color: theme === 'light' ? '#059669' : '#4ce1b1', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>+8%</span>
              </div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '8px' }}>
                {ALL_MOCK_REPORT_CASES.length}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Across all advocates</div>
            </div>

            {/* Active Cases Card */}
            <div 
              onClick={() => handleCardClick('active')}
              style={{ 
                padding: '26px', 
                borderRadius: '12px', 
                background: selectedCard === 'active' ? 'rgba(192, 132, 252, 0.15)' : 'var(--bg-panel)', 
                border: selectedCard === 'active' ? '2px solid #c084fc' : '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: selectedCard === 'active' ? '0 4px 20px rgba(192, 132, 252, 0.15)' : 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '600' }}>Active Cases</span>
                <span style={{ padding: '4px 8px', background: 'rgba(192, 132, 252, 0.16)', color: '#c084fc', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>+5%</span>
              </div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '8px' }}>
                {ALL_MOCK_REPORT_CASES.filter(c => c.status === CASE_STATUS.ACTIVE || c.status === CASE_STATUS.HEARING).length}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Currently in progress</div>
            </div>

            {/* Resolved Cases Card */}
             <div 
              onClick={() => handleCardClick('resolved')}
              style={{ 
                padding: '26px', 
                borderRadius: '12px', 
                background: selectedCard === 'resolved' ? (theme === 'light' ? 'rgba(5, 150, 105, 0.15)' : 'rgba(76, 225, 177, 0.15)') : 'var(--bg-panel)', 
                border: selectedCard === 'resolved' ? (theme === 'light' ? '2px solid #059669' : '2px solid #4ce1b1') : '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: selectedCard === 'resolved' ? (theme === 'light' ? '0 4px 20px rgba(5, 150, 105, 0.15)' : '0 4px 20px rgba(76, 225, 177, 0.15)') : 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '600' }}>Resolved Cases</span>
                <span style={{ padding: '4px 8px', background: theme === 'light' ? 'rgba(5, 150, 105, 0.15)' : 'rgba(76, 225, 177, 0.16)', color: theme === 'light' ? '#059669' : '#4ce1b1', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>+12%</span>
              </div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '8px' }}>
                {ALL_MOCK_REPORT_CASES.filter(c => c.status === CASE_STATUS.COMPLETED).length}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Success rate: 71.5%</div>
            </div>

            {/* Pending Cases Card */}
            <div 
              onClick={() => handleCardClick('pending')}
              style={{ 
                padding: '26px', 
                borderRadius: '12px', 
                background: selectedCard === 'pending' ? (theme === 'light' ? 'rgba(217, 119, 6, 0.15)' : 'rgba(255, 214, 138, 0.15)') : 'var(--bg-panel)', 
                border: selectedCard === 'pending' ? (theme === 'light' ? '2px solid #d97706' : '2px solid #ffd68a') : '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: selectedCard === 'pending' ? (theme === 'light' ? '0 4px 20px rgba(217, 119, 6, 0.15)' : '0 4px 20px rgba(255, 214, 138, 0.15)') : 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '600' }}>Pending Cases</span>
                <span style={{ padding: '4px 8px', background: theme === 'light' ? 'rgba(217, 119, 6, 0.15)' : 'rgba(255, 214, 138, 0.16)', color: theme === 'light' ? '#d97706' : '#ffd68a', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>-3%</span>
              </div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '8px' }}>
                {ALL_MOCK_REPORT_CASES.filter(c => c.status === CASE_STATUS.PENDING).length}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Under review</div>
            </div>

            {/* Instant Consultations Card */}
            <div 
              onClick={() => handleCardClick('instant')}
              style={{ 
                padding: '26px', 
                borderRadius: '12px', 
                background: selectedCard === 'instant' ? 'rgba(239, 68, 68, 0.15)' : 'var(--bg-panel)', 
                border: selectedCard === 'instant' ? '2px solid #ef4444' : '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: selectedCard === 'instant' ? '0 4px 20px rgba(239, 68, 68, 0.15)' : 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '600' }}>Instant Consults</span>
                <span style={{ padding: '4px 8px', background: 'rgba(239, 68, 68, 0.16)', color: '#ef4444', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>Urgent</span>
              </div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '8px' }}>
                {instantRequests.length}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{instantRequests.filter(r => r.status === 'Pending').length} Pending</div>
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
                      background: 'var(--btn-bg)', 
                      border: '1px solid var(--border-color)', 
                      borderRadius: '6px', 
                      color: 'var(--text-secondary)', 
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '500',
                      transition: 'all 0.2s'
                    }}
                  >
                    ← Back to Chart
                  </button>
                )}
                <button type="button" style={{ padding: '8px 16px', background: 'var(--accent-blue)', border: 'none', borderRadius: '6px', color: '#fff', cursor: 'pointer', fontWeight: '600' }}>📥 Export Report</button>
              </div>
            </div>

            {selectedCard ? (
              <>
                {selectedCard === 'instant' ? (
                  <div className="reports-table">
                    <div className="table-row header">
                      <span className="col-id" style={{ color: 'var(--text-heading)' }}>Request ID</span>
                      <span className="col-title" style={{ color: 'var(--text-heading)' }}>Mobile Number</span>
                      <span className="col-client" style={{ color: 'var(--text-heading)' }}>Date</span>
                      <span className="col-advocate" style={{ color: 'var(--text-heading)' }}>Handled By</span>
                      <span className="col-status" style={{ color: 'var(--text-heading)' }}>Status</span>
                    </div>
                    {instantRequests.length > 0 ? (
                      instantRequests.map((req) => (
                        <div key={req.id} className="table-row">
                          <span data-label="Request ID" className="col-id" style={{ fontWeight: '600', color: 'var(--accent-blue)' }}>{req.id}</span>
                          <span data-label="Mobile Number" className="col-title" style={{ color: 'var(--text-primary)' }}>{req.mobile}</span>
                          <span data-label="Date" className="col-client" style={{ color: 'var(--text-secondary)' }}>{req.date}</span>
                          <span data-label="Handled By" className="col-advocate" style={{ color: 'var(--text-secondary)' }}>{req.handledBy || 'Unassigned'}</span>
                          <span data-label="Status" className="col-status">
                            <span className={`status-pill ${req.status === 'Confirmed' ? 'accepted' : req.status === 'Completed' ? 'completed' : 'pending'}`}>
                              {req.status}
                            </span>
                          </span>
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                        No instant consultation requests found.
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="reports-table">
                    <div className="table-row header">
                      <span className="col-id" style={{ color: 'var(--text-heading)' }}>Case ID</span>
                      <span className="col-title" style={{ color: 'var(--text-heading)' }}>Case Title</span>
                      <span className="col-client" style={{ color: 'var(--text-heading)' }}>Client</span>
                      <span className="col-advocate" style={{ color: 'var(--text-heading)' }}>Advocate</span>
                      <span className="col-status" style={{ color: 'var(--text-heading)' }}>Status</span>
                    </div>
                    {paginatedCases.length > 0 ? (
                      paginatedCases.map((c) => (
                        <div key={c.caseId} className="table-row">
                          <span data-label="Case ID" className="col-id" style={{ fontWeight: '600', color: 'var(--accent-blue)' }}>{c.caseId}</span>
                          <span data-label="Case Title" className="col-title" style={{ color: 'var(--text-primary)' }}>{c.title}</span>
                          <span data-label="Client" className="col-client" style={{ color: 'var(--text-secondary)' }}>{getClientName(c.clientId)}</span>
                          <span data-label="Advocate" className="col-advocate" style={{ color: 'var(--text-secondary)' }}>{getAdvocateName(c.advocateId)}</span>
                          <span data-label="Status" className="col-status">
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
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', padding: '16px 20px', borderTop: '1px solid var(--border-color)' }}>
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      style={{
                        padding: '8px 16px',
                        background: 'var(--btn-bg)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '6px',
                        color: currentPage === 1 ? 'var(--text-muted)' : 'var(--text-primary)',
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      ← Previous
                    </button>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                      Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong> (Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredCases.length)} of {filteredCases.length})
                    </span>
                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      style={{
                        padding: '8px 16px',
                        background: 'var(--btn-bg)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '6px',
                        color: currentPage === totalPages ? 'var(--text-muted)' : 'var(--text-primary)',
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
              <div style={{ padding: '24px', minHeight: '300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Overview Statistics</h3>
                <div style={{ display: 'flex', alignItems: 'flex-end', height: '220px', gap: '8%', marginTop: 'auto', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', justifyContent: 'center' }}>
                  
                  {/* Bar 1: Active Cases */}
                  <div style={{ flex: '0 1 80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
                    <div style={{ width: '100%', height: `${Math.max(5, (ALL_MOCK_REPORT_CASES.filter(c => c.status === CASE_STATUS.ACTIVE || c.status === CASE_STATUS.HEARING).length / ALL_MOCK_REPORT_CASES.length) * 100)}%`, background: '#c084fc', borderRadius: '4px 4px 0 0', transition: 'height 0.5s' }} />
                    <span style={{ marginTop: '8px', fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>Active</span>
                  </div>

                  {/* Bar 2: Resolved Cases */}
                  <div style={{ flex: '0 1 80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
                    <div style={{ width: '100%', height: `${Math.max(5, (ALL_MOCK_REPORT_CASES.filter(c => c.status === CASE_STATUS.COMPLETED).length / ALL_MOCK_REPORT_CASES.length) * 100)}%`, background: theme === 'light' ? '#059669' : '#4ce1b1', borderRadius: '4px 4px 0 0', transition: 'height 0.5s' }} />
                    <span style={{ marginTop: '8px', fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>Resolved</span>
                  </div>

                  {/* Bar 3: Pending Cases */}
                  <div style={{ flex: '0 1 80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
                    <div style={{ width: '100%', height: `${Math.max(5, (ALL_MOCK_REPORT_CASES.filter(c => c.status === CASE_STATUS.PENDING).length / ALL_MOCK_REPORT_CASES.length) * 100)}%`, background: theme === 'light' ? '#d97706' : '#ffd68a', borderRadius: '4px 4px 0 0', transition: 'height 0.5s' }} />
                    <span style={{ marginTop: '8px', fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>Pending</span>
                  </div>

                  {/* Bar 4: Instant Consults */}
                  <div style={{ flex: '0 1 80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
                    <div style={{ width: '100%', height: `${Math.max(5, Math.min(100, (instantRequests.length / 20) * 100))}%`, background: '#ef4444', borderRadius: '4px 4px 0 0', transition: 'height 0.5s' }} />
                    <span style={{ marginTop: '8px', fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>Instant</span>
                  </div>

                </div>
              </div>
            )}
          </article>
        </section>
      </div>
    </>
  )
}
