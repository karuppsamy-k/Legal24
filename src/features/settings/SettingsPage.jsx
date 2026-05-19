import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Settings, Globe, Lock, Bell, Sliders, Database, Save, RotateCcw, Check, Eye, EyeOff, Info, HelpCircle } from 'lucide-react'
import TopBar from '../../shared/components/organisms/TopBar'
import './settings.css'

// Default values representing production defaults
const PRODUCTION_DEFAULTS = {
  // General
  platformName: 'Legal 24',
  supportEmail: 'support@legal24.in',
  systemPhone: '+91 96632 02292',
  maintenanceMode: false,
  language: 'English',
  timezone: 'IST (UTC+05:30)',

  // Security
  passwordExpiry: '90 Days',
  enable2fa: false,
  sessionTimeout: 30, // minutes
  allowedIps: '*',

  // Notifications
  notifyAdvocateSignup: true,
  notifyCaseEscalation: true,
  notifyFeedback: false,
  notifyUrgentHearingSms: true,
  notifySystemFailureSms: true,

  // Portal Control
  autoApproveAdvocates: false,
  minConsultationFee: 500,
  platformFeePercent: 15,
  maxActiveCasesPerClient: 10,

  // Integrations
  paymentGatewayMode: 'Sandbox',
  razorpayKey: 'rzp_test_K29sDklas129a',
  twilioSid: 'AC2a838fac8d2039a0ef3b40a3f90e8',
  s3BucketName: 'legal24-document-vault-prod'
}

