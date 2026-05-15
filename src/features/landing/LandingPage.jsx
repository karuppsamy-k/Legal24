import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, CheckCircle, ArrowRight, MessageSquare, PhoneCall, Star, Globe, MessageCircle, AtSign, Send, Mail, MapPin } from 'lucide-react';
import ChatBot from './components/ChatBot';
import './landing.css';

export default function LandingPage() {
  return (
    <div className="landing-wrapper">
      {/* Navbar */}
      <nav className="landing-navbar">
        <div className="landing-nav-brand">
          <div className="brand-mark">L</div>
          <strong>LEGAL 24</strong>
        </div>
        <div className="landing-nav-links">
          <a href="#features">Features</a>
          <a href="#stats">Impact</a>
        </div>
        <div className="landing-nav-actions">
          <Link to="/login" className="nav-login-btn">Login</Link>
          <Link to="/signup" className="nav-signup-btn">Get Started</Link>
        </div>
      </nav>

      <div className="landing-container">
        <div className="landing-bg-blob" />
        <div className="landing-bg-blob-2" />
        
        {/* Hero Section */}
        <div className="landing-content fade-up" style={{ paddingTop: '80px' }}>
          <div className="landing-hero">
            <span className="hero-badge">Next-Gen Legal Platform</span>
            <h1>The smartest way to manage <br /><span>legal workflows</span></h1>
            <p>Connect with top advocates, track cases seamlessly, and access premium legal services at an affordable price. All in one secure dashboard.</p>
          </div>

          <div className="landing-actions">
            <Link to="/signup" className="btn-primary">
              Create an account <ArrowRight size={20} />
            </Link>
            <Link to="/login" className="btn-secondary">
              Login to workspace
            </Link>
          </div>

          {/* Stats Section */}
          <div id="stats" className="landing-stats">
            <div className="stat-card">
              <div className="stat-icon">
                <Users size={24} />
              </div>
              <div className="stat-number">5,000+</div>
              <div className="stat-label">Verified Advocates</div>
            </div>

            <div className="stat-card success">
              <div className="stat-icon">
                <CheckCircle size={24} />
              </div>
              <div className="stat-number">12,500+</div>
              <div className="stat-label">Cases Resolved</div>
            </div>

            <div className="stat-card value">
              <div className="stat-icon">
                <Shield size={24} />
              </div>
              <div className="stat-number">100%</div>
              <div className="stat-label">Secure & Transparent</div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="features-section fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="section-header">
            <h2>Why choose Legal 24?</h2>
            <p>Everything you need to streamline your legal processes, built with enterprise-grade security.</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon" style={{ background: 'rgba(108, 156, 255, 0.1)', color: '#6c9cff' }}>
                <Shield size={24} />
              </div>
              <h3>Secure Document Vault</h3>
              <p>Store, share, and manage sensitive legal documents with end-to-end encryption and strict access controls.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon" style={{ background: 'rgba(76, 225, 177, 0.1)', color: '#4ce1b1' }}>
                <CheckCircle size={24} />
              </div>
              <h3>Smart Case Tracking</h3>
              <p>Monitor your case progress in real-time. Get automated alerts for court dates, filings, and advocate updates.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon" style={{ background: 'rgba(255, 214, 138, 0.1)', color: '#ffd68a' }}>
                <Users size={24} />
              </div>
              <h3>Verified Expert Network</h3>
              <p>Connect instantly with thousands of background-checked, top-rated legal professionals specialized in your needs.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon" style={{ background: 'rgba(255, 87, 87, 0.1)', color: '#ff5757' }}>
                <PhoneCall size={24} />
              </div>
              <h3>Direct Advocate Consulting</h3>
              <p>Book 1-on-1 consultations with specialized advocates directly through our secure platform video and chat.</p>
            </div>
          </div>
        </div>

        {/* Feedbacks / Reviews Section */}
        <div id="reviews" className="features-section fade-up" style={{ animationDelay: '0.4s', margin: '40px auto 40px auto' }}>
          <div className="section-header">
            <h2>What our users say</h2>
            <p>Real feedback from citizens and advocates who transformed their legal experience with us.</p>
          </div>
          
          <div className="features-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div className="feature-card review-card">
              <div className="stars">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="#ffd68a" color="#ffd68a" />)}
              </div>
              <p className="review-text">"Legal24 made finding a corporate lawyer incredibly easy. The transparent pricing and secure document vault saved our startup months of headache."</p>
              <div className="review-author">
                <div className="author-avatar">R</div>
                <div>
                  <strong>Rahul M.</strong>
                  <span>Business Owner</span>
                </div>
              </div>
            </div>

            <div className="feature-card review-card">
              <div className="stars">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="#ffd68a" color="#ffd68a" />)}
              </div>
              <p className="review-text">"As an advocate, this platform streamlined my entire workflow. I can track all my cases and client communications in one single dashboard."</p>
              <div className="review-author">
                <div className="author-avatar" style={{background: '#4ce1b1'}}>S</div>
                <div>
                  <strong>Sneha K.</strong>
                  <span>Senior Advocate</span>
                </div>
              </div>
            </div>

            <div className="feature-card review-card">
              <div className="stars">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="#ffd68a" color="#ffd68a" />)}
              </div>
              <p className="review-text">"The direct consulting feature is a game changer. I got expert legal advice within 30 minutes without having to leave my house."</p>
              <div className="review-author">
                <div className="author-avatar" style={{background: '#6c9cff'}}>A</div>
                <div>
                  <strong>Amit P.</strong>
                  <span>Citizen</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-grid">
          
          <div className="footer-brand-section">
            <div className="landing-nav-brand" style={{ marginBottom: '20px' }}>
              <div className="brand-mark" style={{ background: '#1e293b', border: '1px solid #d4af37', color: '#d4af37', borderRadius: '50%' }}>L</div>
              <h2 style={{ fontSize: '24px', margin: 0 }}>Legal24</h2>
            </div>
            <p className="footer-desc">
              Transforming legal engagement for citizens, empowering advocates, and inspiring students across the nation.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-icon"><Globe size={18} /></a>
              <a href="#" className="social-icon"><MessageCircle size={18} /></a>
              <a href="#" className="social-icon"><AtSign size={18} /></a>
              <a href="#" className="social-icon"><Send size={18} /></a>
            </div>
          </div>

          <div className="footer-links-section">
            <div className="footer-column">
              <h3>Platform</h3>
              <ul>
                <li><a href="#">Ecosystem</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#reviews">Reviews</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Contact</h3>
              <ul className="contact-list">
                <li>
                  <Mail size={16} color="#6c9cff" />
                  <span>info@legal24.in</span>
                </li>
                <li>
                  <PhoneCall size={16} color="#6c9cff" />
                  <span>+91 96632 02292</span>
                </li>
                <li>
                  <MapPin size={16} color="#6c9cff" style={{ flexShrink: 0, marginTop: '4px' }} />
                  <span style={{ lineHeight: '1.4' }}>#51 Chokkanahalli, Yenigadale post, Chintamani Taluk,<br/>Karnataka - 563125</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
        
        <div className="footer-bottom">
          <p>© 2026 Legal24. All rights reserved.</p>
        </div>
      </footer>

      {/* Static Rule-Based Chatbot */}
      <ChatBot />
    </div>
  );
}
