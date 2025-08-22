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
        // Masabo step3
    }

    //shami 05
    createTask(title = "Data", description ="Collectiong data", options = {}){
        let {status="pending",priority = "medium"} = options
        let task = new Task(1,title,description,status,priority)
        this.task.push(task)
        return task
    }
    generateReport(){
        let task = this.task[0]
        task.summary = "summary"
        return task
    }
    //shami05

        // Masabo step 6
     saveTask(task){
  return new Promise((resolve,reject) =>{
      setTimeout(() =>{
      let done = true
          if(done){
              resolve({
                  success:true,
                  id:task.id,
                 })
          }else{
              reject({
                  success:false,
                  message:"id not found"
              })
          }
      },1000)
  })
    }

    loadTasksFromAPI(){
        
        return new Promise((resolve,reject) =>{
            setTimeout(() =>{
            let done = true
                if(done){
                    resolve([
                    new Task(1, "Task 1", "Loaded from API"),
                    new Task(2, "Task 2", "Loaded from API", "completed")
                ]);
                }else{
                    reject("Not found")
                }
            },1200)
        })  
    }
    validateTask(task){
         
        return new Promise((resolve,reject) =>{
            setTimeout(() =>{
            let done = true
                if(done){
                    resolve(true)
                }else{
                    reject(false)
                }
            },1400)
        }) 
    }
}
    
// Masabo step 6

