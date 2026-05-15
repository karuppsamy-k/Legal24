import { useState } from 'react'
import './App.css'
import DashboardPage from './features/dashboard/DashboardPage'
import ApprovalPage from './features/approval/ApprovalPage'
import UsersPage from './features/users/UsersPage'
import AdvocatesPage from './features/advocates/AdvocatesPage'
import ReportsPage from './features/reports/ReportsPage'
import FeedbacksPage from './features/feedbacks/FeedbacksPage'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  const handleNavigate = (pageId) => {
    setCurrentPage(pageId)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} />
      case 'approval':
        return <ApprovalPage onNavigate={handleNavigate} />
      case 'users':
        return <UsersPage onNavigate={handleNavigate} />
      case 'advocates':
        return <AdvocatesPage onNavigate={handleNavigate} />
      case 'reports':
        return <ReportsPage onNavigate={handleNavigate} />
      case 'feedbacks':
        return <FeedbacksPage onNavigate={handleNavigate} />
      default:
        return <DashboardPage onNavigate={handleNavigate} />
    }
  }

  return renderPage()
}

export default App
