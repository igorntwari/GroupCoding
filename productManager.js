
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
            throw new Error ("stock have always to be positive")
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
            elm.id === id ? {...elm, ...updates } : elm
        );
    }

    getProductSummary() {
        return this.products.map(({ name, _price, category }) => ({
            name,
            _price,
            category
        }));
    }
   
    async bulkUpdate(updates){
        try{
        for(let update of updates){
            await this.updateProduct(update.id,update.data)
        }
        return "Bulk updated ";
        }

        catch(error){
         
              console.error("Error in bulkUpdate:", error.message);
              throw error;
        }
        
    }


      async generateReport() {
    try {
      const totalProducts = await this.getTotalProducts();
      const totalStock = await this.getTotalStock();
      const categories = await this.getCategories();

      return {
        totalProducts,
        totalStock,
        categories,
      };

    
    } catch (error) {
      console.error("Error in generateReport:", error.message);
      throw error;
    } 
  }

   async getTotalProducts() {
    return this.products.length;
  }

  async getTotalStock() {
    return this.products.reduce((sum, p) => sum + p.stock, 0);
  }

  async getCategories() {
    return [...new Set(this.products.map((p) => p.category))];
  }
}

