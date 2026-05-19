import { useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import '../dashboard/dashboard.css'
import { useAuth } from '../../../core/context/AuthContext'
import { useTheme } from '../../../core/context/ThemeContext'
import { LogOut, Star, MessageSquare, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import TopBar from '../../../shared/components/organisms/TopBar'

const feedbacks = [
  { id: 1, user: 'Client Lee', message: 'Access issue on mobile app', priority: 'High', date: '2024-01-19', status: 'Open' },
  { id: 2, user: 'Sarah Johnson', message: 'Excellent service and support', priority: 'Low', date: '2024-01-18', status: 'Resolved' },
  { id: 3, user: 'Aditya Kumar', message: 'Document upload feature needs improvement', priority: 'Medium', date: '2024-01-17', status: 'In Progress' },
  { id: 4, user: 'Maria Garcia', message: 'Case tracking is very useful', priority: 'Low', date: '2024-01-16', status: 'Resolved' },
  { id: 5, user: 'David Chen', message: 'Request for email notification preferences', priority: 'Medium', date: '2024-01-15', status: 'Open' },
]

export default function FeedbacksPage() {
  const { sidebarOpen, setSidebarOpen } = useOutletContext()
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [feedbackList, setFeedbackList] = useState(() => {
    const stored = localStorage.getItem('legal24_feedbacks');
    if (stored) {
      return JSON.parse(stored);
    }
    localStorage.setItem('legal24_feedbacks', JSON.stringify(feedbacks));
    return feedbacks;
  });

  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const getPriorityColor = (priority) => {
    const isLight = theme === 'light';
    const colors = {
      'High': { bg: isLight ? 'rgba(220, 38, 38, 0.15)' : 'rgba(255, 87, 87, 0.16)', text: isLight ? '#dc2626' : '#ff9999' },
      'Medium': { bg: isLight ? 'rgba(217, 119, 6, 0.15)' : 'rgba(255, 214, 138, 0.16)', text: isLight ? '#d97706' : '#ffd68a' },
      'Low': { bg: isLight ? 'rgba(79, 70, 229, 0.15)' : 'rgba(108, 156, 255, 0.16)', text: isLight ? '#4f46e5' : '#7fb2ff' },
    }
    return colors[priority] || colors.Low
  }

  const getStatusColor = (status) => {
    const isLight = theme === 'light';
    const colors = {
      'Open': { bg: isLight ? 'rgba(79, 70, 229, 0.15)' : 'rgba(108, 156, 255, 0.16)', text: isLight ? '#4f46e5' : '#7fb2ff' },
      'In Progress': { bg: isLight ? 'rgba(217, 119, 6, 0.15)' : 'rgba(255, 214, 138, 0.16)', text: isLight ? '#d97706' : '#ffd68a' },
      'Resolved': { bg: isLight ? 'rgba(5, 150, 105, 0.15)' : 'rgba(76, 225, 177, 0.16)', text: isLight ? '#059669' : '#4ce1b1' },
    }
    return colors[status] || colors.Open
  }

  const handleMarkDone = (id) => {
    const updated = feedbackList.map(f => {
      if (f.id === id) {
        return { ...f, status: 'Resolved' };
      }
      return f;
    });
    setFeedbackList(updated);
    localStorage.setItem('legal24_feedbacks', JSON.stringify(updated));
  };

  const filteredFeedbacks = feedbackList.filter(f => {
    if (activeFilter === 'pending') return f.status !== 'Resolved';
    if (activeFilter === 'resolved') return f.status === 'Resolved';
    return true;
  });

  return (
    <>
      <TopBar 
        title="User Feedbacks"
        subtitle="SUPPORT & QUALITY"
        isSidebarOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen(true)}
      />

      <section className="dashboard-grid fade-up">
        <article className="panel" style={{ gridColumn: '1 / -1' }}>
          <div className="panel-header">
            <div>
              <h2>All Feedbacks & Reports</h2>
              <p>Manage user feedback and feature requests</p>
            </div>
            <div className="filter-chips">
              <button 
                onClick={() => setActiveFilter('all')}
                className={`chip ${activeFilter === 'all' ? 'active' : ''}`}
              >
                All ({feedbackList.length})
              </button>
              <button 
                onClick={() => setActiveFilter('pending')}
                className={`chip ${activeFilter === 'pending' ? 'active-rejected' : ''}`}
              >
                Pending ({feedbackList.filter(f => f.status !== 'Resolved').length})
              </button>
              <button 
                onClick={() => setActiveFilter('resolved')}
                className={`chip ${activeFilter === 'resolved' ? 'active-resolved' : ''}`}
              >
                Resolved ({feedbackList.filter(f => f.status === 'Resolved').length})
              </button>
            </div>
          </div>
          <div className="feedback-list">
            {filteredFeedbacks.length === 0 ? (
              <div style={{ padding: '40px 20px', textAlign: 'center', color: '#9aa6d2' }}>
                No feedback entries found in this category.
              </div>
            ) : (
              filteredFeedbacks.map((feedback) => (
                <div key={feedback.id} className="feedback-card">
                  <div className="feedback-main">
                    <strong>{feedback.user}</strong>
                    <span>{feedback.message}</span>
                  </div>
                  <div className="feedback-meta-row">
                    <div className="feedback-meta-item">
                      <div style={{ 
                        padding: '4px 12px', 
                        background: getPriorityColor(feedback.priority).bg, 
                        color: getPriorityColor(feedback.priority).text, 
                        borderRadius: '4px', 
                        fontSize: '12px',
                        display: 'inline-block',
                        width: '80px',
                        fontWeight: '600',
                        textAlign: 'center'
                      }}>
                        {feedback.priority}
                      </div>
                    </div>
                    <div className="feedback-meta-item">
                      <div style={{ 
                        padding: '4px 12px', 
                        background: getStatusColor(feedback.status).bg, 
                        color: getStatusColor(feedback.status).text, 
                        borderRadius: '4px', 
                        fontSize: '12px',
                        display: 'inline-block',
                        width: '100px',
                        fontWeight: '600',
                        textAlign: 'center'
                      }}>
                        {feedback.status}
                      </div>
                    </div>
                    <div className="feedback-date">
                      {feedback.date}
                    </div>
                  </div>
                  <div className="feedback-actions">
                    <button 
                      onClick={() => setSelectedFeedback(feedback)}
                      style={{ padding: '8px 12px', background: 'rgba(108, 156, 255, 0.16)', color: '#7fb2ff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', flex: 1, fontWeight: '600' }}
                    >
                      View
                    </button>
                    {feedback.status !== 'Resolved' && (
                      <button 
                        onClick={() => handleMarkDone(feedback.id)}
                        className="btn-approve-action"
                        style={{ padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', flex: 1 }}
                      >
                        Mark Done
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </article>
      </section>

      {/* Feedback Details Modal */}
      {selectedFeedback && (
        <div className="profile-modal-overlay" onClick={() => setSelectedFeedback(null)}>
          <div className="profile-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedFeedback(null)}>&times;</button>
            <div className="modal-header">
              <div className="modal-avatar" style={{ background: 'linear-gradient(135deg, #a855f7, #6c9cff)' }}>
                {selectedFeedback.user.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="modal-title-section">
                <h3>{selectedFeedback.user}</h3>
                <span className="modal-specialization">User Support Feedback</span>
              </div>
            </div>

            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#9aa6d2', fontWeight: 'bold', letterSpacing: '0.5px' }}>Submitted Message</span>
                <div style={{ 
                  background: 'rgba(255, 255, 255, 0.03)', 
                  border: '1px solid rgba(255, 255, 255, 0.05)', 
                  borderRadius: '12px', 
                  padding: '16px', 
                  color: 'var(--text-primary)', 
                  fontSize: '14px', 
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap'
                }}>
                  {selectedFeedback.message}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#9aa6d2', fontWeight: 'bold' }}>Submission Date</span>
                  <strong style={{ color: 'var(--text-heading)', fontSize: '14px' }}>{selectedFeedback.date}</strong>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#9aa6d2', fontWeight: 'bold' }}>Priority Level</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ 
                      width: '8px', 
                      height: '8px', 
                      borderRadius: '50%', 
                      backgroundColor: getPriorityColor(selectedFeedback.priority).text 
                    }} />
                    <strong style={{ color: getPriorityColor(selectedFeedback.priority).text, fontSize: '14px' }}>
                      {selectedFeedback.priority}
                    </strong>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 'bold' }}>Status</span>
                  <div style={{ 
                    alignSelf: 'flex-start',
                    padding: '4px 12px', 
                    background: getStatusColor(selectedFeedback.status).bg, 
                    color: getStatusColor(selectedFeedback.status).text, 
                    borderRadius: '4px', 
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {selectedFeedback.status}
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer" style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
              <button 
                className="modal-action-btn"
                style={{ flex: 1, background: 'rgba(255, 255, 255, 0.08)', color: 'var(--text-primary)' }}
                onClick={() => setSelectedFeedback(null)}
              >
                Close View
              </button>
              {selectedFeedback.status !== 'Resolved' && (
                <button 
                  className="modal-action-btn unblock-btn" 
                  style={{ flex: 1 }}
                  onClick={() => {
                    handleMarkDone(selectedFeedback.id);
                    setSelectedFeedback(prev => ({ ...prev, status: 'Resolved' }));
                  }}
                >
                  Mark as Resolved
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
