class Product {
    constructor(id, name, price, category, stock) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.stock = stock;
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