export default function SettingsPage() {
  const { sidebarOpen, setSidebarOpen } = useOutletContext()
  const [activeTab, setActiveTab] = useState('general')
  const [settings, setSettings] = useState({ ...PRODUCTION_DEFAULTS })
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [showRazorpayKey, setShowRazorpayKey] = useState(false)
  const [showTwilioSid, setShowTwilioSid] = useState(false)

  const handleInputChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    // Simulate API saving
    setToastMessage('Settings saved successfully!')
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
    }, 3000)
  }

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to production defaults?')) {
      setSettings({ ...PRODUCTION_DEFAULTS })
      setToastMessage('Reset to production defaults!')
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
      }, 3000)
    }
  }

  return (
    <>
      <TopBar 
        title="System Settings"
        subtitle="Settings"
        isSidebarOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen(true)}
      />

      <div className="settings-container fade-up">
        {/* Settings Top Chips Navigation */}
        <div className="settings-chips-container">
          <button 
            className={`settings-chip-btn ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
            type="button"
          >
            <Globe size={16} />
            General
          </button>
          <button 
            className={`settings-chip-btn ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
            type="button"
          >
            <Lock size={16} />
            Security & Auth
          </button>
          <button 
            className={`settings-chip-btn ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
            type="button"
          >
            <Bell size={16} />
            Notifications
          </button>
          <button 
            className={`settings-chip-btn ${activeTab === 'portal' ? 'active' : ''}`}
            onClick={() => setActiveTab('portal')}
            type="button"
          >
            <Sliders size={16} />
            Portal Control
          </button>
          <button 
            className={`settings-chip-btn ${activeTab === 'integrations' ? 'active' : ''}`}
            onClick={() => setActiveTab('integrations')}
            type="button"
          >
            <Database size={16} />
            Integrations
          </button>
        </div>

        {/* Settings Content Panels */}
        <main className="settings-content-panel">
          <form onSubmit={handleSave} className="settings-form">
            
            {/* ── GENERAL SETTINGS ── */}
            {activeTab === 'general' && (
              <>
                <div className="settings-section-header">
                  <h2>General System Settings</h2>
                  <p>Configure the basic naming, brand contact information, and localization parameters.</p>
                </div>

                <div className="settings-form-row">
                  <div className="settings-form-group">
                    <label>Platform Name</label>
                    <input 
                      type="text" 
                      className="settings-input" 
                      value={settings.platformName} 
                      onChange={e => handleInputChange('platformName', e.target.value)}
                      required
                    />
                  </div>
                  <div className="settings-form-group">
                    <label>Support Email Address</label>
                    <input 
                      type="email" 
                      className="settings-input" 
                      value={settings.supportEmail} 
                      onChange={e => handleInputChange('supportEmail', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="settings-form-row">
                  <div className="settings-form-group">
                    <label>Contact Phone Number</label>
                    <input 
                      type="text" 
                      className="settings-input" 
                      value={settings.systemPhone} 
                      onChange={e => handleInputChange('systemPhone', e.target.value)}
                    />
                  </div>
                  <div className="settings-form-group">
                    <label>Default Language</label>
                    <select 
                      className="settings-select"
                      value={settings.language}
                      onChange={e => handleInputChange('language', e.target.value)}
                    >
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Kannada</option>
                      <option>Tamil</option>
                    </select>
                  </div>
                </div>

                <div className="settings-form-row">
                  <div className="settings-form-group">
                    <label>System Timezone</label>
                    <select 
                      className="settings-select"
                      value={settings.timezone}
                      onChange={e => handleInputChange('timezone', e.target.value)}
                    >
                      <option>IST (UTC+05:30)</option>
                      <option>GMT (UTC+00:00)</option>
                      <option>EST (UTC-05:00)</option>
                      <option>PST (UTC-08:00)</option>
                    </select>
                  </div>
                </div>

                <div className="settings-form-group full-width">
                  <div className="toggle-group">
                    <div className="toggle-group-info">
                      <span className="toggle-group-title">Maintenance Mode</span>
                      <span className="toggle-group-desc">Offline the entire citizen and advocate dashboard pages for system maintenance. Admins can still log in.</span>
                    </div>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={settings.maintenanceMode}
                        onChange={e => handleInputChange('maintenanceMode', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </>
            )}

            {/* ── SECURITY SETTINGS ── */}
            {activeTab === 'security' && (
              <>
                <div className="settings-section-header">
                  <h2>Security & Authentication</h2>
                  <p>Fine-tune user authorization rules, session durations, and key compliance controls.</p>
                </div>

                <div className="settings-form-row">
                  <div className="settings-form-group">
                    <label>Admin Password Expiration</label>
                    <select 
                      className="settings-select"
                      value={settings.passwordExpiry}
                      onChange={e => handleInputChange('passwordExpiry', e.target.value)}
                    >
                      <option>Never</option>
                      <option>30 Days</option>
                      <option>60 Days</option>
                      <option>90 Days</option>
                    </select>
                  </div>
                  <div className="settings-form-group">
                    <label>Session Inactivity Timeout (Minutes)</label>
                    <div className="range-container">
                      <input 
                        type="range" 
                        min="5" 
                        max="120" 
                        step="5"
                        className="settings-range" 
                        value={settings.sessionTimeout} 
                        onChange={e => handleInputChange('sessionTimeout', parseInt(e.target.value))}
                      />
                      <span className="range-val">{settings.sessionTimeout} min</span>
                    </div>
                  </div>
                </div>

                <div className="settings-form-group full-width">
                  <div className="toggle-group">
                    <div className="toggle-group-info">
                      <span className="toggle-group-title">Enforce Two-Factor Authentication (2FA)</span>
                      <span className="toggle-group-desc">Require all admin portal users to authenticate via Google Authenticator or SMS TOTP.</span>
                    </div>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={settings.enable2fa}
                        onChange={e => handleInputChange('enable2fa', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <div className="settings-form-group full-width">
                  <label>Allowed Admin Login IPs</label>
                  <textarea 
                    className="settings-textarea" 
                    rows="3" 
                    value={settings.allowedIps}
                    placeholder="e.g. 192.168.1.1, 10.0.0.0/24"
                    onChange={e => handleInputChange('allowedIps', e.target.value)}
                  />
                  <small style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '-4px' }}>
                    Use * to allow all IP addresses, or specify comma-separated IPs.
                  </small>
                </div>
              </>
            )}

            {/* ── NOTIFICATIONS SETTINGS ── */}
            {activeTab === 'notifications' && (
              <>
                <div className="settings-section-header">
                  <h2>Notification Triggers</h2>
                  <p>Enable or disable automated email alerts and SMS alerts triggered by system actions.</p>
                </div>

                <div className="settings-form-group full-width">
                  <h3 style={{ fontSize: '14px', margin: '0 0 10px', color: 'var(--text-heading)' }}>Email Notifications</h3>
                  <div className="toggle-group" style={{ marginBottom: '12px' }}>
                    <div className="toggle-group-info">
                      <span className="toggle-group-title">New Advocate Signups</span>
                      <span className="toggle-group-desc">Send alert email to administrator when a new advocate applies for registration.</span>
                    </div>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={settings.notifyAdvocateSignup}
                        onChange={e => handleInputChange('notifyAdvocateSignup', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="toggle-group" style={{ marginBottom: '12px' }}>
                    <div className="toggle-group-info">
                      <span className="toggle-group-title">Case Escalation Warnings</span>
                      <span className="toggle-group-desc">Send email when a citizen files a complaint or a case has been inactive for over 30 days.</span>
                    </div>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={settings.notifyCaseEscalation}
                        onChange={e => handleInputChange('notifyCaseEscalation', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="toggle-group">
                    <div className="toggle-group-info">
                      <span className="toggle-group-title">Monthly Client Feedbacks Digest</span>
                      <span className="toggle-group-desc">Send a consolidated report of all citizen feedbacks at the end of every calendar month.</span>
                    </div>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={settings.notifyFeedback}
                        onChange={e => handleInputChange('notifyFeedback', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <div className="settings-form-group full-width" style={{ marginTop: '12px' }}>
                  <h3 style={{ fontSize: '14px', margin: '0 0 10px', color: 'var(--text-heading)' }}>SMS & Mobile Push Triggers</h3>
                  <div className="toggle-group" style={{ marginBottom: '12px' }}>
                    <div className="toggle-group-info">
                      <span className="toggle-group-title">Urgent Hearings SMS Alerts</span>
                      <span className="toggle-group-desc">Send instant SMS notifications to advocates and clients 24 hours prior to critical hearings.</span>
                    </div>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={settings.notifyUrgentHearingSms}
                        onChange={e => handleInputChange('notifyUrgentHearingSms', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="toggle-group">
                    <div className="toggle-group-info">
                      <span className="toggle-group-title">Critical System Failure Notifications</span>
                      <span className="toggle-group-desc">Send immediate SMS alerts to sysadmins if database connection fails or API goes offline.</span>
                    </div>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={settings.notifySystemFailureSms}
                        onChange={e => handleInputChange('notifySystemFailureSms', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </>
            )}

            {/* ── PORTAL CONTROL SETTINGS ── */}
            {activeTab === 'portal' && (
              <>
                <div className="settings-section-header">
                  <h2>Portal & Workflow Control</h2>
                  <p>Configure parameters governing the workflow rules for both advocates and citizens.</p>
                </div>

                <div className="settings-form-row">
                  <div className="settings-form-group">
                    <label>Minimum Advocate Consultation Fee (₹)</label>
                    <input 
                      type="number" 
                      className="settings-input" 
                      value={settings.minConsultationFee} 
                      onChange={e => handleInputChange('minConsultationFee', parseInt(e.target.value))}
                      min="100"
                      required
                    />
                  </div>
                  <div className="settings-form-group">
                    <label>Legal24 Commission Fee (%)</label>
                    <div className="range-container">
                      <input 
                        type="range" 
                        min="5" 
                        max="35" 
                        step="1"
                        className="settings-range" 
                        value={settings.platformFeePercent} 
                        onChange={e => handleInputChange('platformFeePercent', parseInt(e.target.value))}
                      />
                      <span className="range-val">{settings.platformFeePercent}%</span>
                    </div>
                  </div>
                </div>

                <div className="settings-form-row">
                  <div className="settings-form-group">
                    <label>Max In-Progress Cases per Client</label>
                    <input 
                      type="number" 
                      className="settings-input" 
                      value={settings.maxActiveCasesPerClient} 
                      onChange={e => handleInputChange('maxActiveCasesPerClient', parseInt(e.target.value))}
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div className="settings-form-group full-width">
                  <div className="toggle-group">
                    <div className="toggle-group-info">
                      <span className="toggle-group-title">Automate Advocate Verification</span>
                      <span className="toggle-group-desc">Bypass manual admin verification for advocates if they submit a valid Bar Council ID.</span>
                    </div>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={settings.autoApproveAdvocates}
                        onChange={e => handleInputChange('autoApproveAdvocates', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </>
            )}

            {/* ── INTEGRATIONS SETTINGS ── */}
            {activeTab === 'integrations' && (
              <>
                <div className="settings-section-header">
                  <h2>API & Third-Party Integrations</h2>
                  <p>Manage secret credentials, keys, endpoints and bucket configurations for cloud providers.</p>
                </div>

                <div className="settings-form-row">
                  <div className="settings-form-group">
                    <label>Payment Gateway Mode</label>
                    <select 
                      className="settings-select"
                      value={settings.paymentGatewayMode}
                      onChange={e => handleInputChange('paymentGatewayMode', e.target.value)}
                    >
                      <option>Sandbox</option>
                      <option>Live</option>
                    </select>
                  </div>
                  <div className="settings-form-group">
                    <label>Razorpay API Key</label>
                    <div className="input-with-action">
                      <input 
                        type={showRazorpayKey ? 'text' : 'password'} 
                        className="settings-input" 
                        value={settings.razorpayKey} 
                        onChange={e => handleInputChange('razorpayKey', e.target.value)}
                        required
                      />
                      <button 
                        type="button" 
                        className="input-action-btn"
                        onClick={() => setShowRazorpayKey(!showRazorpayKey)}
                        title={showRazorpayKey ? 'Hide key' : 'Show key'}
                      >
                        {showRazorpayKey ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="settings-form-row">
                  <div className="settings-form-group">
                    <label>Twilio Messaging SID</label>
                    <div className="input-with-action">
                      <input 
                        type={showTwilioSid ? 'text' : 'password'} 
                        className="settings-input" 
                        value={settings.twilioSid} 
                        onChange={e => handleInputChange('twilioSid', e.target.value)}
                        required
                      />
                      <button 
                        type="button" 
                        className="input-action-btn"
                        onClick={() => setShowTwilioSid(!showTwilioSid)}
                        title={showTwilioSid ? 'Hide SID' : 'Show SID'}
                      >
                        {showTwilioSid ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <div className="settings-form-group">
                    <label>Document Vault AWS S3 Bucket</label>
                    <input 
                      type="text" 
                      className="settings-input" 
                      value={settings.s3BucketName} 
                      onChange={e => handleInputChange('s3BucketName', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {/* Settings Form Actions */}
            <div className="settings-actions">
              <button 
                type="button" 
                className="btn-settings-reset"
                onClick={handleReset}
              >
                <RotateCcw size={16} />
                Reset Defaults
              </button>
              <button 
                type="submit" 
                className="btn-settings-save"
              >
                <Save size={16} />
                Save Changes
              </button>
            </div>
            
          </form>
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
