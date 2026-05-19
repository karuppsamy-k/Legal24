export class Message {
  constructor({
    messageId,
    senderId,
    receiverId,
    chatRoomId = null,
    content,
    isRead = false,
    sentAt = new Date().toISOString()
  } = {}) {
    this.messageId = messageId;
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.chatRoomId = chatRoomId;
    this.content = content;
    this.isRead = isRead;
    this.sentAt = sentAt;
  }

  static fromFirebase(id, data) {
    if (!data) return null;
    return new Message({
      messageId: id,
      ...data
    });
  }

  toFirebase() {
    return {
      senderId: this.senderId,
      receiverId: this.receiverId,
      chatRoomId: this.chatRoomId,
      content: this.content,
      isRead: this.isRead,
      sentAt: this.sentAt
    };
  }
}
