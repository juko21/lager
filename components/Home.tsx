// Pick.tsx
import { View, ScrollView } from 'react-native';
import Stock from './Stock.tsx';
import { Base } from '../styles/index.js';

export default function Home({products, setProducts}) {
    return (
        <ScrollView>
            <View style={Base.base}>
                <Stock products={products} setProducts={setProducts} />
            </View>
        </ScrollView>
    );
}
