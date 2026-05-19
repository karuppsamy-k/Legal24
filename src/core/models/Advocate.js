export class Advocate {
  constructor({
    advocateId,
    name,
    email,
    phone,
    avatar = '',
    specialization,
    experience = '0 years',
    practiceCourts = [],
    rating = 5.0,
    reviewCount = 0,
    totalConsultations = 0,
    totalCases = 0,
    casesStats = { active: 0, pending: 0, completed: 0, success: 0, failure: 0 },
    earnings = { total: 0, pending: 0, last30Days: 0 },
    available = true,
    createdAt = new Date().toISOString(),
    updatedAt = new Date().toISOString()
  } = {}) {
    this.advocateId = advocateId;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.avatar = avatar;
    this.specialization = specialization;
    this.experience = experience;
    this.practiceCourts = practiceCourts;
    this.rating = rating;
    this.reviewCount = reviewCount;
    this.totalConsultations = totalConsultations;
    this.totalCases = totalCases;
    this.casesStats = casesStats;
    this.earnings = earnings;
    this.available = available;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromFirebase(id, data) {
    if (!data) return null;
    return new Advocate({
      advocateId: id,
      ...data
    });
  }

  toFirebase() {
    return {
      name: this.name,
      email: this.email,
      phone: this.phone,
      avatar: this.avatar,
      specialization: this.specialization,
      experience: this.experience,
      practiceCourts: this.practiceCourts,
      rating: this.rating,
      reviewCount: this.reviewCount,
      totalConsultations: this.totalConsultations,
      totalCases: this.totalCases,
      casesStats: this.casesStats,
      earnings: this.earnings,
      available: this.available,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
