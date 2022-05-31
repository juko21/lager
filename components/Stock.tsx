// components/Stock.tsx
import { Text, View, Image } from 'react-native';
import { Base, Typography } from '../styles/index.js';
import warehouse from '../assets/warehouse.jpg';
import StockList from './StockList.tsx';

export default function Stock( {products, setProducts} ) {
    return (
        <View>
            <Text style={Typography.header}>LAGERFÖRTECKNING</Text>
            <Image source={warehouse} style={ Base.whImage } />
            <StockList products={products} setProducts={setProducts} />
        </View> 
    );
}   
