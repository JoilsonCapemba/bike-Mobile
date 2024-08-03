import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LocationObject } from 'expo-location';
import { Context } from 'src/context';
import { levantarBicicleta, getStation } from 'src/services/StatiosService'; // Certifique-se de importar a função correta
import { styles } from './style';

// Interface para coordenadas
interface PropsCoords {
  latitude: number;
  longitude: string;
  description: string;
}

// Interface para detalhes da estação
interface StationDetails {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  capacity: number;
  availableBikes: number;
  availableDocks: number;
  deliveryBonus: number;
}

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
    // Buscar detalhes da estação do backend
    const fetchStationDetails = async () => {
      try {
        const stationData = await getStation(stationName); // Função corretamente importada e utilizada
        setStation(stationData);
        setOrigin({
          latitude: stationData.latitude,
          longitude: stationData.longitude,
          description: stationData.name
        });
      } catch (error) {
        console.error('Erro ao buscar detalhes da estação:', error);
      }
    };

    fetchStationDetails();
  }, [stationName]);

  useEffect(() => {
    // Configurar a origem com base na localização atual se disponível
    if (location) {
      setOrigin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        description: 'Localização Atual'
      });
    }
  }, [location]);

  const handleLevantarBicicleta = async () => {
    try {
      const selectedDockId = 1; // Exemplo de como definir o selectedDockId
      const sucesso = await levantarBicicleta(station.id, selectedDockId); // Certifique-se de que selectedDockId está definido corretamente
      if (sucesso) {
        console.log('Bicicleta levantada com sucesso');
        Alert.alert('Bicicleta levantada com sucesso');
        navigation.navigate('conectedWithBike');
        // Atualize a UI ou estado conforme necessário
      } else {
        console.log('Falha ao levantar bicicleta');
        Alert.alert('Falha ao levantar bicicleta');
      }
    } catch (error) {
      console.error('Erro ao levantar bicicleta:', error);
    }
  };

  if (!station) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Carregando...</Text>
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
          description={station.name}
          identifier="destination"
        >
          <Image style={styles.avatar} source={require('@assets/avatar.png')} />
        </Marker>
      </MapView>

      <View style={styles.contentStation}>
        <Text style={styles.title}>{station.name}</Text>
        <Text style={styles.detailText}>Latitude: {station.latitude}</Text>
        <Text style={styles.detailText}>Longitude: {station.longitude}</Text>
        <Text style={styles.detailText}>Capacidade: {station.capacity}</Text>
        <Text style={styles.detailText}>Bikes Disponíveis: {station.availableBikes}</Text>
        <Text style={styles.detailText}>Docks Disponíveis: {station.availableDocks}</Text>
        <Text style={styles.detailText}>Bônus de Entrega: {station.deliveryBonus}</Text>
        <TouchableOpacity style={styles.btn} onPress={handleLevantarBicicleta}>
          <Text style={styles.btnText}>Levantar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
