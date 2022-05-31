import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Base, Typography } from "../styles/index.js";
import { useState, useEffect, useRef } from 'react';

import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import getCoordinates from "../models/nominatim";
import * as Location from 'expo-location';

export default function ShipOrder({ route }) {
    const {order} = route.params;
    const [marker, setMarker] = useState(null);

    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const mapRef = useRef(null);

    function fitMarkers() {
        if (marker && locationMarker){
            setTimeout(() => {
                mapRef.current.fitToSuppliedMarkers(["mp", "lp"], 
                    {
                        edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
                        animated: true
                    }
                )
            }, 100)
        }
    }

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});
            setLocationMarker(<Marker
                identifier="mp"
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Min plats"
                pinColor="blue"
            />);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const results = await getCoordinates(`${order.address}, ${order.city}`);
            setMarker(<Marker
                identifier="lp"
                coordinate={{ 
                    latitude: parseFloat(results[0].lat), 
                    longitude: parseFloat(results[0].lon) }}
                title={results[0].display_name}
            />);
        })();
    }, []);


    
    const orderItemsList = order.order_items.map((item, index) => {
        return <View key={index} style={Base.invlistContainer}>
                    <View style={Base.invlist}><Text style={Typography.invText}>{ item.name }</Text></View>
                    <View style={Base.invlist}><Text style={Typography.invText}>{ item.amount }</Text></View>
                <View style={Base.invlist}><Text style={Typography.invText}>{ item.location }</Text></View>    
    </View>;
    });

    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>Skicka order</Text>
            <View style={styles.container}>
                <MapView
                    ref={mapRef}
                    key={ (marker ? "1" : "0") + (locationMarker ? "1" : "0") }
c                    onMapLoaded={ fitMarkers() }
                    initialRegion={{ 
                        latitude: 56.1612,
                        longitude: 15.5869,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}>
                    {marker}
                    {locationMarker}
                </MapView>
                <ScrollView>
                    <Text style={ Typography.orderList }><Text style={ Typography.bold }>Namn: </Text>{order.name}</Text>
                    <Text style={ Typography.orderList }><Text style={ Typography.bold }>Adress: </Text>{order.address}</Text>
                    <Text style={ Typography.orderList }><Text style={ Typography.bold }>Plats: </Text>{order.zip} {order.city}</Text>
                    <View style={styles.productlistContainer}>
                        <View style={Typography.invHeader}><Text style={Typography.bold}>Namn</Text></View>
                        <View style={Typography.invHeader}><Text style={Typography.bold}>Antal</Text></View>
                        <View style={Typography.invHeader}><Text style={Typography.bold}>Lagerplats</Text></View>    
                    </View>
                    {orderItemsList}
                </ScrollView>
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: "50%",
        marginBottom: 4
    },
    scrollContainer: {
        width: "100%",
        height: "50%",
        marginBottom: 4
    },
    productlistContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'baseline',
    },
});