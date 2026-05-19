export class Document {
  constructor({
    documentId,
    caseId = null,
    clientId = null,
    advocateId = null,
    title,
    fileUrl,
    fileSize,
    fileType,
    uploadedBy, // userId
    uploadedAt = new Date().toISOString()
  } = {}) {
    this.documentId = documentId;
    this.caseId = caseId;
    this.clientId = clientId;
    this.advocateId = advocateId;
    this.title = title;
    this.fileUrl = fileUrl;
    this.fileSize = fileSize;
    this.fileType = fileType;
    this.uploadedBy = uploadedBy;
    this.uploadedAt = uploadedAt;
  }

  static fromFirebase(id, data) {
    if (!data) return null;
    return new Document({
      documentId: id,
      ...data
    });
  }

  toFirebase() {
    return {
      caseId: this.caseId,
      clientId: this.clientId,
      advocateId: this.advocateId,
      title: this.title,
      fileUrl: this.fileUrl,
      fileSize: this.fileSize,
      fileType: this.fileType,
      uploadedBy: this.uploadedBy,
      uploadedAt: this.uploadedAt
    };
  }
}
