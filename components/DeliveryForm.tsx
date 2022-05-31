// components/DeliveryForm.tsx
import { useState, useEffect } from 'react';
import { Platform, ScrollView, Text, TextInput, Button, View } from "react-native";
import { Base, Typography, Forms } from '../styles';
import { Picker } from '@react-native-picker/picker';
import { showMessage } from "react-native-flash-message";

import DateTimePicker from '@react-native-community/datetimepicker';

import Delivery from '../interfaces/delivery';

import productModel from "../models/products";
import deliveryModel from "../models/delivery";


function DateDropDown(props) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <View>
            {Platform.OS === "android" && (
                <Button onPress={showDatePicker} title="Visa datumväljare" />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    onChange={(event, date) => {
                        setDropDownDate(date);

                        props.setDelivery({
                            ...props.delivery,
                            delivery_date: date.toLocaleDateString('se-SV'),
                        });

                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}

function ProductDropDown(props) {
    const [products, setProducts] = useState<Product[]>([]);
    let productsHash: any = {};

    useEffect(async () => {
        setProducts(await productModel.getProducts());
    }, []);

    const itemsList = products.map((prod, index) => {
        productsHash[prod.id] = prod;
        return <Picker.Item key={index} label={prod.name} value={prod.id} />;
    });

    return (
        <View style={{...Forms.dropdown}}>
            <Picker
                selectedValue={props.delivery?.product_id}
                onValueChange={(itemValue) => {
                    props.setDelivery({ ...props.delivery, product_id: itemValue });
                    props.setCurrentProduct(productsHash[itemValue]);
                }}>
                {itemsList}
            </Picker>
        </View>
    );
}

export default function DeliveryForm({ route, navigation, setProducts }) {
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

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
        });        }

    }

    return (
        <ScrollView>
            <Text style={{ ...Typography.label }}>Kommentar</Text>
            <TextInput
                style={{ ...Forms.input }}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, comment: content })
                }}
                value={delivery?.comment}
            />
            <DateDropDown
                delivery={delivery}
                setDelivery={setDelivery}
            />
            <Text style={{ ...Typography.label }}>Produkt</Text>
            <ProductDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                setCurrentProduct={setCurrentProduct}
            />
            <Text style={{ ...Typography.label }}>Antal</Text>
            <TextInput
                style={{ ...Forms.input }}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, amount: parseInt(content) })
                }}
                value={delivery?.amount?.toString()}
                keyboardType="numeric"
            />
            <Button
                title="Gör inleverans"
                onPress={() => {
                    addDelivery();
                }}
            />
        </ScrollView>
    );
};
