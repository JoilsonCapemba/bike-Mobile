import React, { useContext, useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Image } from "react-native";
import { styles } from "./style";
import { Context } from "src/context";
import { firestore } from 'src/services/firebaseConfig';
import { HeaderPage } from "@components/HeaderPage/Index";
import { PerfilResume } from "@components/PerfilResume";
import { getCurrentPositionAsync } from 'expo-location';

export function Chat() {
  const context = useContext(Context);
  const [messages, setMessages] = useState([]);
  const [sms, SetSms] = useState('');
  
  // Coordenadas do destinatário ajustadas para teste
  const recipient = {
    latitude: -8.996881790502405, // Ajuste para uma coordenada próxima
    longitude: 13.26801342332999  // Ajuste para uma coordenada próxima
  };

  useEffect(() => {
    const unsubscribe = firestore.collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const messagesData = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        setMessages(messagesData);
      });

    return () => unsubscribe();
  }, []);

  async function handleSendSMS() {
    try {
      const { coords } = await getCurrentPositionAsync();
      const userLocation = {
        latitude: coords.latitude,
        longitude: coords.longitude
      };

      const recipientLocation = {
        latitude: recipient.latitude,
        longitude: recipient.longitude
      };

      // Log coordenadas para debugging
      console.log('User Location:', userLocation);
      console.log('Recipient Location:', recipientLocation);

      const distance = calculateDistance(userLocation, recipientLocation);

      console.log('Calculated Distance:', distance);

      if (distance <= 50) { // Distância em metros
        await firestore.collection('messages').add({
          text: sms,
          createdAt: new Date(),
          user: context.user
        });
        SetSms('');
      } else {
        alert('Usuário não está próximo.');
      }
    } catch (error) {
      console.error('Erro ao obter localização:', error);
      alert('Erro ao obter localização.');
    }
  }

  function calculateDistance(loc1, loc2) {
    const toRad = value => value * Math.PI / 180;
    const R = 6371e3; // Raio da Terra em metros
    const φ1 = toRad(loc1.latitude);
    const φ2 = toRad(loc2.latitude);
    const Δφ = toRad(loc2.latitude - loc1.latitude);
    const Δλ = toRad(loc2.longitude - loc1.longitude);

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distância em metros
  }

  return (
    <View style={styles.container}>
      <HeaderPage />
      <PerfilResume />
      <Text style={styles.title}>Chat</Text>

      <View style={styles.containerMessages}>
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.smsContainer}>
              <Text style={styles.sms}>{item.text}</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.sendContainer}>
        <TextInput
          style={styles.inputForm}
          placeholder="Escreve aqui a mensagem"
          placeholderTextColor={'#9c9999'}
          onChangeText={sms => SetSms(sms)}
          value={sms}
        />
        <TouchableOpacity style={styles.btnSeach} onPress={handleSendSMS}>
          <Image source={require('src/assets/send-solid-24.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
