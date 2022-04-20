// components/Stock.tsx
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Base, Typography } from '../styles/index.js';
import productModel from "../models/products";

function StockList({products, setProducts}) {  
    useEffect(async () => {
        setProducts(await productModel.getProducts());
      }, []);

    const list = products.map((product, index) => {
    return <View key={index} style={Base.invlistContainer}>
        <View style={Base.invlist}><Text style={Typography.invText}>{ product.id }</Text></View>
        <View style={Base.invlist}><Text style={Typography.invText}>{ product.name }</Text></View>
        <View style={Base.invlist}><Text style={Typography.invText}>{ product.stock }</Text></View>    
    </View>});
  
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
  
export default function Stock( {products, setProducts} ) {
return (
    <View>
        <StockList products={products} setProducts={setProducts} />
    </View>
);
}   
