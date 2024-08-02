import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createUser } from 'src/services/UserServices';
import { styles } from "./style";

export function CreateAccount() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');

  async function handleCreateAccount() {
    try {
      const user = {
        name: name,
        email: email,
        telephone: telephone,
        password: password,
        type: 1, // Suponha que 1 seja o tipo de usuário padrão
        macAddress: 'XX:XX:XX:XX:XX:XX' // Substitua pelo valor apropriado ou obtenha dinamicamente
      };

      console.log(user); // Adicione esta linha para verificar se os campos estão sendo preenchidos corretamente

      const response = await createUser(user);

      if (response) {
        Alert.alert('Conta criada com sucesso!', 'Você pode agora fazer login.');
        navigation.navigate('login');
      }
    } catch (error) {
      Alert.alert('Erro ao criar conta', error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require('@assets/Logo.png')} />
      <Text style={styles.logoTitle}>BikeShare</Text>

      <TextInput
        style={styles.inputForm}
        placeholder="Informe o seu Nome"
        placeholderTextColor={'#fff'}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.inputForm}
        placeholder="Informe o seu Email"
        placeholderTextColor={'#fff'}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.inputForm}
        placeholder="Informe o seu número de telefone"
        placeholderTextColor={'#fff'}
        value={telephone}
        onChangeText={setTelephone}
      />

      <TextInput
        style={styles.inputForm}
        placeholder="Informe a sua senha"
        placeholderTextColor={'#fff'}
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.btnGetStarted} onPress={handleCreateAccount}>
        <Text style={styles.btnText}>Criar Conta</Text>
      </TouchableOpacity>
    </View>
  );
}
