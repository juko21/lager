import config from "../config/config.json";
import Order from "../interfaces/order.ts";
import storage from "./storage.ts";

const invoices = {
    getInvoices: async function getInvoices() {
        const token = await storage.readToken();

        const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`,{
        method: 'GET',
        headers: {
            'x-access-token': token.token
        }});
        const result = await response.json();

        return result.data;
    },
    createInvoice: async function createInvoice(order: Partial<Order>) {
        let sum = 0;
        let today = new Date();
        let dueDate = new Date();
        dueDate.setDate(today.getDate() + 31);
        const token = await storage.readToken();
        console.log(order);
        for (const item of order.order_items) {
            sum += item.price * item.amount;
        }
        const invoiceBody = {
            api_key: config.api_key,
            order_id: order.id,
            total_price: sum,
            creation_date: today.toLocaleDateString("se-sv"),
            due_date: dueDate.toLocaleDateString("se-sv")
        };
        const response = fetch(`${config.base_url}/invoices`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token.token
            },
            body: JSON.stringify(invoiceBody),
          })
        console.log(response.status);

        const orderBody = {
            api_key: config.api_key,
            name: order.name,
            id: order.id,
            status_id: 600,
        };

        const response2 = fetch(`${config.base_url}/orders`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderBody),
        })
        console.log(response2.status);
    
    }
};

export default invoices;