 class ProductManager  {
   constructor(products){
    this.products= products;
   }

   addPaddProduct(){
    return   set(`${this.products}`);

   }

 }


 let instance= new ProductManager(1, "Laptop", 999.99, "Electronics", 5)


