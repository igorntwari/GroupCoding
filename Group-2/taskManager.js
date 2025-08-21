 class TaskManager{
    constructor(user,task,priority){
       this.user =user;
       this.task = task;
       this.priority =priority;
    }
   static addUser(){
    console.log(`${this.user}`)
    }

    addTask(){
   console.log(`${this.task}`)
    }

    getTasksByPriority(priority){
     console.log(`${priority.filter(prior => prior === "high")}`)
    }

   getCompletedTasksCount(){ 
    console.log(``)
   }

//    getAverageTaskAge(){}
 }

 let manager1 = new TaskManager("mufasa","dev","low")
  let manager2 = new TaskManager("mufasa","dev","high")
console.log(manager1,manager2)
 