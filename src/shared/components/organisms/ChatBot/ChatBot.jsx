import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, X, ChevronRight, Bot, RotateCcw, Star, SlidersHorizontal, Sparkles, Calendar } from 'lucide-react';
import { useAuth } from '../../../../core/context/AuthContext';
import { chatFlow, clientChatFlow, ADVOCATES_DATA } from './chatbotFlows';
import './chatbot.css';

// Filter helper
function filterAdvocates(filters) {
  const dynamicAdvocates = JSON.parse(localStorage.getItem('legal24_advocates') || '[]');
  const approvedDynamic = dynamicAdvocates
    .filter(a => a.status === 'approved')
    .map(a => {
      const nameParts = a.name.split(' ');
      const initials = nameParts.map(p => p[0]).join('').toUpperCase().substring(0, 2);
      const expNum = parseInt(a.experience) || 5;
      return {
        id: a.id,
        name: `Adv. ${a.name}`,
        initials: initials,
        specialty: a.specialization,
        experience: expNum,
        rating: 5.0,
        price: 1500,
        priceLabel: "₹1,500/hr",
        available: true,
        casesWon: 0,
        languages: ["English", "Hindi"]
      };
    });

  let results = [...approvedDynamic, ...ADVOCATES_DATA];

  if (filters.availableOnly) {
    results = results.filter(a => a.available);
  }

  if (filters.ratingHighToLow) {
    results.sort((a, b) => b.rating - a.rating);
  }

  if (filters.priceLowToHigh && !filters.priceHighToLow) {
    results.sort((a, b) => a.price - b.price);
  } else if (filters.priceHighToLow && !filters.priceLowToHigh) {
    results.sort((a, b) => b.price - a.price);
  }

  if (filters.mostExperienced) {
    results.sort((a, b) => b.experience - a.experience);
  }

  return results;
}

// Sub-components
function TypingIndicator() {
  return (
    <div className="typing-indicator">
      <div className="typing-dot" />
      <div className="typing-dot" />
      <div className="typing-dot" />
    </div>
  );
}

function StarRating({ rating }) {
  return (
    <div className="advocate-card-stars">
      <Star size={12} fill="#fbbf24" stroke="#fbbf24" />
      {rating}
    </div>
  );
}

function FilterPanel({ filters, onFilterChange, onApply }) {
  return (
    <div className="chat-filter-panel">
      <h4><SlidersHorizontal size={16} /> Filter Advocates</h4>

      <div className="filter-group">
        <span className="filter-group-label">Sort By Rating</span>
        <div className="filter-checkbox-group">
          <label className="filter-checkbox-label">
            <input
              type="checkbox"
              className="filter-checkbox"
              checked={filters.ratingHighToLow}
              onChange={() => onFilterChange('ratingHighToLow')}
            />
            ⭐ Rating: High to Low
          </label>
        </div>
      </div>

      <div className="filter-group">
        <span className="filter-group-label">Sort By Price</span>
        <div className="filter-checkbox-group">
          <label className="filter-checkbox-label">
            <input
              type="checkbox"
              className="filter-checkbox"
              checked={filters.priceLowToHigh}
              onChange={() => onFilterChange('priceLowToHigh')}
            />
            💰 Price: Low to High
          </label>
          <label className="filter-checkbox-label">
            <input
              type="checkbox"
              className="filter-checkbox"
              checked={filters.priceHighToLow}
              onChange={() => onFilterChange('priceHighToLow')}
            />
            💎 Price: High to Low
          </label>
        </div>
      </div>

      <div className="filter-group">
        <span className="filter-group-label">Experience & Availability</span>
        <div className="filter-checkbox-group">
          <label className="filter-checkbox-label">
            <input
              type="checkbox"
              className="filter-checkbox"
              checked={filters.mostExperienced}
              onChange={() => onFilterChange('mostExperienced')}
            />
            🏆 Most Experienced First
          </label>
          <label className="filter-checkbox-label">
            <input
              type="checkbox"
              className="filter-checkbox"
              checked={filters.availableOnly}
              onChange={() => onFilterChange('availableOnly')}
            />
            🟢 Available Today Only
          </label>
        </div>
      </div>

      <button className="filter-apply-btn" onClick={onApply}>
        Apply Filters & Find Advocates
      </button>
    </div>
  );
}

