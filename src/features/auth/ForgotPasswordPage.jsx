import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Send, CheckCircle } from 'lucide-react';
import { AuthService } from '../../infrastructure/services/AuthService';
import './auth.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await AuthService.resetPassword(email);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-bg-blob" />
      <div className="auth-bg-blob-2" />

      <motion.div 
        className="auth-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {!submitted ? (
          <>
            <div className="auth-header">
              <div className="auth-brand">
                <div className="brand-mark-large">L</div>
              </div>
              <h1>Forgot Password?</h1>
              <p>Enter your email and we'll send you a link to reset your password</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
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

              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? 'Sending link...' : (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    Send Reset Link <Send size={18} />
                  </span>
                )}
              </button>
            </form>

            <div className="auth-footer">
              <Link to="/login" className="auth-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <ArrowLeft size={16} /> Back to login
              </Link>
            </div>
          </>
        ) : (
          <div className="auth-success">
            <motion.div 
              className="success-icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12 }}
            >
              <CheckCircle size={40} />
            </motion.div>
            <h1>Check your email</h1>
            <p>We have sent a password reset link to <br/><strong>{email}</strong></p>
            <br/>
            <Link to="/login" className="auth-btn" style={{ textDecoration: 'none', display: 'block' }}>
              Return to login
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
