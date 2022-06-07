import { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from "react-native";
import config from "./../config/config.json";
import { Typography } from '../styles/index.js';
import orderModel from "../models/orders.ts";

export default function OrderList({ route, navigation, allOrders, setAllOrders }) {
    console.log(route);
    const reload = route.params || false;

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
        .filter(order => order.status_id === 100)
        .map((order, index) => {
            return <Button
                title={ order.name }
                key={index}
                onPress={() => {
                    navigation.navigate('Plocka order', {
                        order: order
                    });
                }}
            />
        });

    return (
        <ScrollView>
            <View>
                <Text style={ Typography.orderListHeader }>Redo att plockas:</Text>
                {listOfOrders}
            </View>
        </ScrollView>
    );
}