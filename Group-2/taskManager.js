class Task{
  constructor(id,title,description,status="pending",priority="medium",createdAt){
    this.id=id;
    this.title=title;
    this.description=description;
    this.status=status;
    this.priority=priority;
    this.createdAt= new Date();
    
  }
}
const task = new Task(1, "Complete project", "Finish the final implementation");
console.log(task.status);
console.log(task.createdAt instanceof Date);