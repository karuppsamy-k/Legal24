export class AdvocateVerification {
  constructor({
    verificationId,
    advocateId,
    barCouncilId,
    enrollmentYear,
    idProofUrl = '',
    licenseProofUrl = '',
    status = 'pending', // 'pending', 'approved', 'rejected'
    verifiedBy = null, // adminId
    comments = '',
    verifiedAt = null,
    submittedAt = new Date().toISOString()
  } = {}) {
    this.verificationId = verificationId;
    this.advocateId = advocateId;
    this.barCouncilId = barCouncilId;
    this.enrollmentYear = enrollmentYear;
    this.idProofUrl = idProofUrl;
    this.licenseProofUrl = licenseProofUrl;
    this.status = status;
    this.verifiedBy = verifiedBy;
    this.comments = comments;
    this.verifiedAt = verifiedAt;
    this.submittedAt = submittedAt;
  }

  static fromFirebase(id, data) {
    if (!data) return null;
    return new AdvocateVerification({
      verificationId: id,
      ...data
    });
  }

  toFirebase() {
    return {
      advocateId: this.advocateId,
      barCouncilId: this.barCouncilId,
      enrollmentYear: this.enrollmentYear,
      idProofUrl: this.idProofUrl,
      licenseProofUrl: this.licenseProofUrl,
      status: this.status,
      verifiedBy: this.verifiedBy,
      comments: this.comments,
      verifiedAt: this.verifiedAt,
      submittedAt: this.submittedAt
    };
  }
}
