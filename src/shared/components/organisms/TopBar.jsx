import React from 'react'
import { Bell, Sun, Moon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../core/context/ThemeContext'
import { useNotifications } from '../../../core/context/NotificationContext'
import { useAuth } from '../../../core/context/AuthContext'

export default function TopBar({ 
  title, 
  subtitle, 
  onMenuClick, 
  isSidebarOpen,
  actions,
  profileLabel = "Profile"
}) {
  const { theme, toggleTheme } = useTheme();
  const { unreadCount, toggleNotifications } = useNotifications();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (user) {
      if (user.role === 'admin') navigate('/admin-profile');
      else if (user.role === 'advocate') navigate('/advocate-profile');
      else if (user.role === 'client') navigate('/client-profile');
    }
  };

  return (
    <header className="dashboard-topbar">
      {!isSidebarOpen && (
        <button className="hamburger-btn" onClick={onMenuClick}>☰</button>
      )}
      <div className="topbar-titles">
        {subtitle && <p className="topbar-small">{subtitle}</p>}
        <h1>{title}</h1>
      </div>
      <div className="topbar-actions">
        {actions}
        <button className="icon-button" onClick={toggleTheme} title="Toggle Theme">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <button 
          className="icon-button" 
          onClick={toggleNotifications} 
          title="Notifications"
          style={{ position: 'relative' }}
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              width: '10px',
              height: '10px',
              backgroundColor: '#6c9cff',
              borderRadius: '50%',
              border: '2px solid var(--bg-panel, #0f172a)',
              boxShadow: '0 0 6px #6c9cff'
            }} />
          )}
        </button>
        <button className="profile-button" onClick={handleProfileClick}>{profileLabel}</button>
      </div>
    </header>
  )
}
