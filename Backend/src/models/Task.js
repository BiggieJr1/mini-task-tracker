class Task {
  constructor(id, title, description, status = 'pending', createdAt = new Date()) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
  }
}

module.exports = Task;
