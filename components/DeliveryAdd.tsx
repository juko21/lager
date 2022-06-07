// components/DeliveryForm.tsx
import { useState } from 'react';
import { ScrollView } from "react-native";
import { showMessage } from "react-native-flash-message";
import DeliveryForm from './DeliveryForm.tsx';

export default function DeliveryAdd({ route, navigation, products, setProducts }) {

    const [delivery, setDelivery] = useState();
    const [currentProduct, setCurrentProduct] = useState();

    async function addDelivery() {
        if (delivery.comment && delivery.delivery_date && delivery.product_id && delivery.amount) {

            if (typeof(delivery.amount) === "number") {
                await deliveryModel.addDelivery(delivery);
        
                const updatedProduct = {
                    ...currentProduct,
                    stock: (currentProduct.stock || 0) + (delivery.amount || 0)
                };
                await productModel.updateProduct(updatedProduct);
                setProducts(await productModel.getProducts())
                showMessage({
                    message: "Inleverans registrerad",
                    description: "Inleveransen har registrerats",
                    type: "success",
                });
                navigation.navigate("List", { reload: true });
            } else {
                showMessage({
                    message: "Felaktigt värde",
                    description: "Antal måste vara ett nummer",
                    type: "success",
                });
            }
        } else {
            showMessage({
                message: "Värde saknas",
                description: "Vänligen fyll i alla uppgifter",
                type: "success",
            });
        }
    }

    return (
        <ScrollView>
            <DeliveryForm
                delivery={delivery}
                setDelivery={setDelivery}
                currentProduct={currentProduct}
                setCurrentProduct={setCurrentProduct}
                addDelivery={addDelivery}
            />
        </ScrollView>
    );
};
