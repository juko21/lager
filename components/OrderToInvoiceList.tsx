// Invoices.tsx

import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import config from "../config/config.json";
import { Typography } from '../styles/index.js';
import orderModel from "../models/orders.ts";
import invoiceModel from "../models/invoices.ts";

export default function OrderToInvoiceList( {route, navigation} ) {
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

    async function invoiceOrder(order) {
        await invoiceModel.createInvoice(order);
        navigation.navigate("Fakturor", { reload: true });
    }
    useEffect(() => {
        reloadOrders();
    }, []);

    const listOfInvoices = allOrders
        .filter(order => order.status_id === 200)
        .map((order, index) => {
            return <Button
                title={ "Order " + order.id + ": " + order.name}
                key={index}
                onPress={() => {
                    invoiceOrder(order)
                }}
            />
        });

    return (
        <View>
            <Text style={ Typography.orderListHeader }>Fakturor:</Text>
            {listOfInvoices}
        </View>
    );
}