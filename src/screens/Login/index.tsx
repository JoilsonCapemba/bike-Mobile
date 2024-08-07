import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Context } from "src/context";
import { styles } from "./style";
import { loginService } from 'src/services/UserServices';

export function Login() {
  const navigation = useNavigation();
  const context = useContext(Context);

  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');

  async function loginUser() {
    try {
      const user = await loginService(telephone, password);

      if (user) {
        context?.setUser(user.name);
        context?.setEmail(user.email);
        context?.setTelephone(user.telephone);
        context?.setSaldo(user.saldo);
        navigation.navigate('stationsBike');
      } else {
        Alert.alert("Dados incorretos", "Tente novamente");
      }
    } catch (error) {
      if (error.response) {
        // A response was received but status code is not in the range of 2xx
        switch (error.response.status) {
          case 404:
            Alert.alert("Erro", "Usuário não encontrado. Verifique suas credenciais.");
            break;
          case 503:
            Alert.alert("Erro", "Serviço indisponível. Tente novamente mais tarde.");
            break;
          default:
            Alert.alert("Erro", "Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.");
        }
      } else if (error.request) {
        // The request was made but no response was received
        Alert.alert("Erro", "Não foi possível conectar ao servidor. Verifique sua conexão com a internet.");
      } else {
        // Something happened in setting up the request that triggered an Error
        Alert.alert("Erro", "Ocorreu um erro inesperado. Tente novamente mais tarde.");
      }
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: '#282B33' }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Image source={require('@assets/Logo.png')} />
          <Text style={styles.logoTitle}>BikeShare</Text>

          <TextInput
            style={styles.inputForm}
            placeholder="Informe o seu telefone"
            placeholderTextColor={'#fff'}
            keyboardType="number-pad"
            onChangeText={telephone => setTelephone(telephone)}
            onBlur={Keyboard.dismiss}
          />

          <TextInput
            style={styles.inputForm}
            placeholder="Informe a sua senha"
            placeholderTextColor={'#fff'}
            secureTextEntry={true}
            onChangeText={password => setPassword(password)}
          />

          <TouchableOpacity style={styles.btnGetStarted} onPress={loginUser}>
            <Text style={styles.btnText}>Entrar</Text>
          </TouchableOpacity>

          <Text style={styles.dica}>Ainda não possui uma conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('createAccount')}>
            <Text style={styles.link}>Criar Conta</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
