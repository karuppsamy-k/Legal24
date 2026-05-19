import { Advocate } from './Advocate';
import { AdvocateVerification } from './AdvocateVerification';
import { Client } from './Client';
import { Case } from './Case';
import { Consultation } from './Consultation';
import { Payment } from './Payment';
import { Feedback } from './Feedback';
import { Notification } from './Notification';
import { Appointment } from './Appointment';
import { Document } from './Document';
import { TimelineEvent } from './TimelineEvent';
import { Message } from './Message';

export {
  Advocate,
  AdvocateVerification,
  Client,
  Case,
  Consultation,
  Payment,
  Feedback,
  Notification,
  Appointment,
  Document,
  TimelineEvent,
  Message
};

// ── Centralized Constants/Enums ─────────────────────────────
export const CASE_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
};

export const CASE_STATUS = {
  PENDING: 'pending',
  ACTIVE: 'active',
  HEARING: 'hearing',
  COMPLETED: 'completed'
};

export const PAYMENT_STATUS = {
  UNPAID: 'unpaid',
  PARTIALLY_PAID: 'partially_paid',
  PAID: 'paid'
};

export const RESULT_STATUS = {
  PENDING: 'pending',
  WON: 'won',
  LOST: 'lost',
  SETTLED: 'settled'
};

export const VERIFICATION_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

