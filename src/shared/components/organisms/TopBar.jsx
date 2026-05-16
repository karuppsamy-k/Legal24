import React from 'react'
import { Bell, Sun, Moon } from 'lucide-react'
import { useTheme } from '../../../core/context/ThemeContext'

export default function TopBar({ 
  title, 
  subtitle, 
  onMenuClick, 
  isSidebarOpen,
  actions,
  profileLabel = "Profile"
}) {
  const { theme, toggleTheme } = useTheme();

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
        <button className="icon-button"><Bell size={20} /></button>
        <button className="profile-button">{profileLabel}</button>
      </div>
    </header>
  )
}
