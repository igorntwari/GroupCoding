
class Product {
  constructor(id, name, price, category, stock) {
    this.name = name;
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.stock = stock;
  }


  getInfo = function () {
    return `Product: ${this.name} (ID: ${this.id}) - $${this.price} - Category: ${this.category}`
  }
  get isAvailable() {
    return this.stock > 0 ? true : false;
  }
  set price(value) {
    if (value <= 0) {
      throw new Error("Price can't be below zero");
    }
    this._price = value;
  }
  set stock(val) {
    if (val < 0) {
      throw new Error("stock have always to be positive")
    }
    this._stock = val;
  }

  static comparePrice(product1, product2) {
    if (product1.price === product2.price) {
      return `The Products price are equal`
    }
    return product1.price > product2.price ? product2 : product1;
  }

  static generateId() {
    return Math.floor(100000 + Math.random() * 900000);
  }

}

class ProductManager {
  constructor() {
    this.products = [];
        this.categoryMap = new Map();     
        this.uniqueSuppliers = new Set();
         this.supplierMap = new Map(); 
       
  }

  addProduct(product) {
    this.products.push(product);
  }

  findByCategory(category) {
    return this.products.filter(p => p.category === category);
  }

  getTotalValue() {
    return this.products.reduce((total, p) => total + (p.price * p.stock), 0);
  }
  updateProduct({ id, updates }) {
    this.products = this.products.map(elm =>
      elm.id === id ? { ...elm, ...updates } : elm
    );
  }

  getProductSummary() {
    return this.products.map(({ name, _price, category }) => ({
      name,
      _price,
      category
    }));
  }
  searchProduct(...values) {
    return this.products.map(ele => values.filter(elem => ele.name.includes(elem))).filter(element => element.length > 0);
  }
  createBulkDiscount(percentage, ...productIds) {
    let results = []
    let getProducts = this.products.map(ele => productIds.filter(el => ele.id === el)).filter(ok => ok.length > 0).flat(Infinity);
    this.products.forEach(e => {
      for (let id of getProducts) {
        if (e.id === id) {
          e._price = e._price - (e._price * percentage) / 100;
          results.push(e._price)
        }
      }
    })
    return results;
  };


    async fetchProductData(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = this.products.find(proi => proi.id === id);
        if (product) {
          resolve(product);
        } else {
          reject(new Error("Product you its now here men!!😂"));
        }
      }, 1000);
    });
  }


  saveToDatabase() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {

        const success = Math.random()
        if (success) {
          resolve("Data saved Then Congs 👩‍💻👩‍💻 ");
        } else {
          reject(new Error("Fail to save 😭😭"));
        }
      }, 2000);
    });
  }


categoryMap (){
  const map1 = new Map()
  const set1 = new Set(this.products)
  this.products.forEach(e=>{
    map1.set(e.id,e.category)
  })
const uniqueSuppliers ={}
set1.set(uniqueSuppliers)
return set1
}

  addSupplier(productId, supplier) {
   
    this.uniqueSuppliers.add(supplier);

    
    if (!this.supplierMap.has(productId)) {
      this.supplierMap.set(productId, new Set());
    }
    this.supplierMap.get(productId).add(supplier);
  }





}



