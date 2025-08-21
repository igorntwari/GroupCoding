class Task{
  constructor(id,title,description,status="pending",priority="medium",createdAt){
    this.id=id;
    this.title=title;
    this.description=description;
    this.status=status;
    this.priority=priority;
    this.createdAt= new Date();
  }

  getDescription(){
    return `Task #${this.id}:${this.title}
    Description: ${this.description}
    Status:${this.status}
    Priority:${this.priority}`
  }
  updateStatus(newStatus){
    this.status =newStatus
  }
  getDaysOld(){
   return new Date() - this.createdAt;
  }
}

