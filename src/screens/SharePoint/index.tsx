import React, { useContext, useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Context } from "src/context";
import { styles } from "./style";
import { sendPointsService } from 'src/services/UserServices';
import { sendPhoneNumberViaAirDrop, receivePhoneNumberViaAirDrop } from 'src/services/AirDropService';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

export function SendPoints() {
  const navigation = useNavigation();
  const context = useContext(Context);
  const [telefoneReceptor, setTelefoneReceptor] = useState('');
  const [saldo, setSaldo] = useState('');

  useEffect(() => {
    receivePhoneNumberViaAirDrop((phoneNumber) => {
      if (phoneNumber) {
        setTelefoneReceptor(phoneNumber.toString()); 
      } else {
        console.log('Nenhum número de telefone recebido via AirDrop');
      }
    });
  }, []);

  async function handleSendPoints() {
    try {
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

  async function handleLoadNumber() {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'text/plain' });
      if (result.type !== 'cancel' && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;

        // Verificar se o arquivo realmente existe
        const fileInfo = await FileSystem.getInfoAsync(uri);

        if (!fileInfo.exists) {
          Alert.alert('Erro', 'Arquivo não encontrado');
          return;
        }

        // Ler o conteúdo do arquivo
        const fileContent = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.UTF8 });
        setTelefoneReceptor(fileContent.trim());
        Alert.alert('Número Carregado', 'Número de telefone carregado com sucesso');
      } else {
        Alert.alert('Erro', 'Falha ao selecionar o arquivo');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao carregar o número de telefone');
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Enviar Pontos</Text>
          
          <TouchableOpacity style={styles.btnSendPoints} onPress={handleLoadNumber}>
            <Text style={styles.btnText}>Carregar Número</Text> 
          </TouchableOpacity>

          <TextInput
            style={styles.inputForm}
            placeholder="Quantidade de Pontos"
            placeholderTextColor={'#fff'}
            keyboardType="numeric"
            onChangeText={setSaldo}
            value={saldo}
            onBlur={Keyboard.dismiss}
          />

          <TextInput
            style={styles.inputForm}
            placeholder="Telefone do Receptor"
            placeholderTextColor={'#fff'}
            onChangeText={setTelefoneReceptor}
            value={telefoneReceptor}
            editable={false} 
            onBlur={Keyboard.dismiss}
          />

          <TouchableOpacity style={styles.btnSendPoints} onPress={handleSendPoints}>
            <Text style={styles.btnText}>Enviar Pontos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnSendPoints} onPress={handleConnect}>
            <Text style={styles.btnText}>Conectar via AirDrop</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
