import { useState, useEffect } from 'react';import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';

import AppLoading from 'expo-app-loading';
import { useFonts, Lato_300Light, Lato_300Light_Italic, Lato_400Regular, Lato_400Regular_Italic, Lato_700Bold, Lato_700Bold_Italic } from '@expo-google-fonts/lato';
import Home from "./components/Home.tsx";
import Pick from "./components/Pick.tsx";
import Ship from "./components/Ship.tsx";
import Deliveries from "./components/Deliveries.tsx";
import Auth from "./components/auth/Auth.tsx";
import Logout from "./components/auth/Logout.tsx";

import Invoices from "./components/Invoices.tsx";
import authModel from './models/auth.ts';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Base } from './styles/index.js';

const Tab = createBottomTabNavigator();
const routeIcons = {
    "Lager": "home",
    "Plock": "list",
    "Skeppning": "cube-outline",
    "Inleverans": "airplane",
    "Faktura": "document-text-outline",
    "Logga in": "log-in-outline",
    "Logga ut": "log-out-outline"
};


export default function App() {
    const [products, setProducts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
    const [allOrders, setAllOrders] = useState([]);
    const [invoices, setInvoices] = useState([]);

    useEffect(async () => {
    setIsLoggedIn(await authModel.loggedIn());
    }, []);

    let [fontsLoaded] = useFonts({
        Lato_300Light,
        Lato_300Light_Italic,
        Lato_400Regular,
        Lato_400Regular_Italic,
        Lato_700Bold,
        Lato_700Bold_Italic
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <SafeAreaView style={Base.container}>
            <NavigationContainer>
                <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                let iconName = routeIcons[route.name] || "alert";

                return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'gray',
                headerShown: false
                })}
                >
                    <Tab.Screen name="Lager">
                        {() => <Home products={products} setProducts={setProducts} />}
                    </Tab.Screen>
                    <Tab.Screen name="Plock">
                        {() => <Pick products={products} setProducts={setProducts} allOrders={allOrders} setAllOrders={setAllOrders}/>}
                    </Tab.Screen>
                    <Tab.Screen name="Skeppning">
                        {() => <Ship products={products} setProducts={setProducts} allOrders={allOrders} setAllOrders={setAllOrders}/>}
                    </Tab.Screen>
                    <Tab.Screen name="Inleverans">
                        {() => <Deliveries products={products} setProducts={setProducts} />}
                    </Tab.Screen>
                    {isLoggedIn ?
                        <Tab.Screen name="Faktura">
                            {() => <Invoices
                                products={products}
                                allOrders={allOrders}
                                setAllOrders={setAllOrders}
                                invoices={invoices}
                                setInvoices={setInvoices}
                                />}
                        </Tab.Screen>
                        :
                        <Tab.Screen name="Logga in">
                            {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
                        </Tab.Screen>
                    }
                    {isLoggedIn &&
                        <Tab.Screen name="Logga ut">
                            {() => <Logout setIsLoggedIn={setIsLoggedIn} />}
                        </Tab.Screen>
                    }
                 </Tab.Navigator>
            </NavigationContainer>
            <StatusBar style="auto" />
            <FlashMessage position="top" />
        </SafeAreaView>
    );
}
