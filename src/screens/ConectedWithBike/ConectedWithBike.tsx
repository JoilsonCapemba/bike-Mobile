import { View , Text , Image, TouchableOpacity} from "react-native";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";
import {requestForegroundPermissionsAsync,
        getCurrentPositionAsync,
        LocationObject,
        watchPositionAsync,
        LocationAccuracy,
} from 'expo-location'

import MapView, { Marker } from "react-native-maps";
import { useEffect, useState, useRef } from "react";
import { HeaderPage } from "@components/HeaderPage/Index";
import { PerfilResume } from "@components/PerfilResume";

export function ConectedWithBike(){
  const navigation = useNavigation()
  const [location, setLocation] = useState<LocationObject | null>(null)
  const MapRef = useRef<MapView>(null)

  async function reqLocationPermi(){
    const {granted} = await requestForegroundPermissionsAsync()

    if(granted){
        const currentPosition = await getCurrentPositionAsync()
        setLocation(currentPosition)

        console.log("Localizacao", currentPosition)

    }
  }

  useEffect(() =>{
    reqLocationPermi()
  }, [])

  useEffect(()=>{
    watchPositionAsync({
      accuracy: LocationAccuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 1
    }, (response)=>{
      setLocation(response)
      MapRef.current?.animateCamera({
        pitch: 70,
        center: response.coords
      })
    })
  }, [])

  return(
    <View style={styles.container}>
      <View style={styles.content}>
        <HeaderPage />
        <PerfilResume/>
        <View style={styles.contentMenu}>
          <View >
            <TouchableOpacity onPress={()=> navigation.navigate('sendPoints')}>
              <Image source={require('@assets/chat-solid-24.png')} style={styles.imgLog}/>
              <Text style={styles.logoTitle}>share Point</Text>
            </TouchableOpacity>
          </View>
          <View >
            <TouchableOpacity onPress={()=> navigation.navigate('chat')}>
              <Image source={require('@assets/chat-solid-24.png')} style={styles.imgLog}/>
              <Text style={styles.logoTitle}>Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {
        location &&
      <MapView

      initialRegion={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,  
        longitudeDelta: 0.005 
      }
      }  
      ref={MapRef}
      style={styles.map}>
        <Marker 
            coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            }}
        />
            
      </MapView>
    }
    </View>
  )
}