function AdvocateCard({ advocate, onBook }) {
  return (
    <div className="chat-advocate-card">
      <div className="advocate-card-top">
        <div className="advocate-card-avatar">{advocate.initials}</div>
        <div className="advocate-card-info">
          <h5>{advocate.name}</h5>
          <p>{advocate.specialty}</p>
        </div>
        <div className="advocate-card-rating">
          <StarRating rating={advocate.rating} />
          <span className="advocate-card-price">{advocate.priceLabel}</span>
        </div>
      </div>

      <div className="advocate-card-stats">
        <div className="advocate-stat">
          <span>Experience</span>
          <span>{advocate.experience} yrs</span>
        </div>
        <div className="advocate-stat">
          <span>Cases Won</span>
          <span>{advocate.casesWon}</span>
        </div>
        <div className="advocate-stat">
          <span>Languages</span>
          <span>{advocate.languages.length}</span>
        </div>
      </div>

      <div className={`advocate-card-available ${advocate.available ? 'yes' : 'no'}`}>
        <span className="avail-dot" />
        {advocate.available ? 'Available Today' : 'Next Available: Tomorrow'}
      </div>

      <button className="advocate-book-btn" onClick={() => onBook(advocate)}>
        <Calendar size={14} />
        Book Now
      </button>
    </div>
  );
}

