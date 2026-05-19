import React, { useRef, useEffect } from 'react'
import { X, CheckCheck, Trash2, BellOff, AlertTriangle, CheckCircle2, Info, AlertCircle } from 'lucide-react'
import { useNotifications } from '../../../core/context/NotificationContext'
import './notificationDrawer.css'

export default function NotificationDrawer() {
  const { 
    isOpen, 
    setIsOpen, 
    notifications, 
    unreadCount, 
    markAllAsRead, 
    markAsRead, 
    clearAll 
  } = useNotifications()
  
  const drawerRef = useRef(null)

  // Close drawer on clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (drawerRef.current && !drawerRef.current.contains(event.target) && !event.target.closest('.icon-button')) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, setIsOpen])

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={18} className="notif-icon success" />
      case 'warning':
        return <AlertTriangle size={18} className="notif-icon warning" />
      case 'alert':
        return <AlertCircle size={18} className="notif-icon alert" />
      case 'info':
      default:
        return <Info size={18} className="notif-icon info" />
    }
  }

  return (
    <>
      {/* Backdrop overlay */}
      <div className={`notif-backdrop ${isOpen ? 'show' : ''}`} onClick={() => setIsOpen(false)} />

      {/* Slide-out Drawer */}
      <aside 
        ref={drawerRef}
        className={`notif-drawer ${isOpen ? 'open' : ''}`}
      >
        <div className="notif-header">
          <div className="notif-header-title">
            <h2>Notifications</h2>
            {unreadCount > 0 && <span className="notif-badge">{unreadCount} new</span>}
          </div>
          <button className="notif-close-btn" onClick={() => setIsOpen(false)} aria-label="Close notifications">
            <X size={20} />
          </button>
        </div>

        <div className="notif-actions-bar">
          {unreadCount > 0 && (
            <button className="notif-action-btn" onClick={markAllAsRead}>
              <CheckCheck size={14} /> Mark all read
            </button>
          )}
          {notifications.length > 0 && (
            <button className="notif-action-btn delete" onClick={clearAll}>
              <Trash2 size={14} /> Clear all
            </button>
          )}
        </div>

        <div className="notif-list">
          {notifications.length === 0 ? (
            <div className="notif-empty-state">
              <BellOff size={40} className="empty-bell" />
              <h3>All caught up!</h3>
              <p>You have no notifications at the moment.</p>
            </div>
          ) : (
            notifications.map((item) => (
              <div 
                key={item.id} 
                className={`notif-item ${!item.isRead ? 'unread' : ''}`}
                onClick={() => markAsRead(item.id)}
              >
                {getIcon(item.type)}
                <div className="notif-item-body">
                  <h4>{item.title}</h4>
                  <p>{item.message}</p>
                  <span className="notif-time">{item.time}</span>
                </div>
                {!item.isRead && <span className="unread-dot" />}
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  )
}
