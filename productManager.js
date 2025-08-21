class Product {
    constructor(id,name,price,category,stock){
        this.name = name;
        this.id = id;
        this.price = price;
        this.category = category;
        this.stock = stock;
    }
} 






































class ProductManager  {

  constructor() {
    this.products = [];
  }

  addProduct(product) {
    this.products.push(product);
  }

   findByCategory(category){
     
    return this.products.filter( elm => elm.category == category );
    
   }
    
   getTotalValue(){
    return  this.products.map(el => el.price).reduce((a,b) => a+b);
   }

 }