export default function ChatBot() {
  const { user } = useAuth();
  const isClientMode = user?.role === 'client';
  const activeFlow = isClientMode ? clientChatFlow : chatFlow;

  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [filteredResults, setFilteredResults] = useState(null);
  const [filters, setFilters] = useState({
    ratingHighToLow: false,
    priceLowToHigh: false,
    priceHighToLow: false,
    mostExperienced: false,
    availableOnly: false
  });

  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Initialize chat when opened
  useEffect(() => {
    if (isOpen && history.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setHistory([{ type: 'bot', node: activeFlow.start }]);
      }, 500);
    }
  }, [isOpen, activeFlow, history.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isTyping, showFilters, filteredResults]);

  // Handle options selections
  const handleOptionClick = useCallback((option) => {
    setHistory(prev => [...prev, { type: 'user', text: option.label }]);

    if (option.meta) {
      setContext(prev => ({ ...prev, ...option.meta }));
    }

    if (option.action === 'NAVIGATE_LOGIN') {
      setTimeout(() => {
        setIsOpen(false);
        navigate('/login');
      }, 500);
      return;
    }

    if (option.action === 'NAVIGATE') {
      setTimeout(() => {
        setIsOpen(false);
        navigate(option.target);
      }, 500);
      return;
    }

    if (option.action === 'SHOW_FILTERS') {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setShowFilters(true);
        setFilteredResults(null);
      }, 500);
      return;
    }

    if (option.action === 'SHOW_ALL_ADVOCATES') {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setShowFilters(false);
        setFilteredResults(ADVOCATES_DATA);
        setHistory(prev => [...prev, { type: 'bot', node: activeFlow.results_shown || { message: "Here are the advocates matching your search." } }]);
      }, 600);
      return;
    }

    if (option.next && activeFlow[option.next]) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setHistory(prev => [...prev, { type: 'bot', node: activeFlow[option.next] }]);
      }, 500);
    }
  }, [navigate, activeFlow]);

  const handleFilterChange = (key) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleApplyFilters = () => {
    const results = filterAdvocates(filters);
    setShowFilters(false);
    setFilteredResults(results);
    setHistory(prev => [...prev, {
      type: 'bot',
      node: {
        message: `Found ${results.length} advocate${results.length !== 1 ? 's' : ''} matching your criteria. Here are your results:`,
        options: [
          { label: "🔄 Adjust filters", action: "SHOW_FILTERS" },
          { label: "🏠 Start over", next: "start" }
        ]
      }
    }]);
  };

  const handleBookAdvocate = (advocate) => {
    setHistory(prev => [
      ...prev,
      { type: 'user', text: `Book ${advocate.name}` },
    ]);
    setIsTyping(true);
    setFilteredResults(null);
    setTimeout(() => {
      setIsTyping(false);
      setHistory(prev => [...prev, { type: 'bot', node: activeFlow.booked || { message: "Booking confirmed!" } }]);
      setTimeout(() => navigate('/client-consultations'), 1200);
    }, 600);
  };

  const handleReset = () => {
    setHistory([]);
    setContext({});
    setShowFilters(false);
    setFilteredResults(null);
    setFilters({
      ratingHighToLow: false,
      priceLowToHigh: false,
      priceHighToLow: false,
      mostExperienced: false,
      availableOnly: false
    });
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setHistory([{ type: 'bot', node: activeFlow.start }]);
    }, 400);
  };

  const contextTags = [];
  if (context.caseType) contextTags.push({ text: context.caseType, cls: '' });
  if (context.intent) contextTags.push({ text: context.intent === 'consultation' ? 'Consultation' : 'File Case', cls: 'green' });
  if (context.mode) contextTags.push({ text: context.mode, cls: 'purple' });
  if (context.urgency) contextTags.push({ text: context.urgency.charAt(0).toUpperCase() + context.urgency.slice(1), cls: 'purple' });

  return (
    <div className="client-chatbot-wrapper">
      {!isOpen && (
        <button 
          className="client-chatbot-fab" 
          onClick={() => setIsOpen(true)} 
          id="client-chatbot-toggle"
          aria-label="Open support assistant"
        >
          <Sparkles size={24} />
        </button>
      )}

      {isOpen && (
        <div className="client-chatbot-window">
          {/* Header */}
          <div className="client-chat-header">
            <div className="client-chat-header-left">
              <div className="client-chat-bot-icon">
                <Bot size={22} color="#fff" />
              </div>
              <div>
                <h3>Legal24 Assistant</h3>
                <span>Online — Smart Assistant</span>
              </div>
            </div>
            <div className="client-chat-header-actions">
              <button className="client-chat-header-btn" onClick={handleReset} title="Restart chat">
                <RotateCcw size={16} />
              </button>
              <button className="client-chat-header-btn" onClick={() => setIsOpen(false)} title="Close">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Context breadcrumbs */}
          {contextTags.length > 0 && (
            <div className="chat-context-bar">
              {contextTags.map((tag, i) => (
                <span key={i} className={`context-tag ${tag.cls}`}>{tag.text}</span>
              ))}
            </div>
          )}

          {/* Messages */}
          <div className="client-chat-messages">
            {history.map((msg, idx) => {
              if (msg.type === 'user') {
                return <div key={idx} className="client-chat-msg user">{msg.text}</div>;
              }

              const isLast = idx === history.length - 1;

              return (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div className="client-chat-msg bot">{msg.node.message}</div>

                  {isLast && msg.node.options && !showFilters && !filteredResults && (
                    <div className="client-chat-options">
                      {msg.node.options.map((opt, i) => (
                        <button
                          key={i}
                          className="client-chat-option-btn"
                          onClick={() => handleOptionClick(opt)}
                        >
                          {opt.label}
                          <ChevronRight size={14} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && <TypingIndicator />}

            {showFilters && !isTyping && (
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onApply={handleApplyFilters}
              />
            )}

            {filteredResults && !isTyping && (
              <>
                <div className="results-count-badge">
                  <Sparkles size={13} />
                  {filteredResults.length} advocate{filteredResults.length !== 1 ? 's' : ''} found
                </div>
                <div className="chat-advocate-results">
                  {filteredResults.map(adv => (
                    <AdvocateCard
                      key={adv.id}
                      advocate={adv}
                      onBook={handleBookAdvocate}
                    />
                  ))}
                </div>

                <div className="client-chat-options" style={{ marginTop: '8px' }}>
                  <button
                    className="client-chat-option-btn"
                    onClick={() => handleOptionClick({ label: "🔄 Adjust filters", action: "SHOW_FILTERS" })}
                  >
                    🔄 Adjust Filters
                    <ChevronRight size={14} />
                  </button>
                  <button
                    className="client-chat-option-btn"
                    onClick={() => {
                      setFilteredResults(null);
                      setShowFilters(false);
                      handleOptionClick({ label: "🏠 Start over", next: "start" });
                    }}
                  >
                    🏠 Start Over
                    <ChevronRight size={14} />
                  </button>
                </div>
              </>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <div className="client-chat-footer">
            <Bot size={13} />
            Powered by Legal24 Smart Assistant
          </div>
        </div>
      )}
    </div>
  );
}
