import { Inter_500Medium } from "@expo-google-fonts/inter";
import config from "../config/config.json";
import Order from "../interfaces/order.ts";
const orders = {
    getOrders: async function getOrders() {
        const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
    packOrder: async function Pack(order: Partial<Order>) {
        const orderBody = {
            api_key: config.api_key,
            name: order.name,
            id: order.id,
            status_id: 200,
        };
        console.log(orderBody);
        const response = fetch(`${config.base_url}/orders`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderBody),
          })
        console.log(response.status);

        for (item of order.order_items) {
            const prodBody = {
                api_key: config.api_key,
                name: item.name,
                id: item.product_id,
                stock: item.stock - item.amount,
            };
            const response2 = fetch(`${config.base_url}/products`, {
                method: 'PUT',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(prodBody),
            })
            console.log(response2.status);
        }
    }
};

export default orders;