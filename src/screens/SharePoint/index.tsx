import React, { useContext, useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Context } from "src/context";
import { styles } from "./style";
import { sendPointsService } from 'src/services/UserServices';
import { sendPhoneNumberViaAirDrop, receivePhoneNumberViaAirDrop } from 'src/services/AirDropService';

export function SendPoints() {
  const navigation = useNavigation();
  const context = useContext(Context);
  const [telefoneReceptor, setTelefoneReceptor] = useState('');
  const [saldo, setSaldo] = useState('');

  useEffect(() => {
    receivePhoneNumberViaAirDrop((phoneNumber) => {
      if (phoneNumber) {
        console.log('Received phone number via AirDrop:', phoneNumber);
        setTelefoneReceptor(phoneNumber.toString()); 
      } else {
        console.log('No phone number received via AirDrop');
      }
    });
  }, []);

  async function handleSendPoints() {
    try {
      console.log('Enviando pontos de:', context.telephone, 'para:', telefoneReceptor, 'quantidade:', saldo);
      const success = await sendPointsService(context.telephone, telefoneReceptor, parseInt(saldo));
      if (success) {
        Alert.alert('Sucesso', 'Pontos enviados com sucesso');
        navigation.navigate('menu');
      }
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  }

  function handleConnect() {
    sendPhoneNumberViaAirDrop(context.telephone)
      .then(() => {
        Alert.alert('Conectado', 'Número de telefone enviado via AirDrop');
      })
      .catch((error) => {
        Alert.alert('Erro', 'Falha ao enviar número de telefone');
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enviar Pontos</Text>
      
      <TextInput
        style={styles.inputForm}
        placeholder="Telefone do Receptor"
        placeholderTextColor={'#fff'}
        onChangeText={setTelefoneReceptor}
        value={telefoneReceptor}
        editable={false} // TextInput inativo
      />

      <TextInput
        style={styles.inputForm}
        placeholder="Quantidade de Pontos"
        placeholderTextColor={'#fff'}
        keyboardType="numeric"
        onChangeText={setSaldo}
        value={saldo}
      />

      <TouchableOpacity style={styles.btnSendPoints} onPress={handleSendPoints}>
        <Text style={styles.btnText}>Enviar Pontos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnSendPoints} onPress={handleConnect}>
        <Text style={styles.btnText}>Conectar via AirDrop</Text>
      </TouchableOpacity>
    </View>
  );
}
