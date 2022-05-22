import { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from "react-native";
import config from "./../config/config.json";
import { Typography } from '../styles/index.js';
import orderModel from "../models/orders.ts";

export default function InvoicesList({ route, navigation }) {
    const { reload } = route.params || false;
    const [allOrders, setAllOrders] = useState([]);

    if (reload) {
        reloadOrders();
    }

    async function reloadOrders() {
        const result = await orderModel.getOrders();
        setAllOrders(result);
    }

    useEffect(() => {
        reloadOrders();
    }, []);

    const listOfOrders = allOrders
        .filter(order => order.status_id === 200)
        .map((order, index) => {
            return <Button
                title={ order.name }
                key={index}
                onPress={() => {
                    navigation.navigate('Skeppa order', {
                        order: order
                    });
                }}
            />
        });

    return (
        <ScrollView>
            <Text style={Typography.header}>ORDERLISTA</Text>
            <View>
                <Text style={ Typography.orderListHeader }>Redo att Skeppas:</Text>
                {listOfOrders}
            </View>
        </ScrollView>
    );
}