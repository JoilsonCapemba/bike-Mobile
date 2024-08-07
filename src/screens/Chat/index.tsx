import React, { useContext, useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";
import { Context } from "src/context";
import { firestore } from 'src/services/firebaseConfig';
import { HeaderPage } from "@components/HeaderPage/Index";
import { PerfilResume } from "@components/PerfilResume";
import * as Location from 'expo-location';
import { format } from 'date-fns';

export function Chat() {
  const navigation = useNavigation();
  const context = useContext(Context);
  const [messages, setMessages] = useState([]);
  const [sms, SetSms] = useState('');

  const recipient = {
    latitude: -8.996881790502405,
    longitude: 13.26801342332999
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Permissão de localização é necessária para enviar mensagens.');
        return;
      }
    })();

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
      const { coords } = await Location.getCurrentPositionAsync();
      const userLocation = {
        latitude: coords.latitude,
        longitude: coords.longitude
      };

      const recipientLocation = {
        latitude: recipient.latitude,
        longitude: recipient.longitude
      };

      const distance = calculateDistance(userLocation, recipientLocation);

      if (distance <= 50) {
        await firestore.collection('messages').add({
          text: sms,
          createdAt: new Date(),
          user: context.user
        });
        SetSms('');
      } else {
        Alert.alert('Usuário não está próximo.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao obter a localização.');
    }
  }

  function calculateDistance(loc1, loc2) {
    const toRad = value => value * Math.PI / 180;
    const R = 6371e3;
    const φ1 = toRad(loc1.latitude);
    const φ2 = toRad(loc2.latitude);
    const Δφ = toRad(loc2.latitude - loc1.latitude);
    const Δλ = toRad(loc2.longitude - loc1.longitude);

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <HeaderPage />
        <PerfilResume />
        <Text style={styles.title}>Chat</Text>

        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={[styles.smsContainer, item.user === context.user ? styles.userMessage : styles.otherMessage]}>
              <Text style={styles.user}>{item.user}:</Text>
              <Text style={styles.sms}>{item.text}</Text>
              <Text style={styles.data}>{format(new Date(item.createdAt.seconds * 1000), 'PPpp')}</Text>
            </View>
          )}
          inverted
          contentContainerStyle={{ justifyContent: 'flex-end' }}
        />

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.sendContainer}>
            <TextInput
              style={styles.inputForm}
              placeholder="Escreve aqui a mensagem"
              placeholderTextColor={'#9c9999'}
              onChangeText={SetSms}
              value={sms}
              onBlur={Keyboard.dismiss}
            />
            <TouchableOpacity style={styles.btnSeach} onPress={handleSendSMS}>
              <Image source={require('src/assets/send-solid-24.png')} />
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </KeyboardAvoidingView>
  );
}
