import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import ShipOrderList from './ShipOrderList.tsx';
import ShipOrder from './ShipOrder.tsx';
import { Base, Typography } from '../styles/index.js';

const Stack = createNativeStackNavigator();

export default function Pick(props) {
    return (
        <View style={Base.base}>
            <Stack.Navigator initialRouteName="List">
                <Stack.Screen name="List" options={{headerShown: false}} component={ShipOrderList} />
                <Stack.Screen name="Skeppa order">
                    {(screenProps) => <ShipOrder {...screenProps} setProducts={props.setProducts} />}
                </Stack.Screen>
            </Stack.Navigator>
        </View>
    );
}
