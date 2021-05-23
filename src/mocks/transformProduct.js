const products = require('./products.json');

const newProducts = products.map(product => ({
    ...product,
    price: {
        usd: product.price.substring(1)
    }
}));

console.log(JSON.stringify(newProducts, null, 2));