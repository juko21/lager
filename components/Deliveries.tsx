// components/Deliveries.tsx

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Base, Typography } from '../styles/index.js';
import { View, Text } from "react-native";

import DeliveriesList from './DeliveriesList';
import DeliveryForm from './DeliveryForm';

const Stack = createNativeStackNavigator();

export default function Deliveries(props) {
    return (
        <View style={Base.base}>
            <Text style={Typography.header}>INLEVERANSER</Text>
            <Stack.Navigator initialRouteName="List">
                <Stack.Screen name="List" options={{headerShown: false}} component={DeliveriesList} />
                <Stack.Screen name="Ny inleverans">
                    {(screenProps) => <DeliveryForm {...screenProps} setProducts={props.setProducts} />}
                </Stack.Screen>
            </Stack.Navigator>
        </View>
    );
};
