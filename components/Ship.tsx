import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import ShipOrderList from './ShipOrderList.tsx';
import ShipOrder from './ShipOrder.tsx';
import { Base, Typography } from '../styles/index.js';

const Stack = createNativeStackNavigator();

export default function Pick(props) {
    return (
        <View style={Base.base}>
            <Stack.Navigator initialRouteName="ShippingList" ScreenOptions={{headerShown: false}}>
                <Stack.Screen name="ShippingList" options={{headerShown: false}}>
                    {(screenProps) => 
                    <ShipOrderList
                    {...screenProps}
                        allOrders={props.allOrders}
                        setAllOrders={props.setAllOrders}
                        setProducts={props.setProducts}
                    />}
                </Stack.Screen>
                <Stack.Screen name="Skeppa order" screenOptions={{headerShown: false}}>
                    {(screenProps) => <ShipOrder {...screenProps} setProducts={props.setProducts}/>}
                </Stack.Screen>
            </Stack.Navigator>
        </View>
    );
}
