import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import config from "./../config/config.json";
import { Typography } from '../styles/index.js';
import orderModel from "../models/orders.ts";

export default function OrderList({ route, navigation }) {
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

    //useEffect(() => {
    //    fetch(`${config.base_url}/orders?api_key=${config.api_key}`)
    //      .then(response => response.json())
    //      .then(result => setAllOrders(result.data));
    //}, []);

    const listOfOrders = allOrders
        .filter(order => order.status === "Ny")
        .map((order, index) => {
            return <Button
                title={ order.name }
                key={index}
                onPress={() => {
                    navigation.navigate('Detaljer', {
                        order: order
                    });
                }}
            />
        });

    return (
        <View>
            <Text style={ Typography.orderListHeader }>Redo att plockas:</Text>
            {listOfOrders}
        </View>
    );
}