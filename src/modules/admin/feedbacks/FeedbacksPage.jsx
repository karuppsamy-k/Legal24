import { useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import '../dashboard/dashboard.css'
import { useAuth } from '../../../core/context/AuthContext'
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
            </div>
            <div className="table-grid">
              {feedbacks.map((feedback) => (
                <div key={feedback.id} className="table-row">
                  <div style={{ flex: 1 }}>
                    <strong>{feedback.user}</strong>
                    <span>{feedback.message}</span>
                  </div>
                  <div style={{ width: '100px', flexShrink: 0, textAlign: 'center' }}>
                    <div style={{ 
                      padding: '4px 12px', 
                      background: getPriorityColor(feedback.priority).bg, 
                      color: getPriorityColor(feedback.priority).text, 
                      borderRadius: '4px', 
                      fontSize: '12px',
                      display: 'inline-block',
                      width: '80px'
                    }}>
                      {feedback.priority}
                    </div>
                  </div>
                  <div style={{ width: '120px', flexShrink: 0, textAlign: 'center' }}>
                    <div style={{ 
                      padding: '4px 12px', 
                      background: getStatusColor(feedback.status).bg, 
                      color: getStatusColor(feedback.status).text, 
                      borderRadius: '4px', 
                      fontSize: '12px',
                      display: 'inline-block',
                      width: '100px'
                    }}>
                      {feedback.status}
                    </div>
                  </div>
                  <div style={{ width: '100px', flexShrink: 0, color: '#9aa6d2', fontSize: '13px', textAlign: 'center' }}>
                    {feedback.date}
                  </div>
                  <div style={{ width: '180px', flexShrink: 0, display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button style={{ padding: '8px 12px', background: 'rgba(108, 156, 255, 0.16)', color: '#7fb2ff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', flex: 1 }}>View</button>
                    {feedback.status !== 'Resolved' && (
                      <button style={{ padding: '8px 12px', background: 'rgba(76, 225, 177, 0.16)', color: '#4ce1b1', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', flex: 1 }}>Mark Done</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>
    </>
  )
}
