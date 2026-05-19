import { useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import '../dashboard/dashboard.css'
import { useAuth } from '../../../core/context/AuthContext'
import { useTheme } from '../../../core/context/ThemeContext'
import { LogOut, CheckCircle2 } from 'lucide-react'
import TopBar from '../../../shared/components/organisms/TopBar'

const advocates = [
  { id: 1, name: 'Advocate Ravi Gupta', specialization: 'Criminal Law', cases: 8, status: 'Active', experience: '15 years', rating: '4.8', email: 'ravi.gupta@legal24.com', phone: '+91 98765 43210', practiceCourts: ['High Court', 'District Court'] },
  { id: 2, name: 'Advocate Neha Sharma', specialization: 'Civil Law', cases: 12, status: 'Active', experience: '10 years', rating: '4.9', email: 'neha.sharma@legal24.com', phone: '+91 98765 43211', practiceCourts: ['District Court', 'Family Court'] },
  { id: 3, name: 'Advocate Arun Patel', specialization: 'Corporate Law', cases: 5, status: 'Active', experience: '8 years', rating: '4.7', email: 'arun.patel@legal24.com', phone: '+91 98765 43212', practiceCourts: ['High Court', 'National Company Law Tribunal'] },
  { id: 4, name: 'Advocate Priya Singh', specialization: 'Family Law', cases: 14, status: 'Active', experience: '12 years', rating: '4.6', email: 'priya.singh@legal24.com', phone: '+91 98765 43213', practiceCourts: ['Family Court', 'High Court'] },
]

export default function AdvocatesPage() {
  const { sidebarOpen, setSidebarOpen } = useOutletContext()
  const { user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [advocateList, setAdvocateList] = useState(() => {
    const dynamicAdvocates = JSON.parse(localStorage.getItem('legal24_advocates') || '[]');
    const approvedDynamic = dynamicAdvocates.filter(a => a.status === 'approved' || a.status === 'rejected');
    return [...approvedDynamic, ...advocates];
  });

  const [selectedAdvocate, setSelectedAdvocate] = useState(null);
  const [activeTab, setActiveTab] = useState('registered'); // 'registered', 'blocked', 'rejected'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newAdvocate, setNewAdvocate] = useState({
    name: '',
    specialization: 'Criminal Defense',
    experience: '',
    email: '',
    phone: '',
    barCouncilId: '',
    practiceCourts: '',
    verificationDoc: '',
    image: ''
  });

  const handleBlockToggle = (id) => {
    setAdvocateList(prev => prev.map(adv => {
      if (adv.id === id) {
        const nextBlockedState = !adv.isBlocked;
        // Update local storage for persistence
        if (adv.email) {
          const dynamicAdvocates = JSON.parse(localStorage.getItem('legal24_advocates') || '[]');
          const updated = dynamicAdvocates.map(a => {
            if (a.email === adv.email) {
              return { ...a, isBlocked: nextBlockedState };
            }
            return a;
          });
          localStorage.setItem('legal24_advocates', JSON.stringify(updated));
        }
        return { ...adv, isBlocked: nextBlockedState };
      }
      return adv;
    }));
  };

  const handleApprove = (id) => {
    setAdvocateList(prev => prev.map(adv => {
      if (adv.id === id) {
        const updatedAdv = { ...adv, status: 'approved' };
        if (adv.email) {
          const dynamicAdvocates = JSON.parse(localStorage.getItem('legal24_advocates') || '[]');
          const updated = dynamicAdvocates.map(a => {
            if (a.email === adv.email) {
              return { ...a, status: 'approved' };
            }
            return a;
          });
          localStorage.setItem('legal24_advocates', JSON.stringify(updated));

          const registeredUsers = JSON.parse(localStorage.getItem('legal24_users') || '[]');
          const updatedUsers = registeredUsers.map(u => {
            if (u.email === adv.email) {
              return { ...u, status: 'approved' };
            }
            return u;
          });
          localStorage.setItem('legal24_users', JSON.stringify(updatedUsers));
        }
        return updatedAdv;
      }
      return adv;
    }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newAdvocate.name || !newAdvocate.experience || !newAdvocate.email || !newAdvocate.barCouncilId || !newAdvocate.verificationDoc) {
      alert('Please fill out all required fields, including the Bar Council Enrollment ID and verification document.');
      return;
    }

    const formattedName = newAdvocate.name.toLowerCase().startsWith('advocate')
      ? newAdvocate.name
      : `Advocate ${newAdvocate.name}`;

    const advocateObj = {
      id: Date.now(),
      name: formattedName,
      specialization: newAdvocate.specialization,
      experience: `${newAdvocate.experience} years`,
      cases: 0,
      status: 'approved',
      rating: '5.0',
      email: newAdvocate.email,
      phone: newAdvocate.phone || '+91 98765 43210',
      barCouncilId: newAdvocate.barCouncilId,
      practiceCourts: newAdvocate.practiceCourts 
        ? newAdvocate.practiceCourts.split(',').map(c => c.trim()).filter(Boolean) 
        : ['District Court', 'High Court'],
      verificationDoc: newAdvocate.verificationDoc,
      image: newAdvocate.image || '',
      isBlocked: false
    };

    // Update list
    setAdvocateList(prev => [advocateObj, ...prev]);

    // Save to localStorage
    const dynamicAdvocates = JSON.parse(localStorage.getItem('legal24_advocates') || '[]');
    localStorage.setItem('legal24_advocates', JSON.stringify([advocateObj, ...dynamicAdvocates]));

    // Reset and close
    setNewAdvocate({
      name: '',
      specialization: 'Criminal Defense',
      experience: '',
      email: '',
      phone: '',
      barCouncilId: '',
      practiceCourts: '',
      verificationDoc: '',
      image: ''
    });
    setIsAddModalOpen(false);
  };

  const filteredList = advocateList.filter(adv => {
    if (activeTab === 'blocked') {
      return adv.isBlocked === true;
    }
    if (activeTab === 'rejected') {
      return adv.status === 'rejected';
    }
    return adv.isBlocked !== true && adv.status !== 'rejected';
  });

  return (
    <>
      <TopBar 
        title="Registered Advocates"
        subtitle="ADVOCATE MANAGEMENT"
        isSidebarOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen(true)}
      />

      <section className="dashboard-grid fade-up">
        <article className="panel" style={{ gridColumn: '1 / -1' }}>
          <div className="panel-header">
            <div>
              <h2>Advocate Directory</h2>
              <p>Monitor and manage verified legal professionals</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div className="filter-chips">
                <button 
                  onClick={() => setActiveTab('registered')}
                  className={`chip ${activeTab === 'registered' ? 'active' : ''}`}
                >
                  Registered ({advocateList.filter(a => !a.isBlocked && a.status !== 'rejected').length})
                </button>
                <button 
                  onClick={() => setActiveTab('blocked')}
                  className={`chip ${activeTab === 'blocked' ? 'active-blocked' : ''}`}
                >
                  Blocked ({advocateList.filter(a => a.isBlocked).length})
                </button>
                <button 
                  onClick={() => setActiveTab('rejected')}
                  className={`chip ${activeTab === 'rejected' ? 'active-rejected' : ''}`}
                >
                  Rejected ({advocateList.filter(a => a.status === 'rejected').length})
                </button>
              </div>
              <button 
                type="button" 
                onClick={() => setIsAddModalOpen(true)}
                style={{ padding: '8px 16px', background: '#6c9cff', border: 'none', borderRadius: '6px', color: '#fff', cursor: 'pointer', fontWeight: '600' }}
              >
                + Add Advocate
              </button>
            </div>
          </div>
          <div className="table-grid">
            {filteredList.length === 0 ? (
              <div style={{ padding: '40px 20px', textAlign: 'center', color: '#9aa6d2' }}>
                No advocates found in this category.
              </div>
            ) : (
              filteredList.map((advocate) => (
                <div key={advocate.id} className="table-row">
                  <div className="user-info">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {advocate.image ? (
                        <img 
                          src={advocate.image} 
                          alt={advocate.name} 
                          style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }}
                        />
                      ) : (
                        <div style={{ 
                          width: '36px', 
                          height: '36px', 
                          borderRadius: '8px', 
                          background: 'linear-gradient(135deg, #6c9cff, #a855f7)', 
                          display: 'grid', 
                          placeItems: 'center', 
                          color: '#fff', 
                          fontSize: '13px', 
                          fontWeight: 'bold',
                          flexShrink: 0
                        }}>
                          {advocate.name.split(' ').filter(n => n.toLowerCase() !== 'advocate').map(n => n[0]).join('')}
                        </div>
                      )}
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                          <strong style={{ display: 'inline-flex', alignItems: 'center' }}>{advocate.name}</strong>
                          {advocate.status !== 'rejected' && (
                            <CheckCircle2 size={14} style={{ color: '#6c9cff', flexShrink: 0 }} fill="rgba(108, 156, 255, 0.2)" title="Verified Advocate" />
                          )}
                          {advocate.isBlocked && (
                            <span style={{ fontSize: '10px', background: theme === 'light' ? 'rgba(220, 38, 38, 0.15)' : 'rgba(255, 87, 87, 0.2)', color: theme === 'light' ? '#dc2626' : '#ff8888', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>BLOCKED</span>
                          )}
                          {advocate.status === 'rejected' && (
                            <span style={{ fontSize: '10px', background: theme === 'light' ? 'rgba(217, 119, 6, 0.15)' : 'rgba(255, 214, 138, 0.2)', color: theme === 'light' ? '#d97706' : '#ffd68a', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>REJECTED</span>
                          )}
                        </div>
                        <span style={{ marginTop: '2px' }}>{advocate.specialization} • {advocate.experience}</span>
                      </div>
                    </div>
                  </div>
                  <div className="user-contact">
                    <span style={{ color: 'var(--text-secondary)' }}>{advocate.cases || 0} Cases</span>
                  </div>
                  <div className="user-status">
                    <span style={{ color: '#ffd700', fontSize: '13px' }}>⭐ {advocate.rating || '5.0'}</span>
                  </div>
                  <div className="user-actions" style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => setSelectedAdvocate(advocate)}
                      style={{ flex: 1, padding: '8px 12px', background: 'rgba(108, 156, 255, 0.16)', color: '#7fb2ff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}
                    >
                      Profile
                    </button>
                    {advocate.status === 'rejected' ? (
                      <button 
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to approve ${advocate.name}?`)) {
                            handleApprove(advocate.id);
                          }
                        }}
                        className="btn-approve-action"
                        style={{ 
                          flex: 1, 
                          padding: '8px 12px', 
                          border: 'none', 
                          borderRadius: '4px', 
                          cursor: 'pointer', 
                          fontSize: '12px',
                          fontWeight: '600'
                        }}
                      >
                        Approve
                      </button>
                    ) : (
                      <button 
                        onClick={() => {
                          const confirmText = advocate.isBlocked 
                            ? `Are you sure you want to unblock ${advocate.name}?` 
                            : `Are you sure you want to block ${advocate.name}?`;
                          if (window.confirm(confirmText)) {
                            handleBlockToggle(advocate.id);
                          }
                        }}
                        className={advocate.isBlocked ? "btn-approve-action" : "btn-reject-action"}
                        style={{ 
                          flex: 1, 
                          padding: '8px 12px', 
                          border: 'none', 
                          borderRadius: '4px', 
                          cursor: 'pointer', 
                          fontSize: '12px',
                          fontWeight: '600'
                        }}
                      >
                        {advocate.isBlocked ? 'Unblock' : 'Block'}
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </article>
      </section>

      {/* Profile Modal */}
      {selectedAdvocate && (
        <div className="profile-modal-overlay" onClick={() => setSelectedAdvocate(null)}>
          <div className="profile-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedAdvocate(null)}>&times;</button>
            <div className="modal-header">
              {selectedAdvocate.image ? (
                <img 
                  src={selectedAdvocate.image} 
                  alt={selectedAdvocate.name} 
                  className="modal-avatar"
                  style={{ objectFit: 'cover', border: '2px solid rgba(255, 255, 255, 0.2)' }}
                />
              ) : (
                <div className="modal-avatar">
                  {selectedAdvocate.name.split(' ').filter(n => n.toLowerCase() !== 'advocate').map(n => n[0]).join('')}
                </div>
              )}
              <div className="modal-title-section">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3>{selectedAdvocate.name}</h3>
                  {selectedAdvocate.status !== 'rejected' && (
                    <CheckCircle2 size={18} style={{ color: '#6c9cff' }} fill="rgba(108, 156, 255, 0.2)" />
                  )}
                </div>
                <span className="modal-specialization">{selectedAdvocate.specialization}</span>
              </div>
            </div>

            <div className="modal-body">
              <div className="modal-section-title">Professional Overview</div>
              <div className="modal-grid">
                <div className="modal-grid-item">
                  <span className="grid-label">Experience</span>
                  <span className="grid-value">{selectedAdvocate.experience}</span>
                </div>
                <div className="modal-grid-item">
                  <span className="grid-label">Rating</span>
                  <span className="grid-value" style={{ color: '#ffd700' }}>⭐ {selectedAdvocate.rating || '5.0'}</span>
                </div>
                <div className="modal-grid-item">
                  <span className="grid-label">Cases Handled</span>
                  <span className="grid-value">{selectedAdvocate.cases || 0} Cases</span>
                </div>
                <div className="modal-grid-item">
                  <span className="grid-label">Specialization</span>
                  <span className="grid-value">{selectedAdvocate.specialization}</span>
                </div>
                <div className="modal-grid-item">
                  <span className="grid-label">Bar Enrollment ID</span>
                  <span className="grid-value" style={{ color: '#6c9cff', fontWeight: 'bold' }}>{selectedAdvocate.barCouncilId || 'N/A'}</span>
                </div>
                <div className="modal-grid-item">
                  <span className="grid-label">Verification Doc</span>
                  <span className="grid-value" style={{ color: selectedAdvocate.verificationDoc ? (theme === 'light' ? '#059669' : '#4ce1b1') : (theme === 'light' ? '#dc2626' : '#ff8888'), fontWeight: '600' }}>
                    📄 {selectedAdvocate.verificationDoc || 'No file uploaded'}
                  </span>
                </div>
              </div>

              <div className="modal-section-title" style={{ marginTop: '20px' }}>Contact Information</div>
              <div className="modal-grid">
                <div className="modal-grid-item" style={{ gridColumn: 'span 2' }}>
                  <span className="grid-label">Email Address</span>
                  <span className="grid-value">{selectedAdvocate.email || `${selectedAdvocate.name.toLowerCase().replace(/advocate\s*/, '').replace(/\s+/g, '.')}@legal24.com`}</span>
                </div>
                <div className="modal-grid-item" style={{ gridColumn: 'span 2' }}>
                  <span className="grid-label">Phone Number</span>
                  <span className="grid-value">{selectedAdvocate.phone || '+91 98765 43210'}</span>
                </div>
              </div>

              <div className="modal-section-title" style={{ marginTop: '20px' }}>Practice Details</div>
              <div className="modal-tag-container">
                <span className="modal-tag">Bar Council Verified</span>
                <span className="modal-tag">Active Status</span>
                {Array.isArray(selectedAdvocate.practiceCourts) ? (
                  selectedAdvocate.practiceCourts.map((court, i) => (
                    <span key={i} className="modal-tag court-tag">{court}</span>
                  ))
                ) : (
                  <>
                    <span className="modal-tag court-tag">District Court</span>
                    <span className="modal-tag court-tag">High Court</span>
                  </>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="modal-secondary-btn" 
                onClick={() => setSelectedAdvocate(null)}
              >
                Close
              </button>
              {selectedAdvocate.status === 'rejected' ? (
                <button 
                  className="modal-action-btn unblock-btn"
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to approve ${selectedAdvocate.name}?`)) {
                      handleApprove(selectedAdvocate.id);
                      setSelectedAdvocate(prev => ({ ...prev, status: 'approved' }));
                    }
                  }}
                >
                  Approve Advocate
                </button>
              ) : (
                <button 
                  className={`modal-action-btn ${selectedAdvocate.isBlocked ? 'unblock-btn' : 'block-btn'}`}
                  onClick={() => {
                    const confirmText = selectedAdvocate.isBlocked 
                      ? `Are you sure you want to unblock ${selectedAdvocate.name}?` 
                      : `Are you sure you want to block ${selectedAdvocate.name}?`;
                    if (window.confirm(confirmText)) {
                      handleBlockToggle(selectedAdvocate.id);
                      setSelectedAdvocate(prev => ({ ...prev, isBlocked: !prev.isBlocked }));
                    }
                  }}
                >
                  {selectedAdvocate.isBlocked ? 'Unblock Advocate' : 'Block Advocate'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Advocate Modal */}
      {isAddModalOpen && (
        <div className="profile-modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="profile-modal-card" style={{ maxWidth: '560px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsAddModalOpen(false)}>&times;</button>
            <div className="modal-header" style={{ marginBottom: '20px' }}>
              <div className="modal-avatar" style={{ background: 'linear-gradient(135deg, #4ce1b1, #6c9cff)' }}>
                +
              </div>
              <div className="modal-title-section">
                <h3>Add New Advocate</h3>
                <span className="modal-specialization">Register a new verified legal professional</span>
              </div>
            </div>

            <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflow: 'hidden', flex: 1 }}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingRight: '4px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', color: '#9aa6d2', fontWeight: '600' }}>Advocate Profile Image</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {newAdvocate.image && (
                      <img 
                        src={newAdvocate.image} 
                        alt="Preview" 
                        style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} 
                      />
                    )}
                    <div style={{ position: 'relative', flex: 1 }}>
                      <label 
                        htmlFor="adminAdvocateImage"
                        className={`modal-file-label ${newAdvocate.image ? 'selected' : ''}`}
                      >
                        📷 {newAdvocate.image ? 'Profile Image Selected' : 'Select Photo (JPG/PNG)...'}
                      </label>
                      <input 
                        id="adminAdvocateImage"
                        type="file" 
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (uploadEvent) => {
                              setNewAdvocate(prev => ({ ...prev, image: uploadEvent.target.result }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        style={{ display: 'none' }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', color: '#9aa6d2', fontWeight: '600' }}>Full Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={newAdvocate.name}
                    onChange={(e) => setNewAdvocate(prev => ({ ...prev, name: e.target.value }))}
                    className="modal-input"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', color: '#9aa6d2', fontWeight: '600' }}>Specialization</label>
                    <select 
                      value={newAdvocate.specialization}
                      onChange={(e) => setNewAdvocate(prev => ({ ...prev, specialization: e.target.value }))}
                      className="modal-select"
                    >
                      <option value="Criminal Defense">Criminal Defense</option>
                      <option value="Civil Litigation">Civil Litigation</option>
                      <option value="Corporate & Business Law">Corporate & Business Law</option>
                      <option value="Family & Divorce Law">Family & Divorce Law</option>
                      <option value="Property & Real Estate">Property & Real Estate</option>
                      <option value="Labour & Employment">Labour & Employment</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', color: '#9aa6d2', fontWeight: '600' }}>Experience (Years) *</label>
                    <input 
                      type="number" 
                      required
                      min="1"
                      max="50"
                      placeholder="e.g. 10"
                      value={newAdvocate.experience}
                      onChange={(e) => setNewAdvocate(prev => ({ ...prev, experience: e.target.value }))}
                      className="modal-input"
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', color: '#9aa6d2', fontWeight: '600' }}>Bar Council Enrollment ID *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. MAH/1024/2018"
                    value={newAdvocate.barCouncilId}
                    onChange={(e) => setNewAdvocate(prev => ({ ...prev, barCouncilId: e.target.value }))}
                    className="modal-input"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', color: '#9aa6d2', fontWeight: '600' }}>Email Address *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. ramesh@gmail.com"
                      value={newAdvocate.email}
                      onChange={(e) => setNewAdvocate(prev => ({ ...prev, email: e.target.value }))}
                      className="modal-input"
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', color: '#9aa6d2', fontWeight: '600' }}>Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="e.g. +91 98765 43210"
                      value={newAdvocate.phone}
                      onChange={(e) => setNewAdvocate(prev => ({ ...prev, phone: e.target.value }))}
                      className="modal-input"
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', color: '#9aa6d2', fontWeight: '600' }}>Practice Courts (Comma Separated)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. High Court, Supreme Court, District Court"
                    value={newAdvocate.practiceCourts}
                    onChange={(e) => setNewAdvocate(prev => ({ ...prev, practiceCourts: e.target.value }))}
                    className="modal-input"
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', color: '#9aa6d2', fontWeight: '600' }}>Verification Document (Bar Council Certificate / ID Proof) *</label>
                  <div style={{ position: 'relative' }}>
                    <label 
                      htmlFor="adminVerificationDoc"
                      className={`modal-file-label ${newAdvocate.verificationDoc ? 'selected' : ''}`}
                    >
                      📄 {newAdvocate.verificationDoc || 'Select PDF/Image file...'}
                    </label>
                    <input 
                      id="adminVerificationDoc"
                      type="file" 
                      accept="image/*,application/pdf"
                      required
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setNewAdvocate(prev => ({ ...prev, verificationDoc: file.name }));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer" style={{ marginTop: '16px', paddingBottom: '0' }}>
                <button 
                  type="button"
                  className="modal-secondary-btn" 
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="modal-action-btn unblock-btn"
                >
                  Save Advocate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
