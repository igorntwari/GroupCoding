# Group 2: Task Management System Challenge

## Overview

Build a comprehensive task management system using ES6 features. You'll implement task creation, assignment, tracking, and reporting with modern JavaScript features.

## Setup

1. Create a file called `taskManager.js`
2. All your code should be written in this file
3. Run tests using: `node taskManager.js`

## Steps

### Step 0: Basic Task Class

**Objective**: Create a Task class with essential properties

**Requirements**:

- Create a `Task` class with properties: id, title, description, status, priority, createdAt
- Status should default to "pending"
- Priority should default to "medium"
- Use Date object for createdAt

**Test Case**:

```javascript
const task = new Task(1, "Complete project", "Finish the final implementation");
console.log(task.status); // Expected: "pending"
console.log(task.priority); // Expected: "medium"
console.log(task.createdAt instanceof Date); // Expected: true
```

### Step 1: Task Methods with Template Literals

**Objective**: Add methods using template literals and arrow functions

**Requirements**:

- Add `getDescription()` method returning formatted string with template literals
- Add `updateStatus(newStatus)` method
- Add `getDaysOld()` method calculating days since creation
- Use arrow functions for helper methods

**Test Case**:

```javascript
const task = new Task(
  1,
  "Complete project",
  "Finish implementation",
  "pending",
  "high"
);
console.log(task.getDescription());
// Expected: "Task #1: Complete project\nDescription: Finish implementation\nStatus: pending\nPriority: high"

task.updateStatus("in-progress");
console.log(task.status); // Expected: "in-progress"
console.log(task.getDaysOld() >= 0); // Expected: true
```

### Step 2: User Class with Destructuring

**Objective**: Create User class and implement destructuring

**Requirements**:

- Create `User` class with properties: id, name, email, role, tasks array
- Add method `assignTask(task)` that adds task to user's tasks
- Add method `getTasksByStatus(status)` using array filter
- Use destructuring in method parameters where appropriate

**Test Case**:

```javascript
const user = new User(1, "John Doe", "john@example.com", "developer");
const task = new Task(1, "Debug feature", "Fix login bug");
user.assignTask(task);

const pendingTasks = user.getTasksByStatus("pending");
console.log(pendingTasks.length); // Expected: 1
console.log(user.tasks.length); // Expected: 1
```

### Step 3: TaskManager with Advanced Array Methods

**Objective**: Create main manager class with ES6 array methods

**Requirements**:

- Create `TaskManager` class with users and tasks arrays
- Add method `addUser(user)` and `addTask(task)`
- Add method `getTasksByPriority(priority)` using filter
- Add method `getCompletedTasksCount()` using filter and length
- Add method `getAverageTaskAge()` using reduce

**Test Case**:

```javascript
const manager = new TaskManager();
const user = new User(1, "John", "john@example.com", "dev");
const task1 = new Task(1, "Task 1", "Description 1", "completed", "high");
const task2 = new Task(2, "Task 2", "Description 2", "pending", "high");

manager.addUser(user);
manager.addTask(task1);
manager.addTask(task2);

console.log(manager.getTasksByPriority("high").length); // Expected: 2
console.log(manager.getCompletedTasksCount()); // Expected: 1
console.log(manager.getAverageTaskAge() >= 0); // Expected: true
```

### Step 4: Spread and Rest Operators

**Objective**: Implement functionality using spread and rest operators

**Requirements**:

- Add method `createTaskBatch(...taskData)` using rest parameters
- Add method `mergeTaskLists(...taskLists)` using spread operator
- Add method `cloneTask(originalTask, updates = {})` using spread for object merging
- Add method `assignMultipleTasks(userId, ...taskIds)` using rest parameters

**Test Case**:

```javascript
const manager = new TaskManager();
const tasks = manager.createTaskBatch(
  { title: "Task 1", description: "Desc 1" },
  { title: "Task 2", description: "Desc 2", priority: "high" }
);

console.log(tasks.length); // Expected: 2
console.log(tasks[1].priority); // Expected: "high"

const clonedTask = manager.cloneTask(tasks[0], {
  priority: "low",
  status: "in-progress",
});
console.log(clonedTask.priority); // Expected: "low"
console.log(clonedTask.title); // Expected: "Task 1"
```

### Step 5: Default Parameters and Object Enhancements

**Objective**: Use default parameters and enhanced object literals

**Requirements**:

- Add method `createTask(title, description, options = {})` with default parameters
- Use object shorthand properties and computed property names
- Add method `generateReport(format = "summary", includeUsers = true)`
- Implement method that uses enhanced object literal syntax

**Test Case**:

```javascript
const manager = new TaskManager();
const task = manager.createTask("New Task", "Description", {
  priority: "high",
});
console.log(task.priority); // Expected: "high"
console.log(task.status); // Expected: "pending" (default)

const report = manager.generateReport();
console.log(typeof report); // Expected: "object"
console.log(report.hasOwnProperty("summary")); // Expected: true
```

### Step 6: Promises and Asynchronous Operations

**Objective**: Implement async operations with Promises

**Requirements**:

- Add method `saveTask(task)` that returns a Promise (simulate API call)
- Add method `loadTasksFromAPI()` that returns Promise with mock data
- Add method `validateTask(task)` that returns Promise resolving to boolean
- Use setTimeout to simulate async operations

**Test Case**:

```javascript
const manager = new TaskManager();
const task = new Task(1, "Test Task", "Description");

manager.saveTask(task).then((result) => {
  console.log(result.success); // Expected: true
  console.log(result.id); // Expected: 1
});

manager.loadTasksFromAPI().then((tasks) => {
  console.log(Array.isArray(tasks)); // Expected: true
  console.log(tasks.length > 0); // Expected: true
});

manager.validateTask(task).then((isValid) => {
  console.log(typeof isValid); // Expected: "boolean"
});
```

