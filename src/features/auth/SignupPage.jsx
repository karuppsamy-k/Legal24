import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, CheckCircle2, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../core/context/AuthContext';
import { useTheme } from '../../core/context/ThemeContext';
import './auth.css';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'client'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    
    setLoading(true);
    setError('');

    try {
      await signup(formData);
      // Redirect based on role
      if (formData.role === 'advocate') navigate('/advocate-dashboard');
      else navigate('/client-dashboard');
    } catch (err) {
      setError(err.message || 'Failed to create account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Theme Toggle */}
      <motion.button
        className="auth-theme-toggle"
        onClick={toggleTheme}
        title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </motion.button>

      <div className="auth-bg-blob" />
      <div className="auth-bg-blob-2" />

      <motion.div 
        className="auth-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-header">
          <div className="auth-brand">
            <div className="brand-mark-large">L</div>
            <div style={{ textAlign: 'left' }}>
              <strong style={{ display: 'block', color: 'var(--text-heading)', fontSize: '20px' }}>LEGAL 24</strong>
              <span style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: '600', letterSpacing: '1px' }}>JOIN PLATFORM</span>
            </div>
          </div>
          <h1>Create Account</h1>
          <p>Join the enterprise legal workflow network</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && (
            <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', borderRadius: '10px', fontSize: '14px' }}>
              {error}
            </div>
          )}

          <div className="form-group">
            <label>Select Role</label>
            <div className="role-selector">
              <div 
                className={`role-option ${formData.role === 'client' ? 'active' : ''}`}
                onClick={() => setFormData({...formData, role: 'client'})}
              >
                Client
              </div>
              <div 
                className={`role-option ${formData.role === 'advocate' ? 'active' : ''}`}
                onClick={() => setFormData({...formData, role: 'advocate'})}
              >
                Advocate
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Full Name</label>
            <div className="input-container">
              <User className="input-icon" size={20} />
              <input 
                type="text" 
                className="auth-input" 
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <div className="input-container">
              <Mail className="input-icon" size={20} />
              <input 
                type="email" 
                className="auth-input" 
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <div className="input-container">
              <Phone className="input-icon" size={20} />
              <input 
                type="tel" 
                className="auth-input" 
                placeholder="+91 XXXXX XXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label>Password</label>
              <div className="input-container">
                <Lock className="input-icon" size={18} />
                <input 
                  type="password" 
                  className="auth-input" 
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Confirm</label>
              <div className="input-container">
                <Lock className="input-icon" size={18} />
                <input 
                  type="password" 
                  className="auth-input" 
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  required
                />
              </div>
            </div>
          </div>

          <label className="checkbox-group" style={{ marginTop: '8px' }}>
            <input type="checkbox" required />
            <span style={{ fontSize: '12px' }}>I agree to the Terms of Service and Privacy Policy</span>
          </label>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Creating Account...' : (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                Sign Up <CheckCircle2 size={18} />
              </span>
            )}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login" title="Return to login" className="auth-link">Sign In</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
