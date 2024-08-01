import { HeaderPage } from "@components/HeaderPage/Index";
import { styles } from "./style";
import { Text, View, TouchableOpacity, SafeAreaView, Image } from "react-native";
import { PerfilResume } from "@components/PerfilResume";
import { useNavigation, useRoute } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { LocationObject } from "expo-location";
import { useContext, useState, useEffect } from "react";
import { Context } from "src/context";
import { getStation } from 'src/services/StatiosService';

// Interface para coordenadas
interface PropsCoords {
  latitude: number;
  longitude: number;
  description: string;
}

// Interface para estação
interface StationDetails {
  serviceName: string;
  serviceUrl: string;
  id: number;
  latitude: number;
  longitude: number;
  capacity: number;
  availableBikes: number;
  availableDocks: number;
  deliveryBonus: number;
}

// Dados iniciais de coordenadas
const initialProps: PropsCoords = {
  latitude: -8.8408064,
  longitude: 13.2349952,
  description: ''
};

export function Station() {
  const context = useContext(Context);
  const route = useRoute();
  const { stationName } = route.params as { stationName: string };

  const [station, setStation] = useState<StationDetails | null>(null);
  const [origin, setOrigin] = useState<PropsCoords>(initialProps);
  const [location, setLocation] = useState<LocationObject | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch station details from backend
    const fetchStationDetails = async () => {
      try {
        const stationData = await getStation(stationName);
        setStation(stationData);
        setOrigin({
          latitude: stationData.latitude,
          longitude: stationData.longitude,
          description: stationData.serviceName
        });
      } catch (error) {
        console.error('Error fetching station details:', error);
      }
    };

    fetchStationDetails();
  }, [stationName]);

  useEffect(() => {
    // Configure a origem com base na localização atual se disponível
    // Caso contrário, mantenha as coordenadas iniciais
    if (location) {
      setOrigin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        description: 'Current Location'
      });
    }
  }, [location]);

  if (!station) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        mapType="mutedStandard"
        initialRegion={{
          latitude: station.latitude,
          longitude: station.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        zoomControlEnabled
        minZoomLevel={5}
        maxZoomLevel={15}
        scrollEnabled
      >
        <Marker
          coordinate={origin}
          title="Ponto A"
          description={origin.description}
          identifier="origin"
        >
          <Image style={styles.avatar} source={require('@assets/avatar.png')} />
        </Marker>

        <Marker
          coordinate={{
            latitude: station.latitude,
            longitude: station.longitude
          }}
          title="Ponto final"
          description={station.serviceName}
          identifier="destination"
        >
          <Image style={styles.avatar} source={require('@assets/avatar.png')} />
        </Marker>
      </MapView>

      <View style={styles.contentStation}>
        <Text style={styles.title}>{station.serviceName}</Text>
        <Text style={styles.detailText}>Latitude: {station.latitude}</Text>
        <Text style={styles.detailText}>Longitude: {station.longitude}</Text>
        <Text style={styles.detailText}>Capacidade: {station.capacity}</Text>
        <Text style={styles.detailText}>Bikes Disponíveis: {station.availableBikes}</Text>
        <Text style={styles.detailText}>Docks Disponíveis: {station.availableDocks}</Text>
        <Text style={styles.detailText}>Bônus de Entrega: {station.deliveryBonus}</Text>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('conectedWithBike')}>
          <Text style={styles.btnText}>Levantar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
