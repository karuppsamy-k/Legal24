import { useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import '../dashboard/dashboard.css'
import { useAuth } from '../../../core/context/AuthContext'
import { useTheme } from '../../../core/context/ThemeContext'
import { LogOut } from 'lucide-react'
import TopBar from '../../../shared/components/organisms/TopBar'

const users = [
  { id: 1, name: 'Maria Khan', email: 'maria@example.com', status: 'Active', joined: '08/2023', phone: '+91-9876543210' },
  { id: 2, name: 'David Chen', email: 'david@example.com', status: 'Active', joined: '02/2023', phone: '+91-8765432109' },
  { id: 3, name: 'Sarah Lee', email: 'sarah@example.com', status: 'Inactive', joined: '03/2023', phone: '+91-7654321098' },
  { id: 4, name: 'Aditya Verma', email: 'aditya@example.com', status: 'Active', joined: '07/2023', phone: '+91-6543210987' },
]

export default function UsersPage() {
  const { sidebarOpen, setSidebarOpen } = useOutletContext()
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [userList, setUserList] = useState(() => {
    const stored = localStorage.getItem('legal24_users');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Filter out admin and advocate users, keeping only clients
      const clientsOnly = parsed.filter(u => u.role === 'client');
      // Merge with base users ensuring no duplicates by email
      const merged = [...clientsOnly];
      users.forEach(mockUser => {
        if (!merged.some(u => u.email === mockUser.email)) {
          merged.push({
            id: mockUser.id,
            name: mockUser.name,
            email: mockUser.email,
            status: mockUser.status,
            phone: mockUser.phone,
            joined: mockUser.joined
          });
        }
      });
      return merged;
    }
    return users;
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'Active'
  });

  const saveUsers = (updatedList) => {
    setUserList(updatedList);
    const allUsers = JSON.parse(localStorage.getItem('legal24_users') || '[]');
    const nonClients = allUsers.filter(u => u.role !== 'client');
    const updatedClients = updatedList.map(u => ({
      uid: u.uid || `uid-${u.id}`,
      name: u.name,
      email: u.email,
      phone: u.phone,
      role: 'client',
      status: u.status,
      joined: u.joined || new Date().toLocaleDateString('en-GB')
    }));
    localStorage.setItem('legal24_users', JSON.stringify([...nonClients, ...updatedClients]));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.phone) {
      alert('Please fill out all required fields.');
      return;
    }

    const userObj = {
      id: Date.now(),
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      status: newUser.status,
      joined: new Date().toLocaleDateString('en-GB')
    };

    saveUsers([userObj, ...userList]);
    setNewUser({
      name: '',
      email: '',
      phone: '',
      status: 'Active'
    });
    setIsAddModalOpen(false);
  };

  const handleRemove = (id) => {
    if (window.confirm('Are you sure you want to remove this user?')) {
      const updated = userList.filter(u => u.id !== id);
      saveUsers(updated);
    }
  };

  return (
    <>
      <TopBar 
        title="Platform Users"
        subtitle="USER MANAGEMENT"
        isSidebarOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen(true)}
      />

      <section className="dashboard-grid fade-up">
        <article className="panel" style={{ gridColumn: '1 / -1' }}>
          <div className="panel-header">
            <div>
              <h2>User Directory</h2>
              <p>Manage and monitor all registered users</p>
            </div>
            <button 
              type="button" 
              onClick={() => setIsAddModalOpen(true)}
              style={{ padding: '8px 16px', background: '#6c9cff', border: 'none', borderRadius: '6px', color: '#fff', cursor: 'pointer', fontWeight: '600' }}
            >
              + Add User
            </button>
          </div>
          <div className="table-grid">
            {userList.length === 0 ? (
              <div style={{ padding: '40px 20px', textAlign: 'center', color: '#9aa6d2' }}>
                No platform users found.
              </div>
            ) : (
              userList.map((userItem) => (
                <div key={userItem.id} className="table-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ 
                      width: '36px', 
                      height: '36px', 
                      borderRadius: '8px', 
                      background: 'linear-gradient(135deg, #a855f7, #6c9cff)', 
                      display: 'grid', 
                      placeItems: 'center', 
                      color: '#fff', 
                      fontSize: '13px', 
                      fontWeight: 'bold',
                      flexShrink: 0
                    }}>
                      {userItem.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="user-info">
                      <strong>{userItem.name}</strong>
                      <span>{userItem.email}</span>
                    </div>
                  </div>
                   <div className="user-contact">
                    <span style={{ color: 'var(--text-secondary)' }}>{userItem.phone}</span>
                  </div>
                  <div className="user-status">
                    <div style={{ 
                      padding: '4px 12px', 
                      background: userItem.status === 'Active' 
                        ? (theme === 'light' ? 'rgba(5, 150, 105, 0.15)' : 'rgba(76, 225, 177, 0.16)') 
                        : (theme === 'light' ? 'rgba(100, 116, 139, 0.15)' : 'rgba(155, 155, 155, 0.16)'), 
                      color: userItem.status === 'Active' 
                        ? (theme === 'light' ? '#059669' : '#4ce1b1') 
                        : (theme === 'light' ? '#475569' : '#9aa6d2'), 
                      borderRadius: '4px', 
                      fontSize: '13px',
                      fontWeight: '600',
                      display: 'inline-block'
                    }}>
                      {userItem.status}
                    </div>
                  </div>
                  <div className="user-actions" style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => handleRemove(userItem.id)}
                      className="btn-reject-action"
                      style={{ flex: 1, padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </article>
      </section>

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="profile-modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="profile-modal-card" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsAddModalOpen(false)}>&times;</button>
            <div className="modal-header" style={{ marginBottom: '20px' }}>
              <div className="modal-avatar" style={{ background: 'linear-gradient(135deg, #a855f7, #6c9cff)' }}>
                +
              </div>
              <div className="modal-title-section">
                <h3>Add New User</h3>
                <span className="modal-specialization">Register a new client profile</span>
              </div>
            </div>

            <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflow: 'hidden', flex: 1 }}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingRight: '4px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', color: '#9aa6d2', fontWeight: '600' }}>Full Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Maria Khan"
                    value={newUser.name}
                    onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                    className="modal-input"
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', color: '#9aa6d2', fontWeight: '600' }}>Email Address *</label>
                  <input 
                    type="email" 
                    required
                    placeholder="e.g. maria@example.com"
                    value={newUser.email}
                    onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                    className="modal-input"
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', color: '#9aa6d2', fontWeight: '600' }}>Phone Number *</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={newUser.phone}
                    onChange={(e) => setNewUser(prev => ({ ...prev, phone: e.target.value }))}
                    className="modal-input"
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', color: '#9aa6d2', fontWeight: '600' }}>Account Status</label>
                  <select 
                    value={newUser.status}
                    onChange={(e) => setNewUser(prev => ({ ...prev, status: e.target.value }))}
                    className="modal-select"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer" style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
                <button 
                  type="button" 
                  className="modal-action-btn"
                  style={{ flex: 1, background: 'rgba(255, 255, 255, 0.08)', color: 'var(--text-primary)' }}
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="modal-action-btn unblock-btn" 
                  style={{ flex: 1 }}
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