export const CONSULTATION_STATUS = {
  SCHEDULED: 'scheduled',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

export const CONSULTATION_MODE = {
  VIDEO: 'video',
  VOICE: 'voice',
  CHAT: 'chat'
};

export const APPOINTMENT_TYPE = {
  CONSULTATION: 'consultation',
  HEARING_PREP: 'hearing_prep'
};

// ── Reusable Mock Data Generators ───────────────────────────
export const MockDataProvider = {
  getMockAdvocates: () => [
    new Advocate({
      advocateId: 'adv-1',
      name: 'Ravi Gupta',
      email: 'ravi.gupta@legal24.com',
      phone: '+91 98765 43210',
      specialization: 'Criminal Law',
      experience: '15 years',
      practiceCourts: ['High Court', 'District Court'],
      rating: 4.8,
      reviewCount: 32,
      totalConsultations: 120,
      totalCases: 25,
      casesStats: { active: 8, pending: 2, completed: 15, success: 12, failure: 3 },
      earnings: { total: 150000, pending: 25000, last30Days: 45000 },
      available: true
    }),
    new Advocate({
      advocateId: 'adv-2',
      name: 'Neha Sharma',
      email: 'neha.sharma@legal24.com',
      phone: '+91 98765 43211',
      specialization: 'Civil Law',
      experience: '10 years',
      practiceCourts: ['District Court', 'Family Court'],
      rating: 4.9,
      reviewCount: 45,
      totalConsultations: 180,
      totalCases: 35,
      casesStats: { active: 12, pending: 4, completed: 19, success: 17, failure: 2 },
      earnings: { total: 280000, pending: 40000, last30Days: 70000 },
      available: true
    }),
    new Advocate({
      advocateId: 'adv-3',
      name: 'Arun Patel',
      email: 'arun.patel@legal24.com',
      phone: '+91 98765 43212',
      specialization: 'Corporate Law',
      experience: '8 years',
      practiceCourts: ['High Court', 'National Company Law Tribunal'],
      rating: 4.7,
      reviewCount: 20,
      totalConsultations: 85,
      totalCases: 14,
      casesStats: { active: 5, pending: 1, completed: 8, success: 7, failure: 1 },
      earnings: { total: 320000, pending: 15000, last30Days: 95000 },
      available: true
    }),
    new Advocate({
      advocateId: 'adv-4',
      name: 'Priya Singh',
      email: 'priya.singh@legal24.com',
      phone: '+91 98765 43213',
      specialization: 'Family Law',
      experience: '12 years',
      practiceCourts: ['Family Court', 'High Court'],
      rating: 4.6,
      reviewCount: 28,
      totalConsultations: 110,
      totalCases: 22,
      casesStats: { active: 14, pending: 3, completed: 5, success: 4, failure: 1 },
      earnings: { total: 110000, pending: 18000, last30Days: 32000 },
      available: false
    })
  ],

  getMockClients: () => [
    new Client({
      clientId: 'client-1',
      name: 'Amit Kumar',
      email: 'amit.kumar@example.com',
      phone: '+91 91234 56780',
      casesStats: { active: 1, pending: 0, completed: 2, success: 2, failure: 0 },
      paymentSummary: { totalPaid: 15000, pendingPayments: 5000 }
    }),
    new Client({
      clientId: 'client-2',
      name: 'Sarah Joseph',
      email: 'sarah.j@example.com',
      phone: '+91 91234 56781',
      casesStats: { active: 0, pending: 1, completed: 1, success: 1, failure: 0 },
      paymentSummary: { totalPaid: 8500, pendingPayments: 1200 }
    })
  ],

  getMockCases: () => [
    new Case({
      caseId: 'case-1',
      advocateId: 'adv-1',
      clientId: 'client-1',
      title: 'Property Dispute - Sector 5',
      description: 'Dispute regarding ownership and boundaries of Sector 5 commercial plot.',
      category: 'Property Law',
      priority: CASE_PRIORITY.HIGH,
      status: CASE_STATUS.ACTIVE,
      hearingDates: [new Date(Date.now() + 86400000 * 2).toISOString()],
      paymentStatus: PAYMENT_STATUS.PARTIALLY_PAID,
      result: RESULT_STATUS.PENDING,
      notes: 'Initial documents submitted. Waiting for respondent statement.'
    }),
    new Case({
      caseId: 'case-2',
      advocateId: 'adv-2',
      clientId: 'client-2',
      title: 'Trademark Infringement Notice',
      description: 'Drafting reply to trademark infringement notice sent by competitor.',
      category: 'Corporate Law',
      priority: CASE_PRIORITY.MEDIUM,
      status: CASE_STATUS.HEARING,
      hearingDates: [new Date(Date.now() + 86400000 * 5).toISOString()],
      paymentStatus: PAYMENT_STATUS.PAID,
      result: RESULT_STATUS.PENDING
    })
  ],

  getMockConsultations: () => [
    new Consultation({
      consultationId: 'cons-1',
      advocateId: 'adv-1',
      clientId: 'client-1',
      appointmentId: 'appt-1',
      status: CONSULTATION_STATUS.COMPLETED,
      mode: CONSULTATION_MODE.VIDEO,
      notes: 'Advised client on property document review and next steps.'
    }),
    new Consultation({
      consultationId: 'cons-2',
      advocateId: 'adv-2',
      clientId: 'client-2',
      appointmentId: 'appt-2',
      status: CONSULTATION_STATUS.SCHEDULED,
      mode: CONSULTATION_MODE.CHAT,
      notes: 'Discussion about trademark filing documents.'
    })
  ],

  getMockPayments: () => [
    new Payment({
      paymentId: 'pay-1',
      clientId: 'client-1',
      advocateId: 'adv-1',
      caseId: 'case-1',
      amount: 15000,
      status: 'completed',
      method: 'UPI',
      transactionRef: 'TXN-982736192',
      paidAt: new Date().toISOString()
    }),
    new Payment({
      paymentId: 'pay-2',
      clientId: 'client-2',
      advocateId: 'adv-2',
      caseId: 'case-2',
      amount: 8500,
      status: 'completed',
      method: 'card',
      transactionRef: 'TXN-129847192',
      paidAt: new Date().toISOString()
    })
  ],

  getMockFeedbacks: () => [
    new Feedback({
      feedbackId: 'feed-1',
      clientId: 'client-1',
      advocateId: 'adv-1',
      consultationId: 'cons-1',
      rating: 5,
      comment: 'Very professional. Explored all legal aspects clearly.'
    }),
    new Feedback({
      feedbackId: 'feed-2',
      clientId: 'client-2',
      advocateId: 'adv-2',
      caseId: 'case-2',
      rating: 4,
      comment: 'Got prompt updates and solid advice.'
    })
  ],

  getMockNotifications: () => [
    new Notification({
      notificationId: 'notif-1',
      userId: 'adv-1',
      title: 'New Case Assigned',
      message: 'You have been assigned to Property Dispute - Sector 5.',
      type: 'info'
    }),
    new Notification({
      notificationId: 'notif-2',
      userId: 'client-1',
      title: 'Hearing Date Scheduled',
      message: 'Your hearing for Case Property Dispute is scheduled on May 21.',
      type: 'hearing'
    })
  ],

  getMockAppointments: () => [
    new Appointment({
      appointmentId: 'appt-1',
      advocateId: 'adv-1',
      clientId: 'client-1',
      dateTime: new Date(Date.now() + 86400000).toISOString(),
      duration: 30,
      status: 'scheduled'
    })
  ],

  getMockDocuments: () => [
    new Document({
      documentId: 'doc-1',
      caseId: 'case-1',
      title: 'Land Deed - Original Copy',
      fileUrl: 'https://example.com/docs/land-deed.pdf',
      fileSize: '2.4 MB',
      fileType: 'PDF',
      uploadedBy: 'client-1'
    })
  ],

  getMockTimelineEvents: () => [
    new TimelineEvent({
      eventId: 'evt-1',
      caseId: 'case-1',
      title: 'Case Filed',
      description: 'Case registered and filed in District Court.',
      eventDate: new Date(Date.now() - 86400000 * 5).toISOString(),
      updatedBy: 'adv-1'
    })
  ],

  getMockMessages: () => [
    new Message({
      messageId: 'msg-1',
      senderId: 'client-1',
      receiverId: 'adv-1',
      chatRoomId: 'chat-adv-1-client-1',
      content: 'Hello, what documents are required tomorrow?'
    })
  ],

  getMockVerifications: () => [
    new AdvocateVerification({
      verificationId: 'ver-1',
      advocateId: 'adv-1',
      barCouncilId: 'BCI/6523/2016',
      enrollmentYear: 2016,
      status: VERIFICATION_STATUS.APPROVED
    })
  ]
};
