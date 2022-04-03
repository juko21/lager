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
  
    const list = products.map((product, index) => 
    <View key={index} style={styles.invlistContainer}>
      <View style={styles.invlist}><Text style={styles.invText}>{ product.name }</Text></View>
      <View style={styles.invlist}><Text style={styles.invText}>{ product.stock }</Text></View>    
    </View>);
  
    return (
      <View>
        <View style={styles.invlistContainer}>
          <View style={styles.invHeader}><Text style={styles.invText}>Produkt</Text></View>
          <View style={styles.invHeader}><Text style={styles.invText}>Lagersaldo</Text></View>    
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

  
const styles = StyleSheet.create({
invlist: {
    flex: 1,
    padding: 10,
    marginBottom: 1,
    borderBottomColor: '#eee',
    borderBottomWidth: 1, 
},
invHeader: {
  flex: 1,
  backgroundColor: '#ddd',
  padding: 10,
  marginBottom: 1
},
invText: {
  fontSize: 18,
  fontFamily: 'Lato_400Regular',
  lineHeight: 32,
},
invlistContainer: {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-between',
},
});