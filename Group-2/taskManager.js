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
//Shami file 0-1

//valens file 2
class User{
    constructor(id,name,email,role){
        // super()
        this.id = id
        this.name = name
        this.email = email
        this.role = role
        this.tasks= []
    }
    assignTask(task){
        this.tasks.push(task)
    }
    getTasksByStatus(status){
        return this.tasks.filter(a=>a.status == status)
    }
}

//valens 2