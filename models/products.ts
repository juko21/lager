import config from "../config/config.json";
import Product from "../interfaces/product.ts";

const products = {
    getProducts: async function getProducts() {
        const response = await fetch(`${config.base_url}/products?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
    updateProduct: async function updateProduct(Product: Partial<Product>) {
        const productBody = {
            ...Product,
            api_key: config.api_key
        };
        const response = fetch(`${config.base_url}/products`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productBody),
          })
        console.log(response.status);
    },
};

export default products;