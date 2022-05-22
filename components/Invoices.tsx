import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { Base, Typography } from '../styles/index.js';

import InvoiceList from './InvoiceList.tsx';
import OrderToInvoiceList from './OrderToInvoiceList.tsx';

const Stack = createNativeStackNavigator();

export default function Invoices(props) {
    return (
        <View style={Base.base}>
            <Text style={Typography.header}>FAKTUROR</Text>
            <Stack.Navigator initialRouteName="Fakturor">
                <Stack.Screen name="Fakturor" options={{headerShown: false}} component={InvoiceList} />
                <Stack.Screen name="Skapa ny faktura">
                    {(screenProps) => <OrderToInvoiceList {...screenProps} />}
                </Stack.Screen>
            </Stack.Navigator>
        </View>
    );
}