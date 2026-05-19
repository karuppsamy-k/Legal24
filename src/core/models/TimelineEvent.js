export class TimelineEvent {
  constructor({
    eventId,
    caseId,
    title,
    description = '',
    eventDate, // ISO string
    updatedBy, // userId
    createdAt = new Date().toISOString()
  } = {}) {
    this.eventId = eventId;
    this.caseId = caseId;
    this.title = title;
    this.description = description;
    this.eventDate = eventDate;
    this.updatedBy = updatedBy;
    this.createdAt = createdAt;
  }

  static fromFirebase(id, data) {
    if (!data) return null;
    return new TimelineEvent({
      eventId: id,
      ...data
    });
  }

  toFirebase() {
    return {
      caseId: this.caseId,
      title: this.title,
      description: this.description,
      eventDate: this.eventDate,
      updatedBy: this.updatedBy,
      createdAt: this.createdAt
    };
  }
}
