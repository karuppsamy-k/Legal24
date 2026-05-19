import { useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../core/context/AuthContext'
import { 
  MessageSquare, 
  Search, 
  Send, 
  Paperclip, 
  MoreVertical, 
  User, 
  Phone, 
  Video,
  Clock,
  Briefcase,
  Calendar,
  FileText,
  LogOut,
  Bell,
  Settings,
  ArrowLeft
} from 'lucide-react'
import TopBar from '../../../shared/components/organisms/TopBar'
import './advocate_messages.css'
import '../dashboard/advocate_dashboard.css'

const MOCK_CHATS = [
  { id: 1, name: "Amit Kumar", lastMsg: "When is the next hearing date?", time: "10:30 AM", unread: 2 },
  { id: 2, name: "Sarah Jenkins", lastMsg: "Documents uploaded, please check.", time: "Yesterday", unread: 0 },
  { id: 3, name: "Tech Corp Admin", lastMsg: "Payment for C-215 processed.", time: "Yesterday", unread: 0 },
  { id: 4, name: "Rajesh Mehta", lastMsg: "Thank you for the advice.", time: "14 May", unread: 0 }
]

const MOCK_MESSAGES = [
  { id: 1, text: "Hello Counsel, I have some doubts regarding the property dispute case.", sent: false, time: "10:15 AM" },
  { id: 2, text: "Sure Amit, please go ahead. I'm reviewing the documents you sent.", sent: true, time: "10:20 AM" },
  { id: 3, text: "The opposite party is claiming they have the original deed. Is that possible?", sent: false, time: "10:25 AM" },
  { id: 4, text: "We need to verify that in the sub-registrar office. Don't worry, our evidence is strong.", sent: true, time: "10:28 AM" },
  { id: 5, text: "When is the next hearing date?", sent: false, time: "10:30 AM" }
]

const navItems = [
  { label: 'Dashboard', id: 'advocate-dashboard', icon: <Clock size={18} /> },
  { label: 'My Cases', id: 'advocate-cases', icon: <Briefcase size={18} /> },
  { label: 'Hearings', id: 'advocate-hearings', icon: <Calendar size={18} /> },
  { label: 'Documents', id: 'advocate-documents', icon: <FileText size={18} /> },
  { label: 'Communication', id: 'advocate-messages', icon: <MessageSquare size={18} />, active: true }
]

export default function AdvocateMessagesPage() {
  const { sidebarOpen, setSidebarOpen } = useOutletContext()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [activeChatId, setActiveChatId] = useState(1)
  const [viewingChatMobile, setViewingChatMobile] = useState(false)
  const [typedMessage, setTypedMessage] = useState('')
  const [chatMessages, setChatMessages] = useState(MOCK_MESSAGES)

  const activeChat = MOCK_CHATS.find(c => c.id === activeChatId) || MOCK_CHATS[0]

  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (!typedMessage.trim()) return;
    
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setChatMessages(prev => [
      ...prev,
      {
        id: prev.length + 1,
        text: typedMessage,
        sent: true,
        time: timeStr
      }
    ]);
    setTypedMessage('');
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout()
    }
  }

  return (
    <>
      <TopBar 
        title="Client Messaging"
        subtitle="Communication"
        isSidebarOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen(true)}
        actions={
          <>
            <button className="icon-button"><Phone size={20} /></button>
            <button className="icon-button"><Video size={20} /></button>
          </>
        }
      />

      <div className={`messages-shell fade-up ${viewingChatMobile ? 'mobile-show-view' : 'mobile-show-list'}`}>
        <section className="chat-list">
          <div className="chat-list-header">
            <div className="search-bar" style={{ width: '100%' }}>
              <Search size={16} />
              <input type="text" placeholder="Search chats..." />
            </div>
          </div>
          <div className="chat-list-items">
            {MOCK_CHATS.map(chat => (
              <div 
                key={chat.id} 
                className={`chat-item ${chat.id === activeChatId ? 'active' : ''}`}
                onClick={() => {
                  setActiveChatId(chat.id);
                  setViewingChatMobile(true);
                }}
              >
                <div className="chat-avatar">{chat.name[0]}</div>
                <div className="chat-info">
                  <h4>{chat.name} <span className="chat-time">{chat.time}</span></h4>
                  <p>{chat.id === activeChatId && chatMessages.length > 0 ? chatMessages[chatMessages.length - 1].text : chat.lastMsg}</p>
                </div>
                {chat.unread > 0 && chat.id !== activeChatId && <span className="unread-badge">{chat.unread}</span>}
              </div>
            ))}
          </div>
        </section>

        <section className="chat-view">
          <div className="chat-view-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button 
                type="button" 
                className="chat-back-btn" 
                onClick={() => setViewingChatMobile(false)}
                title="Back to Chats"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="chat-avatar" style={{ width: '40px', height: '40px' }}>{activeChat.name[0]}</div>
              <div>
                <h4 style={{ margin: 0, color: '#fff' }}>{activeChat.name}</h4>
                <span className="online-indicator">Online</span>
              </div>
            </div>
            <button className="icon-only"><MoreVertical size={20} /></button>
          </div>

          <div className="chat-messages">
            {chatMessages.map(msg => (
              <div key={msg.id} className={`message-bubble ${msg.sent ? 'sent' : 'received'}`}>
                <div className="message-text">{msg.text}</div>
                <div className="message-time">{msg.time}</div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="chat-input-area">
            <button type="button" className="icon-only" style={{ color: '#94a3b8' }}><Paperclip size={20} /></button>
            <div className="chat-input-wrapper">
              <input 
                type="text" 
                placeholder="Type a message" 
                value={typedMessage}
                onChange={e => setTypedMessage(e.target.value)}
              />
            </div>
            <button type="submit" className="send-btn"><Send size={18} /></button>
          </form>
        </section>
      </div>
    </>
  )
}
