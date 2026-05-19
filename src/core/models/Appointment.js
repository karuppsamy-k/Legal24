export class Appointment {
  constructor({
    appointmentId,
    advocateId,
    clientId,
    dateTime, // ISO String
    duration = 30, // minutes
    status = 'scheduled', // 'scheduled', 'completed', 'cancelled'
    type = 'consultation', // 'consultation', 'hearing_prep'
    createdAt = new Date().toISOString()
  } = {}) {
    this.appointmentId = appointmentId;
    this.advocateId = advocateId;
    this.clientId = clientId;
    this.dateTime = dateTime;
    this.duration = duration;
    this.status = status;
    this.type = type;
    this.createdAt = createdAt;
  }

  static fromFirebase(id, data) {
    if (!data) return null;
    return new Appointment({
      appointmentId: id,
      ...data
    });
  }

  toFirebase() {
    return {
      advocateId: this.advocateId,
      clientId: this.clientId,
      dateTime: this.dateTime,
      duration: this.duration,
      status: this.status,
      type: this.type,
      createdAt: this.createdAt
    };
  }
}
