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
 
// Masabo
class TaskManager{
    constructor(user,task){
        this.user=[]
        this.task =[];
    }

    addUser(users){
        this.user.push(users)
    }
     addTask(task){
        this.task.push(task)
     }
     getTasksByPriority(priority){
        return this.task.filter(a=>a.priority== priority)
    }
    getCompletedTasksCount(){
        return this.task.filter(a=>a.status== "completed").length
    }
    getAverageTaskAge(){
        return this.task.map(elem=>{
            return elem.getDaysOld(elem)
        }).reduce((a,b)=>a+b)/this.task.length
    }
    
}

const manager = new TaskManager();
const user = new User(1, "John", "john@example.com", "dev");
const task1 = new Task(1, "Task 1", "Description 1", "completed", "high");
const task2 = new Task(2, "Task 2", "Description 2", "pending", "high");

manager.addUser(user);
manager.addTask(task1);
manager.addTask(task2);

console.log(manager.getTasksByPriority("high").length); // Expected: 2
console.log(manager.getCompletedTasksCount()); // Expected: 1
console.log(manager.getAverageTaskAge()>0); // Expected: true