// del av components/DeliveriesList.tsx

import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import { Base, Typography } from '../styles/index.js';
import deliveryModel from "../models/delivery.ts";

export default function DeliveriesList({ route, navigation }) {
    const { reload } = route.params || false;
    const [allDeliveries, setAllDeliveries] = useState([]);
    
    if (reload) {
        reloadDeliveries();
    }

    async function reloadDeliveries() {
        const result = await deliveryModel.getDeliveries();
        setAllDeliveries(result);
    }

    useEffect(() => {
        reloadDeliveries();
    }, []);
    
    const listOfDeliveries = allDeliveries.map((delivery, index) => {
    return <View key={index} style={Base.invlistContainer}>
        
        <View style={Base.invlist}><Text style={Typography.invText}>{ delivery.id }</Text></View>
        <View style={Base.invlist}><Text style={Typography.invText}>{ delivery.product_name }</Text></View>
        <View style={Base.invlist}><Text style={Typography.invText}>{ delivery.amount }</Text></View>    
    </View>});
    let noDeliveries = "";
    if (listOfDeliveries === undefined || listOfDeliveries.length == 0) {
        noDeliveries = "Inga inleveranser funna.";
    }
    return (
    <View>
        <View style={Base.invlistContainer}>
            <View style={Typography.invHeader}><Text style={Typography.invText}>Id</Text></View>
            <View style={Typography.invHeader}><Text style={Typography.invText}>Produkt</Text></View>
            <View style={Typography.invHeader}><Text style={Typography.invText}>Antal</Text></View>    
        </View>
        {listOfDeliveries}
        <Text>{noDeliveries}</Text>
        <Button
            title="Skapa ny inleverans"
            onPress={() => {
                navigation.navigate('Ny inleverans');
            }}
        />
    </View>
    );
}
