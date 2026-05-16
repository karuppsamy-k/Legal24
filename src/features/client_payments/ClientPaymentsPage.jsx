import { useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { useAuth } from '../../core/context/AuthContext'
import { 
  CreditCard, 
  Download, 
  ArrowRight, 
  CheckCircle2, 
  LayoutDashboard,
  Calendar,
  Activity,
  FileText,
  LogOut,
  Bell,
  ChevronRight,
  TrendingUp,
  Clock,
  Plus
} from 'lucide-react'
import StatCard from '../../shared/components/organisms/StatCard.jsx'
import TopBar from '../../shared/components/organisms/TopBar.jsx'
import './client_payments.css'
import '../client_dashboard/client_dashboard.css'
import '../advocate_dashboard/advocate_dashboard.css'

const INVOICES = [
  { id: 'INV-8820', title: "Consultation Fee", date: "16 May 2026", amount: "₹1,500", status: "unpaid" },
  { id: 'INV-8750', title: "Document Processing", date: "10 May 2026", amount: "₹850", status: "paid" },
  { id: 'INV-8610', title: "Case Filing Charges", date: "02 May 2026", amount: "₹5,000", status: "paid" }
]

const navItems = [
  { label: 'Dashboard', id: 'client-dashboard', icon: <LayoutDashboard size={18} /> },
  { label: 'My Cases', id: 'client-cases', icon: <Activity size={18} /> },
  { label: 'Consultations', id: 'client-consultations', icon: <Calendar size={18} /> },
  { label: 'Documents', id: 'client-documents', icon: <FileText size={18} /> },
  { label: 'Payments', id: 'client-payments', icon: <CreditCard size={18} />, active: true }
]

export default function ClientPaymentsPage() {
  const { sidebarOpen, setSidebarOpen } = useOutletContext()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleNavClick = (id) => {
    setSidebarOpen(false)
    navigate(`/${id}`)
  }

  return (
    <>
      <TopBar 
        title="Payments & Invoices"
        subtitle="Billing"
        isSidebarOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen(true)}
      />

        <section className="payments-summary fade-up">
          <StatCard title="Total Spent" value="₹7,350" detail="Since joining" badge="Active" />
          <StatCard title="Pending Due" value="₹1,500" detail="1 invoice pending" badge="Pay Now" />
          <StatCard title="Payment Success" value="100%" detail="Last 5 transactions" badge="Reliable" />
        </section>

        <div className="advocate-grid">
          <section className="invoice-section fade-up delay-1">
            <div className="panel-header" style={{ marginBottom: '20px' }}>
              <h2>Recent Invoices</h2>
              <button className="summary-action">Download All</button>
            </div>
            
            <div className="invoice-list">
              {INVOICES.map((inv, idx) => (
                <div key={inv.id} className="invoice-item fade-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="invoice-main-info">
                    <div className="invoice-icon"><FileText size={20} /></div>
                    <div className="invoice-text">
                      <h4>{inv.title}</h4>
                      <p>{inv.id} • {inv.date}</p>
                    </div>
                  </div>
                  <div className="invoice-amount">
                    <h3>{inv.amount}</h3>
                    <span className={`invoice-status ${inv.status}`}>{inv.status}</span>
                  </div>
                  <div className="row-actions" style={{ marginLeft: '24px' }}>
                    <button className="icon-only"><Download size={16} /></button>
                    {inv.status === 'unpaid' && (
                      <button className="summary-action" style={{ background: '#6c9cff', color: '#fff' }}>Pay</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="fade-up delay-2">
            <div className="advocate-panel">
              <h3>Payment Methods</h3>
              <div className="payment-methods" style={{ marginTop: '16px' }}>
                <div className="method-card active">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '24px', background: '#fff', borderRadius: '4px' }} />
                    <span style={{ color: '#fff', fontSize: '14px' }}>Visa •••• 4242</span>
                  </div>
                  <ChevronRight size={16} color="#64748b" />
                </div>
                <div className="method-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '24px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }} />
                    <span style={{ color: '#94a3b8', fontSize: '14px' }}>Add New Method</span>
                  </div>
                  <Plus size={16} color="#64748b" />
                </div>
              </div>
            </div>

            <div className="advocate-panel" style={{ marginTop: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffd68a', marginBottom: '12px' }}>
                <Clock size={16} />
                <h3 style={{ margin: 0, fontSize: '14px' }}>Payment Security</h3>
              </div>
              <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
                All payments are processed through secure, PCI-compliant gateways like Razorpay or Stripe.
              </p>
            </div>
          </aside>
        </div>
    </>
  )
}
