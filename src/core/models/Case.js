export class Case {
  constructor({
    caseId,
    advocateId,
    clientId,
    title,
    description,
    category,
    priority = 'medium', // 'low', 'medium', 'high', 'critical'
    status = 'pending', // 'pending', 'active', 'hearing', 'completed'
    hearingDates = [],
    createdAt = new Date().toISOString(),
    updatedAt = new Date().toISOString(),
    documentIds = [],
    timelineIds = [],
    paymentStatus = 'unpaid', // 'unpaid', 'partially_paid', 'paid'
    result = 'pending', // 'pending', 'won', 'lost', 'settled'
    notes = ''
  } = {}) {
    this.caseId = caseId;
    this.advocateId = advocateId;
    this.clientId = clientId;
    this.title = title;
    this.description = description;
    this.category = category;
    this.priority = priority;
    this.status = status;
    this.hearingDates = hearingDates;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.documentIds = documentIds;
    this.timelineIds = timelineIds;
    this.paymentStatus = paymentStatus;
    this.result = result;
    this.notes = notes;
  }

  static fromFirebase(id, data) {
    if (!data) return null;
    return new Case({
      caseId: id,
      ...data
    });
  }

  toFirebase() {
    return {
      advocateId: this.advocateId,
      clientId: this.clientId,
      title: this.title,
      description: this.description,
      category: this.category,
      priority: this.priority,
      status: this.status,
      hearingDates: this.hearingDates,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      documentIds: this.documentIds,
      timelineIds: this.timelineIds,
      paymentStatus: this.paymentStatus,
      result: this.result,
      notes: this.notes
    };
  }
}
