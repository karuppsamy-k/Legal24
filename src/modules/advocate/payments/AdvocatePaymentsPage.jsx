import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useAuth } from '../../../core/context/AuthContext'
import { 
  CreditCard, 
  Plus, 
  Download, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  FileText, 
  User, 
  X, 
  Check, 
  AlertCircle 
} from 'lucide-react'
import TopBar from '../../../shared/components/organisms/TopBar.jsx'
import StatCard from '../../../shared/components/organisms/StatCard.jsx'
import './advocate_payments.css'

const INITIAL_TRANSACTIONS = [
  { id: 'TXN-101', title: 'Consultation Fee', client: 'Amit Kumar', date: '16 May 2026', amount: 1500, status: 'paid', method: 'UPI' },
  { id: 'TXN-102', title: 'Case Filing Retainer', client: 'Sarah J.', date: '12 May 2026', amount: 15000, status: 'paid', method: 'Net Banking' },
  { id: 'TXN-103', title: 'Trademark Application Fee', client: 'Tech Corp', date: '15 May 2026', amount: 25000, status: 'paid', method: 'Net Banking' },
  { id: 'TXN-104', title: 'Property Dispute Retainer', client: 'Amit Kumar', date: '20 May 2026', amount: 8200, status: 'pending', method: 'Pending' },
  { id: 'TXN-105', title: 'Landlord Dispute Eviction Notice', client: 'Priyanka Sen', date: '19 May 2026', amount: 3700, status: 'paid', method: 'UPI' }
]

