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
 
// Masabo step 3
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
    
    // Valens step 4

    createTaskBatch(...taskData){
        taskData.forEach((elem,index)=>{
            let task = new Task(index+1,...Object.values(elem))
            this.task.push(task)
        })
        return this.task

    }
    cloneTask(originalTask,updates = {}){
        Object.keys(updates).map(element=>{
            originalTask[element] = updates[element]
        })
        return originalTask
    }
    assignMultipleTasks(userId, ...taskIds){
        let user =this.user.filter((elem)=>elem.id == userId)[0]
        console.log("tasks",this.task)
        taskIds.map(taskId=>{
            let task = this.task.filter((elem)=>elem.id = taskId)
            if(task.length == 0) return 0
            task = task[0]
            console.log(task)
            user.tasks.push(task)
            return user
        })
        return user
    }
    //valens step 4
    
}

// Masabo step3
