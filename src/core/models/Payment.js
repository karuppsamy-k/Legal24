export class Payment {
  constructor({
    paymentId,
    clientId,
    advocateId,
    caseId = null,
    consultationId = null,
    amount,
    currency = 'INR',
    status = 'pending', // 'pending', 'completed', 'failed', 'refunded'
    method = 'UPI', // 'UPI', 'card', 'netbanking'
    transactionRef = '',
    paidAt = null,
    createdAt = new Date().toISOString()
  } = {}) {
    this.paymentId = paymentId;
    this.clientId = clientId;
    this.advocateId = advocateId;
    this.caseId = caseId;
    this.consultationId = consultationId;
    this.amount = amount;
    this.currency = currency;
    this.status = status;
    this.method = method;
    this.transactionRef = transactionRef;
    this.paidAt = paidAt;
    this.createdAt = createdAt;
  }

  static fromFirebase(id, data) {
    if (!data) return null;
    return new Payment({
      paymentId: id,
      ...data
    });
  }

  toFirebase() {
    return {
      clientId: this.clientId,
      advocateId: this.advocateId,
      caseId: this.caseId,
      consultationId: this.consultationId,
      amount: this.amount,
      currency: this.currency,
      status: this.status,
      method: this.method,
      transactionRef: this.transactionRef,
      paidAt: this.paidAt,
      createdAt: this.createdAt
    };
  }
}