export default function AdvocatePaymentsPage() {
  const { sidebarOpen, setSidebarOpen } = useOutletContext()
  const { user } = useAuth()
  
  // State Management
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('legal24_advocate_payments')
    if (saved) return JSON.parse(saved)
    localStorage.setItem('legal24_advocate_payments', JSON.stringify(INITIAL_TRANSACTIONS))
    return INITIAL_TRANSACTIONS
  })

  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false)
  const [filterType, setFilterType] = useState('All')
  
  // Form states
  const [clientName, setClientName] = useState('')
  const [billingTitle, setBillingTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('UPI')

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('legal24_advocate_payments', JSON.stringify(transactions))
  }, [transactions])

  // Calculation formulas
  const paidTransactions = transactions.filter(t => t.status === 'paid')
  const pendingTransactions = transactions.filter(t => t.status === 'pending')

  const totalEarnings = paidTransactions.reduce((sum, t) => sum + t.amount, 0)
  const totalPending = pendingTransactions.reduce((sum, t) => sum + t.amount, 0)
  
  const successRate = transactions.length > 0 
    ? Math.round((paidTransactions.length / transactions.length) * 100) 
    : 100

  // Add new payment request
  const handleCreateInvoice = (e) => {
    e.preventDefault()
    if (!clientName || !billingTitle || !amount) {
      alert('Please fill out all required fields.')
      return
    }

    const newTxn = {
      id: 'TXN-' + Math.floor(106 + Math.random() * 900),
      title: billingTitle,
      client: clientName,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      amount: parseFloat(amount),
      status: 'pending',
      method: 'Pending',
      description: description
    }

    setTransactions(prev => [newTxn, ...prev])
    
    // Reset Form
    setClientName('')
    setBillingTitle('')
    setAmount('')
    setDescription('')
    
    setIsInvoiceModalOpen(false)
    alert(`Payment request ${newTxn.id} generated successfully!`)
  }

  // Quick payout/approve simulation
  const handleMarkAsPaid = (txnId) => {
    setTransactions(prev => prev.map(t => {
      if (t.id === txnId) {
        return { ...t, status: 'paid', method: paymentMethod }
      }
      return t
    }))
    alert(`Transaction ${txnId} successfully updated to paid.`)
  }

  // Filter transaction display list
  const filteredTxns = transactions.filter(t => {
    if (filterType === 'All') return true
    return t.status === filterType.toLowerCase()
  })

  return (
    <>
      <TopBar 
        title="Earnings & Billings"
        subtitle="Payments"
        isSidebarOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen(true)}
      />

      {/* Summary Row */}
      <section className="payments-summary fade-up">
        <StatCard 
          title="Total Earnings" 
          value={`₹${totalEarnings.toLocaleString('en-IN')}`} 
          detail="Paid case retainers & consultations" 
          badge="Withdrawn" 
        />
        <StatCard 
          title="Pending Payments" 
          value={`₹${totalPending.toLocaleString('en-IN')}`} 
          detail="Awaiting client transactions" 
          badge={totalPending > 0 ? "Action Required" : "Cleared"} 
        />
        <StatCard 
          title="Payout Rate" 
          value={`${successRate}%`} 
          detail="Of payments cleared successfully" 
          badge="Standard" 
        />
      </section>

      {/* Grid Layout */}
      <div className="advocate-grid">
        {/* Left Hand: Recent Transactions */}
        <section className="invoice-section fade-up delay-1" style={{ flex: 1.8 }}>
          <div className="panel-header" style={{ marginBottom: '20px' }}>
            <div>
              <h2>Billing Records</h2>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>
                Track cases fees and deposit history
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                className="summary-action" 
                style={{ background: '#6c9cff', color: 'white' }}
                onClick={() => setIsInvoiceModalOpen(true)}
              >
                <Plus size={16} /> Request Payment
              </button>
            </div>
          </div>

          {/* Quick Filters */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            {['All', 'Paid', 'Pending'].map(type => (
              <button
                key={type}
                className={`filter-chip ${filterType === type ? 'active' : ''}`}
                onClick={() => setFilterType(type)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  border: '1px solid var(--border-color)',
                  background: filterType === type ? 'var(--accent-blue)' : 'transparent',
                  color: 'var(--text-primary)',
                  fontSize: '12px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                {type}
              </button>
            ))}
          </div>

          {/* List of payments */}
          <div className="invoice-list">
            {filteredTxns.length > 0 ? (
              filteredTxns.map((txn, idx) => (
                <div key={txn.id} className="invoice-item fade-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                  <div className="invoice-main-info">
                    <div className="invoice-icon"><CreditCard size={20} /></div>
                    <div className="invoice-text">
                      <h4>{txn.title}</h4>
                      <p>{txn.id} • {txn.date} • Client: <strong>{txn.client}</strong></p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div className="invoice-amount">
                      <h3>₹{txn.amount.toLocaleString('en-IN')}</h3>
                      <span className={`invoice-status ${txn.status}`}>{txn.status}</span>
                    </div>
                    {txn.status === 'pending' && (
                      <button 
                        className="summary-action" 
                        onClick={() => handleMarkAsPaid(txn.id)}
                        style={{ fontSize: '12px', background: 'rgba(76, 225, 177, 0.12)', color: 'var(--accent-green)', padding: '6px 12px' }}
                      >
                        <Check size={14} style={{ marginRight: '4px' }} /> Mark Paid
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-dashboard-placeholder" style={{ padding: '40px' }}>
                <Clock size={40} className="placeholder-icon" />
                <p>No transaction history matches this filter.</p>
              </div>
            )}
          </div>
        </section>

        {/* Right Hand: Payout Settings */}
        <aside className="fade-up delay-2" style={{ flex: 1.2 }}>
          <div className="payout-settings-card">
            <h3>Settlement Account</h3>
            <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Earnings are settled weekly directly to your registered bank account.
            </p>
            <div className="bank-details-panel">
              <div className="bank-detail-row">
                <span>Account Holder</span>
                <strong>Adv. {user?.name || 'Legal Consultant'}</strong>
              </div>
              <div className="bank-detail-row">
                <span>Bank Name</span>
                <strong>HDFC Bank Ltd</strong>
              </div>
              <div className="bank-detail-row">
                <span>Account Number</span>
                <strong>•••• •••• 9284</strong>
              </div>
              <div className="bank-detail-row">
                <span>IFSC Code</span>
                <strong>HDFC0001092</strong>
              </div>
              <div className="bank-detail-row">
                <span>Branch Location</span>
                <strong>Connaught Place, Delhi</strong>
              </div>
            </div>
          </div>

          <div className="payout-settings-card" style={{ background: 'rgba(255, 214, 138, 0.05)', borderColor: 'rgba(255, 214, 138, 0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffd68a', marginBottom: '12px' }}>
              <AlertCircle size={16} />
              <h3 style={{ margin: 0, fontSize: '14px', color: '#ffd68a' }}>Settlement Policy</h3>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
              All client payments cleared by Sunday are dispatched for settlement on Tuesday. A standard platform processing charge of 2.5% applies to external gateway transactions.
            </p>
          </div>
        </aside>
      </div>

      {/* Invoice Generator Modal */}
      {isInvoiceModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Request Client Payment</h2>
              <button className="close-btn" onClick={() => setIsInvoiceModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateInvoice} className="modal-form">
              <p className="payment-modal-desc">
                Generate a billing record. The client will receive an email and system notification to complete the payment.
              </p>
              
              <div className="form-group">
                <label>Client Name *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Amit Kumar"
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Billing Title *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Initial Case Filing Retainer"
                  value={billingTitle}
                  onChange={e => setBillingTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Amount (INR) *</label>
                <input 
                  type="number" 
                  placeholder="e.g. 5000"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description / Case References</label>
                <textarea 
                  placeholder="Describe scope of work covered by this payment record..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsInvoiceModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Generate Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
