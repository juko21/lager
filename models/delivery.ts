import config from "../config/config.json";
import Delivery from "../interfaces/delivery.ts";

const delivery = {
    getDeliveries: async function getDeliveries() {
        const response = await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}   `);
        const result = await response.json();

        return result.data;
    },
    addDelivery: async function addDelivery(Delivery: Partial<Delivery>) {
        const deliveryBody = {
            ...Delivery,
            api_key: config.api_key
        };
        const response = fetch(`${config.base_url}/deliveries`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(deliveryBody),
          })
        console.log(response.status);
    },
};

export default delivery;