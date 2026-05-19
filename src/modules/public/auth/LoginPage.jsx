import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, LogIn, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../../core/context/AuthContext';
import { useTheme } from '../../../core/context/ThemeContext';
import './auth.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [portal, setPortal] = useState('user'); // 'user' or 'admin'
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = await login(email, password);
      
      if (portal === 'admin' && user.role !== 'admin') {
        throw new Error('Access denied. This login is restricted to administrator accounts.');
      }
      
      if (portal === 'user' && user.role === 'admin') {
        throw new Error('Admin account detected. Please use the Admin Login tab.');
      }

      // Redirect based on role
      if (user.role === 'admin') navigate('/admin-dashboard');
      else if (user.role === 'advocate') navigate('/advocate-dashboard');
      else navigate('/client-dashboard');
    } catch (err) {
      setError(err.message || 'Failed to login. Please try again.');
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="auth-header">
          <div className="auth-brand">
            <div className="brand-mark-large">L</div>
            <div style={{ textAlign: 'left' }}>
              <strong style={{ display: 'block', color: 'var(--text-heading)', fontSize: '20px' }}>LEGAL 24</strong>
              <span style={{ color: portal === 'admin' ? '#ef4444' : 'var(--text-muted)', fontSize: '12px', fontWeight: '700', letterSpacing: '1px' }}>
                {portal === 'admin' ? 'ADMIN PANEL' : 'USER PORTAL'}
              </span>
            </div>
          </div>
          <h1>Welcome Back</h1>
          <p>
            {portal === 'admin' 
              ? 'Authorized administrative personnel access only' 
              : 'Enter your credentials to access your dashboard'}
          </p>
        </div>

        {/* Portal Switcher Tabs */}
        <div style={{
          display: 'flex',
          background: 'var(--btn-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '4px',
          marginBottom: '24px',
          gap: '4px'
        }}>
          <button
            type="button"
            onClick={() => {
              setPortal('user');
              setError('');
            }}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '8px',
              border: 'none',
              background: portal === 'user' ? 'rgba(108, 156, 255, 0.16)' : 'transparent',
              color: portal === 'user' ? 'var(--accent-blue)' : 'var(--text-secondary)',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Client / Advocate
          </button>
          <button
            type="button"
            onClick={() => {
              setPortal('admin');
              setError('');
            }}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '8px',
              border: 'none',
              background: portal === 'admin' ? 'rgba(239, 68, 68, 0.16)' : 'transparent',
              color: portal === 'admin' ? '#ff7f7f' : 'var(--text-secondary)',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Admin Login
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && (
            <motion.div
              className="error-message"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', borderRadius: '10px', fontSize: '14px', border: '1px solid rgba(239, 68, 68, 0.2)' }}
            >
              {error}
            </motion.div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <div className="input-container">
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                className="auth-input"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-container">
              <Lock className="input-icon" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                className="auth-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="auth-actions">
            <label className="checkbox-group">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" title="Recover your password" className="auth-link">Forgot password?</Link>
          </div>

          <button 
            type="submit" 
            className="auth-btn" 
            disabled={loading}
            style={{
              background: portal === 'admin' ? 'linear-gradient(135deg, #ef4444, #b91c1c)' : 'linear-gradient(135deg, #6c9cff, #4e7cff)',
              boxShadow: portal === 'admin' ? '0 4px 15px rgba(239, 68, 68, 0.3)' : '0 4px 15px rgba(108, 156, 255, 0.3)'
            }}
          >
            {loading ? 'Authenticating...' : (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                Sign In <LogIn size={18} />
              </span>
            )}
          </button>
        </form>

        {portal === 'user' && (
          <div className="auth-footer">
            Don't have an account? <Link to="/signup" title="Create a new account" className="auth-link">Create Account</Link>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default LoginPage;
