# Group 1: E-Commerce Product Manager Challenge

## Overview

Build a comprehensive product management system for an e-commerce platform using ES6 features. You'll work with classes, modules, async/await, destructuring, and more.

## Setup

1. Create a file called `productManager.js`
2. All your code should be written in this file
3. Run tests using: `node productManager.js`

## Steps

### Step 0: Basic Product Class

**Objective**: Create a Product class with constructor and basic methods

**Requirements**:

- Create a `Product` class with properties: id, name, price, category, stock
- Add a method `getInfo()` that returns product information as a formatted string
- Use template literals for string formatting

**Test Case**:

```javascript
const product = new Product(1, "Laptop", 999.99, "Electronics", 5);
console.log(product.getInfo());
// Expected: "Product: Laptop (ID: 1) - $999.99 - Category: Electronics - Stock: 5"
```

### Step 1: Enhanced Product with Getters/Setters

**Objective**: Add getters and setters with validation

**Requirements**:

- Add getter for `isAvailable` (returns true if stock > 0)
- Add setter for `price` that validates price is positive
- Add setter for `stock` that validates stock is non-negative

**Test Case**:

```javascript
const product = new Product(1, "Laptop", 999.99, "Electronics", 5);
console.log(product.isAvailable); // Expected: true
product.stock = 0;
console.log(product.isAvailable); // Expected: false
try {
  product.price = -50; // Should throw error
} catch (e) {
  console.log("Price validation working"); // Expected output
}
```

### Step 2: Static Methods and Arrow Functions

**Objective**: Add static methods and use arrow functions

**Requirements**:

- Add static method `comparePrice(product1, product2)` that returns the cheaper product
- Add static method `generateId()` that returns a random 6-digit number
- Use arrow functions where appropriate

**Test Case**:

```javascript
const product1 = new Product(1, "Laptop", 999.99, "Electronics", 5);
const product2 = new Product(2, "Mouse", 29.99, "Electronics", 10);
const cheaper = Product.comparePrice(product1, product2);
console.log(cheaper.name); // Expected: "Mouse"
console.log(Product.generateId()); // Expected: 6-digit number
```

### Step 3: ProductManager Class with Array Methods

**Objective**: Create a manager class using ES6 array methods

**Requirements**:

- Create `ProductManager` class with `products` array property
- Add method `addProduct(product)`
- Add method `findByCategory(category)` using filter
- Add method `getTotalValue()` using reduce

**Test Case**:

```javascript
const manager = new ProductManager();
manager.addProduct(new Product(1, "Laptop", 999.99, "Electronics", 5));
manager.addProduct(new Product(2, "Chair", 199.99, "Furniture", 3));
console.log(manager.findByCategory("Electronics").length); // Expected: 1
console.log(manager.getTotalValue()); // Expected: 5599.92
```

### Step 4: Destructuring and Spread Operator

**Objective**: Implement methods using destructuring and spread

**Requirements**:

- Add method `updateProduct(id, updates)` that uses object destructuring
- Add method `getProductSummary()` that returns array of objects with destructured properties
- Use spread operator to clone products array

**Test Case**:

```javascript
const manager = new ProductManager();
manager.addProduct(new Product(1, "Laptop", 999.99, "Electronics", 5));
manager.updateProduct(1, { price: 899.99, stock: 10 });
const summary = manager.getProductSummary();
console.log(summary[0]); // Expected: { name: "Laptop", price: 899.99, category: "Electronics" }
```

### Step 5: Default Parameters and Rest Parameters

**Objective**: Use default and rest parameters

**Requirements**:

- Add method `searchProducts(...criteria)` that accepts multiple search terms
- Add method `createBulkDiscount(percentage = 10, ...productIds)` with default parameter
- Implement flexible parameter handling

**Test Case**:

```javascript
const manager = new ProductManager();
manager.addProduct(new Product(1, "Laptop", 1000, "Electronics", 5));
manager.addProduct(new Product(2, "Gaming Laptop", 1500, "Electronics", 3));
const results = manager.searchProducts("Laptop", "Gaming");
console.log(results.length); // Expected: 2
manager.createBulkDiscount(15, 1, 2);
console.log(manager.products[0].price); // Expected: 850
```

### Step 6: Promises and Async Operations

**Objective**: Implement async operations with Promises

**Requirements**:

