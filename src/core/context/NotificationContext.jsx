import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { Notification } from '../models'

const NotificationContext = createContext()

const buildMockNotifications = () => {
  return {
    admin: [
      new Notification({
        notificationId: 'notif-adm-1',
        userId: 'admin',
        title: 'New Advocate Application',
        message: 'Adv. Rajesh Kumar has submitted a new registration request.',
        createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        isRead: false,
        type: 'alert'
      }),
      new Notification({
        notificationId: 'notif-adm-2',
        userId: 'admin',
        title: 'Critical Support Report',
        message: 'Client Lee reported an access issue on payments page.',
        createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        isRead: false,
        type: 'warning'
      }),
      new Notification({
        notificationId: 'notif-adm-3',
        userId: 'admin',
        title: 'System Health Check',
        message: 'Automated backup completed successfully.',
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        isRead: true,
        type: 'success'
      }),
      new Notification({
        notificationId: 'notif-adm-4',
        userId: 'admin',
        title: 'User Feedback',
        message: 'Client Priya left a 5-star rating on Consultation flow.',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        isRead: true,
        type: 'info'
      })
    ],
    advocate: [
      new Notification({
        notificationId: 'notif-adv-1',
        userId: 'advocate',
        title: 'Hearing Scheduled',
        message: 'Case #2901 (Sharma vs State) scheduled for 24th May.',
        createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        isRead: false,
        type: 'alert'
      }),
      new Notification({
        notificationId: 'notif-adv-2',
        userId: 'advocate',
        title: 'New Message from Client',
        message: 'Rahul Dev sent a new document for your review.',
        createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        isRead: false,
        type: 'info'
      }),
      new Notification({
        notificationId: 'notif-adv-3',
        userId: 'advocate',
        title: 'Consultation Confirmed',
        message: 'Payment of ₹500 received for consultation slot.',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        isRead: true,
        type: 'success'
      }),
      new Notification({
        notificationId: 'notif-adv-4',
        userId: 'advocate',
        title: 'Platform Update',
        message: 'Advanced document sharing is now enabled for all advocates.',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        isRead: true,
        type: 'info'
      })
    ],
    client: [
      new Notification({
        notificationId: 'notif-cli-1',
        userId: 'client',
        title: 'Advocate Accepted Consultation',
        message: 'Adv. Rajesh Kumar has accepted your request for tomorrow 10:00 AM.',
        createdAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
        isRead: false,
        type: 'success'
      }),
      new Notification({
        notificationId: 'notif-cli-2',
        userId: 'client',
        title: 'Case Hearing Date Set',
        message: 'Your case tracking has been updated with a new hearing date.',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        isRead: false,
        type: 'info'
      }),
      new Notification({
        notificationId: 'notif-cli-3',
        userId: 'client',
        title: 'Document Requested',
        message: 'Your advocate requested a scanned copy of your ID proof.',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        isRead: true,
        type: 'warning'
      }),
      new Notification({
        notificationId: 'notif-cli-4',
        userId: 'client',
        title: 'Payment Receipt',
        message: 'Invoice #L24-9024 for ₹500 consultation fee paid.',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        isRead: true,
        type: 'success'
      })
    ]
  }
}

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState([])

  // Load appropriate notifications when user logs in or role changes
  useEffect(() => {
    if (user && user.role) {
      const role = user.role.toLowerCase()
      const mockData = buildMockNotifications()
      setNotifications(mockData[role] || [])
    } else {
      setNotifications([])
      setIsOpen(false)
    }
  }, [user])

  const unreadCount = notifications.filter(n => !n.isRead).length

  const toggleNotifications = () => {
    setIsOpen(prev => !prev)
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
  }

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const addNotification = (title, message, type = 'info') => {
    const newNotif = new Notification({
      notificationId: `notif-new-${Date.now()}`,
      userId: user?.role || 'general',
      title,
      message,
      type,
      isRead: false,
      createdAt: new Date().toISOString()
    })
    setNotifications(prev => [newNotif, ...prev])
  }

  const value = {
    isOpen,
    setIsOpen,
    notifications,
    unreadCount,
    toggleNotifications,
    markAllAsRead,
    markAsRead,
    clearAll,
    addNotification
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}
