export class Client {
  constructor({
    clientId,
    name,
    email,
    phone,
    avatar = '',
    casesStats = { active: 0, pending: 0, completed: 0, success: 0, failure: 0 },
    paymentSummary = { totalPaid: 0, pendingPayments: 0 },
    createdAt = new Date().toISOString(),
    updatedAt = new Date().toISOString()
  } = {}) {
    this.clientId = clientId;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.avatar = avatar;
    this.casesStats = casesStats;
    this.paymentSummary = paymentSummary;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromFirebase(id, data) {
    if (!data) return null;
    return new Client({
      clientId: id,
      ...data
    });
  }

  toFirebase() {
    return {
      name: this.name,
      email: this.email,
      phone: this.phone,
      avatar: this.avatar,
      casesStats: this.casesStats,
      paymentSummary: this.paymentSummary,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