- Add async method `fetchProductData(id)` that simulates API call
- Add method `saveToDatabase()` that returns a Promise
- Use setTimeout to simulate async operations

**Test Case**:

```javascript
const manager = new ProductManager();
manager.addProduct(new Product(1, "Laptop", 999.99, "Electronics", 5));

manager.fetchProductData(1).then((data) => {
  console.log(data.name); // Expected: "Laptop"
});

manager.saveToDatabase().then((result) => {
  console.log(result); // Expected: "Data saved successfully"
});
```

### Step 7: Async/Await Implementation

**Objective**: Convert Promise-based code to async/await

**Requirements**:

- Add async method `bulkUpdate(updates)` using async/await
- Add async method `generateReport()` that uses multiple await calls
- Implement proper error handling with try/catch

**Test Case**:

```javascript
const manager = new ProductManager();
manager.addProduct(new Product(1, "Laptop", 999.99, "Electronics", 5));

(async () => {
  try {
    await manager.bulkUpdate([{ id: 1, stock: 10 }]);
    const report = await manager.generateReport();
    console.log(report.totalProducts); // Expected: 1
  } catch (error) {
    console.log(error.message);
  }
})();
```

### Step 8: Map and Set Collections

**Objective**: Use Map and Set for advanced data management

**Requirements**:

- Add `categoryMap` property using Map to track categories
- Add `uniqueSuppliers` property using Set
- Add method `addSupplier(productId, supplier)` using Map operations

**Test Case**:

```javascript
const manager = new ProductManager();
manager.addProduct(new Product(1, "Laptop", 999.99, "Electronics", 5));
manager.addSupplier(1, "TechCorp");
manager.addSupplier(1, "TechCorp"); // Duplicate should be ignored
console.log(manager.uniqueSuppliers.size); // Expected: 1
console.log(manager.categoryMap.get("Electronics")); // Expected: 1
```

### Step 9: Symbol and Advanced Features

**Objective**: Implement Symbols and advanced ES6 features

**Requirements**:

- Add Symbol properties for internal methods
- Implement iterator protocol for ProductManager
- Add method using computed property names

**Test Case**:

```javascript
const manager = new ProductManager();
manager.addProduct(new Product(1, "Laptop", 999.99, "Electronics", 5));
manager.addProduct(new Product(2, "Mouse", 29.99, "Electronics", 10));

// Should be iterable
for (let product of manager) {
  console.log(product.name); // Expected: "Laptop", "Mouse"
}

const dynamicMethod = "findBy" + "Price";
console.log(typeof manager[dynamicMethod]); // Expected: "function"
```

### Step 10: Complete Integration and Export

**Objective**: Create a complete module with proper exports

**Requirements**:

- Add module exports for both classes
- Create a demonstration function that uses all features
- Add comprehensive error handling throughout
- Create a final test that demonstrates all functionality

**Test Case**:

```javascript
// At the end of your file, add:
const demo = async () => {
  const manager = new ProductManager();

  // Add products
  manager.addProduct(new Product(1, "Laptop", 999.99, "Electronics", 5));
  manager.addProduct(new Product(2, "Chair", 199.99, "Furniture", 3));

  // Test all features
  console.log("Total products:", manager.products.length); // Expected: 2
  console.log(
    "Electronics count:",
    manager.findByCategory("Electronics").length
  ); // Expected: 1

  // Test async operations
  try {
    await manager.bulkUpdate([{ id: 1, stock: 10 }]);
    const report = await manager.generateReport();
    console.log("Report generated:", !!report); // Expected: true
  } catch (error) {
    console.log("Error:", error.message);
  }

  // Test iteration
  let count = 0;
  for (let product of manager) {
    count++;
  }
  console.log("Iterated products:", count); // Expected: 2
};

demo();

// Exports (uncomment when using as module)
// module.exports = { Product, ProductManager };
```

## Completion Checklist

- [ ] Step 0: Basic Product class
- [ ] Step 1: Getters and setters
- [ ] Step 2: Static methods and arrow functions
- [ ] Step 3: ProductManager with array methods
- [ ] Step 4: Destructuring and spread operator
- [ ] Step 5: Default and rest parameters
- [ ] Step 6: Promises implementation
- [ ] Step 7: Async/await conversion
- [ ] Step 8: Map and Set usage
- [ ] Step 9: Symbols and advanced features
- [ ] Step 10: Complete integration
