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

let obj = new User(1, "valens","iradukunda@gmail.com","admin")
let task = new Task(1, "Complete project", "Finish the final implementation")
obj.assignTask(task)
task = new Task(1, "Complete project", "Finish the final implementation","completed")
obj.assignTask(task)

console.log(obj.getTasksByStatus('pending'))