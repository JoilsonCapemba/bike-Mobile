import { HeaderPage } from "@components/HeaderPage/Index";
import { styles } from "./style";
import { Text, View, TouchableOpacity, SafeAreaView, StatusBar, Image } from "react-native";
import { PerfilResume } from "@components/PerfilResume";
import { StationResume } from "@components/StationResume";
import { NumberBikes } from "@components/NumberBikes";
import { useNavigation, useRoute } from "@react-navigation/native";
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker } from "react-native-maps";
import { LocationObject } from "expo-location";
import { useState } from "react";

interface propsCoords {
    latitude: number,
    longitude: number,
    description: string
}

const initialProps = {
    latitude : -8.8408064,
    longitude: 13.2349952,
    description: ''
}

const finalProps = {
    latitude : -8.9355051,
    longitude: 13.2678549,
    description: ''
}

export function Station(){

    const [origin, setOrigin] = useState<propsCoords>(initialProps);
    const [destination, setDestination] = useState<propsCoords>(finalProps);
    const GOOGLE_MAPS_APIKEY = 'AIzaSyDAkhxgB_X0mvhcBPVZDXsnslh34uO4dv0';
    const [location, setLocation] = useState<LocationObject | null>(null)
    const navigation = useNavigation()

    return(
        <SafeAreaView style={styles.container}>
            <MapView style={styles.map}
                mapType="mutedStandard"
                initialRegion={{
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                    }}
                zoomControlEnabled
                minZoomLevel={5}
                maxZoomLevel={15}
                scrollEnabled
            >
                {/*
                
                <MapViewDirections
                   origin={origin}
                    destination={destination}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={6}
                    strokeColor="#B4ACF9"
                />
                */}
            

                
                <Marker 
                    coordinate={origin}
                    title="Ponto A"
                    description={origin.description}
                    identifier="origin"
                >
                    <Image style={styles.avatar}  source={require('@assets/avatar.png') }/>
                </Marker>

                <Marker 
                    coordinate={destination}
                    title="Ponto final"
                    description={destination.description}
                    identifier="origin"
                >
                    <Image style={styles.avatar} source={require('@assets/avatar.png')}/>
                </Marker>

            </MapView>

        
            <View style={styles.contentStation}>
                <Text style={styles.title}>Statio Name</Text>
                <StationResume stationName="estado"/>
                <NumberBikes totalBike={5}/>
                <TouchableOpacity style={styles.btn} onPress={()=> navigation.navigate('conectedWithBike')}>
                    <Text style={styles.btnText}>Levantar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}