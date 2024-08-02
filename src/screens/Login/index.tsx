import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Context } from "src/context";
import { styles } from "./style";
import { loginService } from 'src/services/UserServices'; // Certifique-se de que o caminho está correto

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
        context?.setSaldo(user.saldo); // Supondo que o saldo seja uma propriedade do usuário
        navigation.navigate('stationsBike');
      } else {
        Alert.alert("Dados incorretos", "Tente novamente");
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao tentar fazer login");
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require('@assets/Logo.png')} />
      <Text style={styles.logoTitle}>BikeShare</Text>

      <TextInput
        style={styles.inputForm}
        placeholder="Informe o seu telefone"
        placeholderTextColor={'#fff'}
        keyboardType="phone-pad"
        onChangeText={telephone => setTelephone(telephone)}
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
  );
}
