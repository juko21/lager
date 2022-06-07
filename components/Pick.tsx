import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import OrderList from './OrderList.tsx';
import PickList from './PickList.tsx';
import ShipOrder from './ShipOrder.tsx';
import { Base, Typography } from '../styles/index.js';

const Stack = createNativeStackNavigator();

export default function Pick(props) {
    return (
        <View style={Base.base}>
            <Text style={Typography.header}>ORDERLISTA</Text>
            <Stack.Navigator initialRouteName="List">
                <Stack.Screen name="List" options={{headerShown: false}}>
                {(screenProps) => <OrderList
                    {...screenProps}
                    allOrders={props.allOrders}
                    setAllOrders={props.setAllOrders}
                />}
                </Stack.Screen>
                <Stack.Screen name="Plocka order">
                    {(screenProps) => <PickList {...screenProps} setProducts={props.setProducts} />}
                </Stack.Screen>
                <Stack.Screen name="Skeppa order">
                    {(screenProps) => <ShipOrder {...screenProps} setProducts={props.setProducts} />}
                </Stack.Screen>
            </Stack.Navigator>
        </View>
    );
}
