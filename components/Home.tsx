// Pick.tsx
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import warehouse from '../assets/warehouse.jpg';
import Stock from './Stock.tsx';
import { Base, Typography } from '../styles/index.js';

export default function Home({products, setProducts}) {
    return (
        <ScrollView>
            <View style={Base.base}>
                <Text style={Typography.header}>LAGERFÖRTECKNING</Text>
                <Image source={warehouse} style={ Base.whImage } />
                <Stock products={products} setProducts={setProducts} />
            </View>
        </ScrollView>
    );
}
