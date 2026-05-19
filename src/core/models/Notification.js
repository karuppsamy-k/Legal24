export class Notification {
  constructor({
    notificationId,
    userId, // recipient (clientId / advocateId / adminId)
    title,
    message,
    type = 'info', // 'info', 'hearing', 'payment', 'message'
    isRead = false,
    createdAt = new Date().toISOString()
  } = {}) {
    this.notificationId = notificationId;
    this.id = notificationId; // UI compatibility alias
    this.userId = userId;
    this.title = title;
    this.message = message;
    this.type = type;
    this.isRead = isRead;
    this.createdAt = createdAt;

    // Human-readable time calculation
    const diff = Date.now() - new Date(createdAt).getTime();
    if (diff < 60000) {
      this.time = 'Just now';
    } else if (diff < 3600000) {
      this.time = `${Math.floor(diff / 60000)} mins ago`;
    } else if (diff < 86400000) {
      this.time = `${Math.floor(diff / 3600000)} hours ago`;
    } else {
      this.time = `${Math.floor(diff / 86400000)} days ago`;
    }
  }

  static fromFirebase(id, data) {
    if (!data) return null;
    return new Notification({
      notificationId: id,
      ...data
    });
  }

  toFirebase() {
    return {
      userId: this.userId,
      title: this.title,
      message: this.message,
      type: this.type,
      isRead: this.isRead,
      createdAt: this.createdAt
    };
  }
}
