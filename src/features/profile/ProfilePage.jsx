import React, { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { User, Shield, Key, Mail, Phone, MapPin, Save, RotateCcw, Check, Eye, EyeOff, BookOpen, Briefcase, DollarSign } from 'lucide-react'
import TopBar from '../../shared/components/organisms/TopBar'
import '../settings/settings.css'
import { useAuth } from '../../core/context/AuthContext'
import { Advocate, Client } from '../../core/models'

export default function ProfilePage() {
  const { sidebarOpen, setSidebarOpen } = useOutletContext()
  const { user } = useAuth()
  
  const [activeTab, setActiveTab] = useState('account')
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    avatar: '',
    // Admin fields
    designation: '',
    department: '',
    employeeId: '',
    officeLocation: '',
    dateJoined: '',
    // Advocate fields
    barCouncilId: '',
    specialization: '',
    experience: '',
    practiceCourts: '',
    available: true,
    // Client fields
    clientId: '',
    activeCases: 0,
    completedCases: 0,
    pendingPayments: 0
  })

  useEffect(() => {
    if (!user) return

    const defaultData = {
      fullName: user.name || 'User',
      email: user.email || '',
      phone: user.phone || '',
      avatar: user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    }

    if (user.role === 'advocate') {
      const advocates = JSON.parse(localStorage.getItem('legal24_advocates') || '[]');
      const advRecord = advocates.find(a => a.email === user.email);
      if (advRecord) {
        setProfileData({
          ...defaultData,
          phone: advRecord.phone || defaultData.phone,
          barCouncilId: advRecord.barCouncilId || 'BCI/TEMP/9999',
          specialization: advRecord.specialization || 'Criminal Law',
          experience: advRecord.experience || '5 years',
          practiceCourts: Array.isArray(advRecord.practiceCourts) ? advRecord.practiceCourts.join(', ') : (advRecord.practiceCourts || ''),
          available: advRecord.available !== undefined ? advRecord.available : true
        })
      } else {
        setProfileData({
          ...defaultData,
          barCouncilId: 'BCI/TEMP/9999',
          specialization: 'Criminal Law',
          experience: '5 years',
          practiceCourts: 'High Court, District Court',
          available: true
        })
      }
    } else if (user.role === 'client') {
      setProfileData({
        ...defaultData,
        clientId: user.clientId || 'CLI-88219',
        activeCases: 1,
        completedCases: 2,
        pendingPayments: 0
      })
    } else {
      // Admin
      setProfileData({
        ...defaultData,
        designation: 'Super Administrator',
        department: 'Compliance & Platform Security',
        employeeId: 'L24-ADM-001',
        officeLocation: 'HQ - Bangalore, India',
        dateJoined: '12 May 2026'
      })
    }
  }, [user])

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [showCurrentPass, setShowCurrentPass] = useState(false)
  const [showNewPass, setShowNewPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSaveProfile = (e) => {
    e.preventDefault()

    // Save to local session
    const updatedUser = { ...user, name: profileData.fullName, phone: profileData.phone }
    localStorage.setItem('legal24_user', JSON.stringify(updatedUser))

    // Save to advocates database if advocate
    if (user?.role === 'advocate') {
      const advocates = JSON.parse(localStorage.getItem('legal24_advocates') || '[]');
      const updatedAdvocates = advocates.map(a => {
        if (a.email === user.email) {
          return {
            ...a,
            name: profileData.fullName,
            phone: profileData.phone,
            barCouncilId: profileData.barCouncilId,
            specialization: profileData.specialization,
            experience: profileData.experience,
            practiceCourts: typeof profileData.practiceCourts === 'string' ? profileData.practiceCourts.split(',').map(s => s.trim()) : profileData.practiceCourts,
            available: profileData.available
          }
        }
        return a
      })
      localStorage.setItem('legal24_advocates', JSON.stringify(updatedAdvocates))
    }

    // Save to users database
    const allUsers = JSON.parse(localStorage.getItem('legal24_users') || '[]');
    const updatedAllUsers = allUsers.map(u => {
      if (u.email === user.email) {
        return {
          ...u,
          name: profileData.fullName,
          phone: profileData.phone
        }
      }
      return u
    })
    localStorage.setItem('legal24_users', JSON.stringify(updatedAllUsers))

    setToastMessage('Profile details updated successfully!')
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
      window.location.reload()
    }, 1500)
  }

  const handleSavePassword = (e) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New password and confirm password do not match!')
      return
    }
    setToastMessage('Security password updated successfully!')
    setShowToast(true)
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleResetProfile = () => {
    if (window.confirm('Are you sure you want to reset profile fields?')) {
      window.location.reload()
    }
  }

  return (
    <>
      <TopBar 
        title={`${user?.role ? user.role.toUpperCase() : 'USER'} Profile`}
        subtitle="PROFILE DETAILS"
        isSidebarOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen(true)}
      />

      <div className="settings-container fade-up">
        {/* Profile Tabs Navigation */}
        <div className="settings-chips-container">
          <button 
            className={`settings-chip-btn ${activeTab === 'account' ? 'active' : ''}`}
            onClick={() => setActiveTab('account')}
            type="button"
          >
            <User size={16} />
            Account Details
          </button>
          
          {user?.role === 'admin' && (
            <button 
              className={`settings-chip-btn ${activeTab === 'professional' ? 'active' : ''}`}
              onClick={() => setActiveTab('professional')}
              type="button"
            >
              <Shield size={16} />
              Professional Profile
            </button>
          )}

          {user?.role === 'advocate' && (
            <button 
              className={`settings-chip-btn ${activeTab === 'professional' ? 'active' : ''}`}
              onClick={() => setActiveTab('professional')}
              type="button"
            >
              <Briefcase size={16} />
              Professional details
            </button>
          )}

          {user?.role === 'client' && (
            <button 
              className={`settings-chip-btn ${activeTab === 'professional' ? 'active' : ''}`}
              onClick={() => setActiveTab('professional')}
              type="button"
            >
              <BookOpen size={16} />
              Case Summaries
            </button>
          )}

          <button 
            className={`settings-chip-btn ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
            type="button"
          >
            <Key size={16} />
            Security & Password
          </button>
        </div>

        {/* Profile Content Panels */}
        <main className="settings-content-panel">
          
          {/* ACCOUNT DETAILS TAB */}
          {activeTab === 'account' && (
            <form onSubmit={handleSaveProfile} className="settings-form">
              <div className="settings-section-header">
                <h2>Account Details</h2>
                <p>Manage your basic account identity, email coordinates, and profile photo.</p>
              </div>

              {/* Avatar section */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px', background: 'rgba(255, 255, 255, 0.02)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <img 
                  src={profileData.avatar} 
                  alt="User Avatar" 
                  style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #6c9cff', boxShadow: '0 0 12px rgba(108, 156, 255, 0.4)' }}
                />
                <div>
                  <h4 style={{ color: '#fff', fontSize: '15px', margin: '0 0 6px 0' }}>Profile Picture</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '12px', margin: '0 0 12px 0' }}>PNG or JPG. Max 2MB.</p>
                  <button 
                    type="button" 
                    onClick={() => {
                      const newUrl = prompt('Enter image URL:', profileData.avatar)
                      if (newUrl) handleInputChange('avatar', newUrl)
                    }}
                    style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}
                  >
                    Change Photo
                  </button>
                </div>
              </div>

              <div className="settings-form-row">
                <div className="settings-form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    className="settings-input" 
                    value={profileData.fullName}
                    onChange={e => handleInputChange('fullName', e.target.value)}
                    required
                  />
                </div>
                <div className="settings-form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    className="settings-input" 
                    value={profileData.email}
                    disabled
                    style={{ opacity: 0.7, cursor: 'not-allowed' }}
                  />
                </div>
              </div>

              <div className="settings-form-row">
                <div className="settings-form-group">
                  <label>Mobile Number</label>
                  <input 
                    type="text" 
                    className="settings-input" 
                    value={profileData.phone}
                    onChange={e => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="settings-actions">
                <button 
                  type="button" 
                  className="btn-settings-reset"
                  onClick={handleResetProfile}
                >
                  <RotateCcw size={16} />
                  Reset Fields
                </button>
                <button 
                  type="submit" 
                  className="btn-settings-save"
                >
                  <Save size={16} />
                  Save Profile
                </button>
              </div>
            </form>
          )}

          {/* DYNAMIC SECOND TAB BY ROLE */}
          {activeTab === 'professional' && (
            <form onSubmit={handleSaveProfile} className="settings-form">
              
              {/* ADMIN VIEW */}
              {user?.role === 'admin' && (
                <>
                  <div className="settings-section-header">
                    <h2>Professional Credentials</h2>
                    <p>Read-only information identifying your deployment details within Legal 24 structure.</p>
                  </div>

                  <div className="settings-form-row">
                    <div className="settings-form-group">
                      <label>System Designation</label>
                      <input 
                        type="text" 
                        className="settings-input" 
                        value={profileData.designation}
                        disabled
                        style={{ opacity: 0.7, cursor: 'not-allowed' }}
                      />
                    </div>
                    <div className="settings-form-group">
                      <label>Admin Department</label>
                      <input 
                        type="text" 
                        className="settings-input" 
                        value={profileData.department}
                        disabled
                        style={{ opacity: 0.7, cursor: 'not-allowed' }}
                      />
                    </div>
                  </div>

                  <div className="settings-form-row">
                    <div className="settings-form-group">
                      <label>Employee Identifier (ID)</label>
                      <input 
                        type="text" 
                        className="settings-input" 
                        value={profileData.employeeId}
                        disabled
                        style={{ opacity: 0.7, cursor: 'not-allowed' }}
                      />
                    </div>
                    <div className="settings-form-group">
                      <label>Office Branch Location</label>
                      <input 
                        type="text" 
                        className="settings-input" 
                        value={profileData.officeLocation}
                        disabled
                        style={{ opacity: 0.7, cursor: 'not-allowed' }}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* ADVOCATE VIEW */}
              {user?.role === 'advocate' && (
                <>
                  <div className="settings-section-header">
                    <h2>Advocate Verification & Professional Profile</h2>
                    <p>Manage your Bar Council registrations, practice details, and availability status.</p>
                  </div>

                  <div className="settings-form-row">
                    <div className="settings-form-group">
                      <label>Bar Council Enrollment ID</label>
                      <input 
                        type="text" 
                        className="settings-input" 
                        value={profileData.barCouncilId}
                        onChange={e => handleInputChange('barCouncilId', e.target.value)}
                        required
                      />
                    </div>
                    <div className="settings-form-group">
                      <label>Area of Specialization</label>
                      <select 
                        className="settings-select"
                        value={profileData.specialization}
                        onChange={e => handleInputChange('specialization', e.target.value)}
                      >
                        <option>Criminal Law</option>
                        <option>Civil Law</option>
                        <option>Corporate Law</option>
                        <option>Family Law</option>
                        <option>Property Law</option>
                      </select>
                    </div>
                  </div>

                  <div className="settings-form-row">
                    <div className="settings-form-group">
                      <label>Years of Practice Experience</label>
                      <input 
                        type="text" 
                        className="settings-input" 
                        value={profileData.experience}
                        onChange={e => handleInputChange('experience', e.target.value)}
                        required
                      />
                    </div>
                    <div className="settings-form-group">
                      <label>Practice Courts (comma separated)</label>
                      <input 
                        type="text" 
                        className="settings-input" 
                        value={profileData.practiceCourts}
                        onChange={e => handleInputChange('practiceCourts', e.target.value)}
                        required
                        placeholder="High Court, District Court"
                      />
                    </div>
                  </div>

                  <div className="settings-form-group full-width">
                    <div className="toggle-group">
                      <div className="toggle-group-info">
                        <span className="toggle-group-title">Consultation Availability</span>
                        <span className="toggle-group-desc">Toggle your availability status to receive new consultation bookings from citizens.</span>
                      </div>
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={profileData.available}
                          onChange={e => handleInputChange('available', e.target.checked)}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>

                  <div className="settings-actions">
                    <button 
                      type="button" 
                      className="btn-settings-reset"
                      onClick={handleResetProfile}
                    >
                      <RotateCcw size={16} />
                      Reset Fields
                    </button>
                    <button 
                      type="submit" 
                      className="btn-settings-save"
                    >
                      <Save size={16} />
                      Save Details
                    </button>
                  </div>
                </>
              )}

              {/* CLIENT VIEW */}
              {user?.role === 'client' && (
                <>
                  <div className="settings-section-header">
                    <h2>Case Summaries & Platform Stats</h2>
                    <p>Summary of your legal file engagements and payments on Legal 24.</p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', margin: '24px 0' }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                      <span style={{ display: 'block', color: '#9aa6d2', fontSize: '13px', marginBottom: '8px' }}>Active Cases</span>
                      <strong style={{ fontSize: '28px', color: '#6c9cff' }}>{profileData.activeCases}</strong>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                      <span style={{ display: 'block', color: '#9aa6d2', fontSize: '13px', marginBottom: '8px' }}>Completed Cases</span>
                      <strong style={{ fontSize: '28px', color: '#4ce1b1' }}>{profileData.completedCases}</strong>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                      <span style={{ display: 'block', color: '#9aa6d2', fontSize: '13px', marginBottom: '8px' }}>Pending Invoices</span>
                      <strong style={{ fontSize: '28px', color: '#ffd68a' }}>{profileData.pendingPayments}</strong>
                    </div>
                  </div>

                  <div className="settings-form-row">
                    <div className="settings-form-group">
                      <label>Citizen Client ID</label>
                      <input 
                        type="text" 
                        className="settings-input" 
                        value={profileData.clientId}
                        disabled
                        style={{ opacity: 0.7, cursor: 'not-allowed' }}
                      />
                    </div>
                  </div>
                </>
              )}

            </form>
          )}

          {/* SECURITY & PASSWORD TAB */}
          {activeTab === 'security' && (
            <form onSubmit={handleSavePassword} className="settings-form">
              <div className="settings-section-header">
                <h2>Security Settings</h2>
                <p>Update your account credentials periodically to keep your profile secure.</p>
              </div>

              <div className="settings-form-group full-width">
                <label>Current Password</label>
                <div className="input-with-action">
                  <input 
                    type={showCurrentPass ? 'text' : 'password'} 
                    className="settings-input" 
                    value={passwordData.currentPassword}
                    onChange={e => handlePasswordChange('currentPassword', e.target.value)}
                    required
                  />
                  <button 
                    type="button" 
                    className="input-action-btn"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                  >
                    {showCurrentPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="settings-form-row">
                <div className="settings-form-group">
                  <label>New Password</label>
                  <div className="input-with-action">
                    <input 
                      type={showNewPass ? 'text' : 'password'} 
                      className="settings-input" 
                      value={passwordData.newPassword}
                      onChange={e => handlePasswordChange('newPassword', e.target.value)}
                      required
                    />
                    <button 
                      type="button" 
                      className="input-action-btn"
                      onClick={() => setShowNewPass(!showNewPass)}
                    >
                      {showNewPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div className="settings-form-group">
                  <label>Confirm New Password</label>
                  <div className="input-with-action">
                    <input 
                      type={showConfirmPass ? 'text' : 'password'} 
                      className="settings-input" 
                      value={passwordData.confirmPassword}
                      onChange={e => handlePasswordChange('confirmPassword', e.target.value)}
                      required
                    />
                    <button 
                      type="button" 
                      className="input-action-btn"
                      onClick={() => setShowConfirmPass(!showConfirmPass)}
                    >
                      {showConfirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="settings-actions">
                <button 
                  type="submit" 
                  className="btn-settings-save"
                >
                  <Save size={16} />
                  Update Password
                </button>
              </div>
            </form>
          )}

        </main>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="settings-toast">
          <Check size={18} color="var(--accent-green)" />
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  )
}
