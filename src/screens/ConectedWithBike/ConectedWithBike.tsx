import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject, watchPositionAsync, LocationAccuracy } from 'expo-location';
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState, useRef } from "react";
import { HeaderPage } from "@components/HeaderPage/Index";
import { PerfilResume } from "@components/PerfilResume";
import { entregarBicicleta } from 'src/services/StatiosService';

export function ConectedWithBike() {
  const navigation = useNavigation();
  const [location, setLocation] = useState<LocationObject | null>(null);
  const MapRef = useRef<MapView>(null);

  async function reqLocationPermi() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
      console.log("Localizacao", currentPosition);
    }
  }

  useEffect(() => {
    reqLocationPermi();
  }, []);

  useEffect(() => {
    watchPositionAsync({
      accuracy: LocationAccuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 1
    }, (response) => {
      setLocation(response);
      MapRef.current?.animateCamera({
        pitch: 70,
        center: response.coords
      });
    });
  }, []);

  const handleEntregarBicicleta = async () => {
    try {
      const stationId = 1; // Defina o ID da estação conforme necessário
      const dockId = 1; // Defina o ID do dock conforme necessário
      const sucesso = await entregarBicicleta(stationId, dockId);
      if (sucesso) {
        console.log('Bicicleta devolvida com sucesso');
        Alert.alert('Bicicleta devolvida com sucesso');
        navigation.navigate('stationsBike');
      } else {
        console.log('Falha ao devolver bicicleta');
        Alert.alert('Falha ao devolver bicicleta');
      }
    } catch (error) {
      console.error('Erro ao devolver bicicleta:', error);
    }
  };

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          }}
          ref={MapRef}
          style={styles.map}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          />
        </MapView>
      )}

      <TouchableOpacity style={styles.btn} onPress={handleEntregarBicicleta}>
        <Text style={styles.btnText}>Devolver</Text>
      </TouchableOpacity>
    </View>
  );
}
