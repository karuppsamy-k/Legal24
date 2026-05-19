export class Feedback {
  constructor({
    feedbackId,
    clientId,
    advocateId,
    caseId = null,
    consultationId = null,
    rating, // 1 to 5
    comment = '',
    createdAt = new Date().toISOString()
  } = {}) {
    this.feedbackId = feedbackId;
    this.clientId = clientId;
    this.advocateId = advocateId;
    this.caseId = caseId;
    this.consultationId = consultationId;
    this.rating = rating;
    this.comment = comment;
    this.createdAt = createdAt;
  }

  static fromFirebase(id, data) {
    if (!data) return null;
    return new Feedback({
      feedbackId: id,
      ...data
    });
  }

  toFirebase() {
    return {
      clientId: this.clientId,
      advocateId: this.advocateId,
      caseId: this.caseId,
      consultationId: this.consultationId,
      rating: this.rating,
      comment: this.comment,
      createdAt: this.createdAt
    };
  }
}
