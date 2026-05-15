import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, X, ChevronRight, Bot } from 'lucide-react';
import { chatFlow } from './chatbotModel';
import './chatbot.css';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Initialize chat when opened
  useEffect(() => {
    if (isOpen && history.length === 0) {
      setHistory([{ type: 'bot', node: chatFlow.start }]);
    }
  }, [isOpen]);

  // Scroll to bottom when history changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const handleOptionClick = (option) => {
    // Add user's selection to history
    setHistory(prev => [...prev, { type: 'user', text: option.label }]);

    // Handle action
    if (option.action === 'NAVIGATE_LOGIN') {
      setTimeout(() => {
        setIsOpen(false);
        navigate('/login');
      }, 500);
      return;
    }

    // Load next node
    if (option.next && chatFlow[option.next]) {
      setTimeout(() => {
        setHistory(prev => [...prev, { type: 'bot', node: chatFlow[option.next] }]);
      }, 500); // Small artificial delay to simulate "typing"
    }
  };

  return (
    <div className={`chatbot-wrapper ${isOpen ? 'open' : ''}`}>
      {!isOpen && (
        <button className="chatbot-toggle-btn" onClick={() => setIsOpen(true)}>
          <MessageSquare size={24} />
        </button>
      )}

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-title">
              <Bot size={24} color="#6c9cff" />
              <div>
                <h3>Legal24 Assistant</h3>
                <span>Online</span>
              </div>
            </div>
            <button className="chatbot-close-btn" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="chatbot-messages">
            {history.map((msg, idx) => {
              if (msg.type === 'user') {
                return <div key={idx} className="chat-msg user">{msg.text}</div>;
              }

              return (
                <div key={idx} className="bot-message-container" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div className="chat-msg bot">{msg.node.message}</div>
                  
                  {/* Render options only for the last bot message */}
                  {idx === history.length - 1 && msg.node.options && (
                    <div className="chat-options">
                      {msg.node.options.map((opt, i) => (
                        <button key={i} className="chat-option-btn" onClick={() => handleOptionClick(opt)}>
                          {opt.label}
                          <ChevronRight size={16} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            Automated Assistant
          </div>
        </div>
      )}
    </div>
  );
}
