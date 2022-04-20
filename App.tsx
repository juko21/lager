import { useState } from 'react';import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppLoading from 'expo-app-loading';
import { useFonts, Lato_300Light, Lato_300Light_Italic, Lato_400Regular, Lato_400Regular_Italic, Lato_700Bold, Lato_700Bold_Italic } from '@expo-google-fonts/lato';
import Home from "./components/Home.tsx";
import Pick from "./components/Pick.tsx";
import Deliveries from "./components/Deliveries.tsx";

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Base } from './styles/index.js';

const Tab = createBottomTabNavigator();
const routeIcons = {
    "Lager": "home",
    "Plock": "list",
    "Leverans": "airplane"
};

export default function App() {
    const [products, setProducts] = useState([]);

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
                        {() => <Pick products={products} setProducts={setProducts} />}
                    </Tab.Screen>
                    <Tab.Screen name="Leverans">
                        {() => <Deliveries products={products} setProducts={setProducts} />}
                    </Tab.Screen>
                </Tab.Navigator>
            </NavigationContainer>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}
