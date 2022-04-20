import { View, Text, Button, ColorPropType } from "react-native";
import orderModel from "../models/orders.ts";
import { Base, Typography } from '../styles/index.js';
import productModel from "../models/products";
import { useState, useEffect } from 'react';

export default function PickList({ route, navigation, setProducts }) {
    const { order } = route.params;
    const [productsList, setProductsList] = useState([]);

    useEffect(async () => {
        setProductsList(await productModel.getProducts());
    }, []);

    async function pack() {
        await orderModel.packOrder(order);
        setProducts(await productModel.getProducts());
        navigation.navigate("List", { reload: true });
    }

    let packagable : boolean = true;
    const orderItemsList = order.order_items.map((item, index) => {
        packagable = (item.amount > item.stock ) ? false : packagable;
        return <View key={index} style={Base.invlistContainer}>
                    <View style={Base.invlist}><Text style={Typography.invText}>{ item.name }</Text></View>
                    <View style={Base.invlist}><Text style={Typography.invText}>{ item.amount }</Text></View>
                <View style={Base.invlist}><Text style={Typography.invText}>{ item.location }</Text></View>    
    </View>;
    });

    return (
        <View style={Base.base}>
            <Text style={ Typography.orderList }><Text style={ Typography.bold }>Namn: </Text>{order.name}</Text>
            <Text style={ Typography.orderList }><Text style={ Typography.bold }>Adress: </Text>{order.address}</Text>
            <Text style={ Typography.orderList }><Text style={ Typography.bold }>Plats: </Text>{order.zip} {order.city}</Text>
            <Text style={ Typography.orderList }><Text style={ Typography.bold }>Produkter: </Text></Text>
            <View style={Base.invlistContainer}>
                <View style={Typography.invHeader}><Text style={Typography.invText}>Namn</Text></View>
                <View style={Typography.invHeader}><Text style={Typography.invText}>Antal</Text></View>
                <View style={Typography.invHeader}><Text style={Typography.invText}>Lagerplats</Text></View>    
            </View>
            {orderItemsList}

            <Button title={ packagable ? 'Packa order' : 'Otillräckligt lagersaldo' } disabled={ packagable ? false : true } onPress={pack} />
        </View>
    )
};