export class Consultation {
  constructor({
    consultationId,
    advocateId,
    clientId,
    appointmentId,
    status = 'scheduled', // 'scheduled', 'completed', 'cancelled'
    mode = 'video', // 'video', 'voice', 'chat'
    notes = '',
    createdAt = new Date().toISOString()
  } = {}) {
    this.consultationId = consultationId;
    this.advocateId = advocateId;
    this.clientId = clientId;
    this.appointmentId = appointmentId;
    this.status = status;
    this.mode = mode;
    this.notes = notes;
    this.createdAt = createdAt;
  }

  static fromFirebase(id, data) {
    if (!data) return null;
    return new Consultation({
      consultationId: id,
      ...data
    });
  }

  toFirebase() {
    return {
      advocateId: this.advocateId,
      clientId: this.clientId,
      appointmentId: this.appointmentId,
      status: this.status,
      mode: this.mode,
      notes: this.notes,
      createdAt: this.createdAt
    };
  }
}
