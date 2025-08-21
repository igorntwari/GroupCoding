class Product {
    constructor(id, name, price, category, stock) {
        this.name = name;
        this.id = id;
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


}