### Step 7: Async/Await Implementation

**Objective**: Convert to async/await and add error handling

**Requirements**:

- Add async method `syncTasks()` that uses multiple await calls
- Add async method `bulkCreateTasks(taskDataArray)` with proper error handling
- Add async method `generateAsyncReport()` that aggregates multiple async operations
- Implement try/catch blocks for error handling

**Test Case**:

```javascript
const manager = new TaskManager();

(async () => {
  try {
    const result = await manager.syncTasks();
    console.log(result.synchronized); // Expected: true

    const tasks = await manager.bulkCreateTasks([
      { title: "Task 1", description: "Desc 1" },
      { title: "Task 2", description: "Desc 2" },
    ]);
    console.log(tasks.length); // Expected: 2

    const report = await manager.generateAsyncReport();
    console.log(report.hasOwnProperty("totalTasks")); // Expected: true
  } catch (error) {
    console.log(error.message);
  }
})();
```

### Step 8: Map and Set for Advanced Tracking

**Objective**: Use Map and Set collections

**Requirements**:

- Add `taskCategories` property using Map to track categories
- Add `activeUsers` property using Set for unique user tracking
- Add method `categorizeTask(taskId, category)` using Map operations
- Add method `trackUserActivity(userId)` using Set operations

**Test Case**:

```javascript
const manager = new TaskManager();
const user = new User(1, "John", "john@example.com", "dev");
const task = new Task(1, "Test", "Description");

manager.addUser(user);
manager.addTask(task);
manager.categorizeTask(1, "development");
manager.trackUserActivity(1);

console.log(manager.taskCategories.get("development")); // Expected: array with task
console.log(manager.activeUsers.has(1)); // Expected: true
console.log(manager.activeUsers.size); // Expected: 1
```

### Step 9: Symbols and Iterator Protocol

**Objective**: Implement Symbols and make objects iterable

**Requirements**:

- Add Symbol properties for internal methods
- Implement iterator protocol for TaskManager (iterate through tasks)
- Add method using computed property names based on user input
- Create private methods using Symbols

**Test Case**:

```javascript
const manager = new TaskManager();
manager.addTask(new Task(1, "Task 1", "Desc 1"));
manager.addTask(new Task(2, "Task 2", "Desc 2"));

// Should be iterable
let count = 0;
for (let task of manager) {
  count++;
  console.log(task.title); // Expected: "Task 1", "Task 2"
}
console.log(count); // Expected: 2

// Dynamic method creation
const dynamicMethod = "findBy" + "Status";
if (typeof manager[dynamicMethod] === "function") {
  console.log("Dynamic method created"); // Expected output
}
```

### Step 10: Complete System Integration

**Objective**: Create comprehensive system with all ES6 features

**Requirements**:

- Add module exports for all classes
- Create complete workflow demonstration
- Add comprehensive error handling and validation
- Implement notification system using Promises
- Add final integration test

**Test Case**:

```javascript
// Complete workflow demonstration
const runCompleteWorkflow = async () => {
  const manager = new TaskManager();

  // Create users
  const user1 = new User(1, "Alice", "alice@example.com", "developer");
  const user2 = new User(2, "Bob", "bob@example.com", "designer");

  manager.addUser(user1);
  manager.addUser(user2);

  // Create and assign tasks
  const tasks = manager.createTaskBatch(
    {
      title: "Implement login",
      description: "Create login feature",
      priority: "high",
    },
    {
      title: "Design UI",
      description: "Create user interface",
      priority: "medium",
    },
    { title: "Write tests", description: "Unit tests", priority: "low" }
  );

  tasks.forEach((task) => manager.addTask(task));

  // Assign tasks to users
  manager.assignMultipleTasks(1, 1, 3); // Alice gets tasks 1 and 3
  manager.assignMultipleTasks(2, 2); // Bob gets task 2

  // Test async operations
  try {
    await manager.syncTasks();
    const report = await manager.generateAsyncReport();

    console.log("Workflow completed successfully");
    console.log("Total tasks:", report.totalTasks); // Expected: 3
    console.log("Active users:", manager.activeUsers.size); // Expected: 2

    // Test iteration
    let taskCount = 0;
    for (let task of manager) {
      taskCount++;
    }
    console.log("Iterated tasks:", taskCount); // Expected: 3

    // Test filtering and searching
    const highPriorityTasks = manager.getTasksByPriority("high");
    console.log("High priority tasks:", highPriorityTasks.length); // Expected: 1

    const pendingTasks = manager.tasks.filter((t) => t.status === "pending");
    console.log("Pending tasks:", pendingTasks.length); // Expected: 3
  } catch (error) {
    console.error("Workflow error:", error.message);
  }
};

runCompleteWorkflow();

// Exports (uncomment when using as module)
// module.exports = { Task, User, TaskManager };
```

## Completion Checklist

- [ ] Step 0: Basic Task class
- [ ] Step 1: Methods with template literals
- [ ] Step 2: User class with destructuring
- [ ] Step 3: TaskManager with array methods
- [ ] Step 4: Spread and rest operators
- [ ] Step 5: Default parameters and object enhancements
- [ ] Step 6: Promises implementation
- [ ] Step 7: Async/await conversion
- [ ] Step 8: Map and Set collections
- [ ] Step 9: Symbols and iterator protocol
- [ ] Step 10: Complete system integration
