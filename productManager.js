class Product {
    constructor(id,name,price,category,stock){
        this.name = name;
        this.id = id;
        this.price = price;
        this.category = category;
        this.stock = stock;
    }
} 

class ProductManager {
   constructor(){
    this.products= [];
   }

   addProduct(){

     return this.products.push(Product);
          
   }


   
   findByCategory(category){


   }
    
   getTotalValue(){
    return 
   }

 }

const manager = new ProductManager();
manager.addProduct(new Product(1, "Laptop", 999.99, "Electronics", 5));
manager.addProduct(new Product(2, "Chair", 199.99, "Furniture", 3));

// // console.log(manager.findByCategory("Electronics").length); // Expected: 1
// // console.log(manager.getTotalValue()); // Expected: 5599.92
// console.log(manager.addProduct())




