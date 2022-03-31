// components/Stock.tsx
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import config from "../config/config.json";

function StockList() {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      fetch(`${config.base_url}/products?api_key=${config.api_key}`)
        .then(response => response.json())
        .then(result => setProducts(result.data));
    }, []);
  
    const list = products.map((product, index) => <Text style={styles.invlist} key={index}>Namn: { product.name }{'\n'}Lagersaldo: { product.stock }</Text>);
  
    return (
      <View>
        {list}
      </View>
    );
}
  
export default function Stock() {
return (
    <View>
    <Text style={{color: '#333', fontSize: 24}}>Lagerförteckning</Text>
    <StockList/>
    </View>
);
}

  
const styles = StyleSheet.create({
invlist: {
    flex: 1,
    fontSize: "18px",
    lineHeight: "36px"

}
});