import { View, Text, Button, ColorPropType } from "react-native";
import orderModel from "../models/orders.ts";
import { Base, Typography } from '../styles/index.js';
import productModel from "../models/products";
import { useState, useEffect } from 'react';

export default function SelectedInvoice({ route }) {
    const { invoice } = route.params;

    return (
        <View style={Base.base}>
            <Text style={ Typography.orderList }><Text style={ Typography.bold }>Id: </Text>{invoice.id}</Text>
            <Text style={ Typography.orderList }><Text style={ Typography.bold }>OrderId: </Text>{invoice.order_id}</Text>
            <Text style={ Typography.orderList }><Text style={ Typography.bold }>Summa: </Text>{invoice.order_id}</Text>
            <Text style={ Typography.orderList }><Text style={ Typography.bold }>Skapad: </Text>{invoice.creation_date}</Text>
            <Text style={ Typography.orderList }><Text style={ Typography.bold }>Betalas senast: </Text>{invoice.due_date}</Text>
        </View>
    )
};
