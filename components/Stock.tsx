// components/Stock.tsx
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import config from "../config/config.json";
import { Base, Typography } from '../styles/index.js';

function StockList() {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
        fetch(`${config.base_url}/products?api_key=${config.api_key}`)
            .then(response => response.json())
            .then(result => setProducts(result.data));
    }, []);
  
    const list = products.map((product, index) => 
    <View key={index} style={Base.invlistContainer}>
        <View style={Base.invlist}><Text style={Typography.invText}>{ product.id }</Text></View>
        <View style={Base.invlist}><Text style={Typography.invText}>{ product.name }</Text></View>
        <View style={Base.invlist}><Text style={Typography.invText}>{ product.stock }</Text></View>    
    </View>);
  
    return (
        <View>
            <View style={Base.invlistContainer}>
                <View style={Typography.invHeader}><Text style={Typography.invText}>Id</Text></View>
                <View style={Typography.invHeader}><Text style={Typography.invText}>Produkt</Text></View>
                <View style={Typography.invHeader}><Text style={Typography.invText}>Lagersaldo</Text></View>    
            </View>
            {list}
        </View>
    );
}
  
export default function Stock() {
return (
    <View>
    <StockList/>
    </View>
);
}   
