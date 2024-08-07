import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createUser } from 'src/services/UserServices';
import { styles } from "./style";

export function CreateAccount() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');

  const handleTelefoneChange = (text) => {
    // Remove todos os caracteres que não sejam dígitos
    const cleaned = text.replace(/[^0-9]/g, '');
    
    // Verifica se o valor inserido atende aos critérios
    if (cleaned.length === 0) {
      setTelephone('');
    } else if (cleaned.length === 1 && cleaned[0] === '9') {
      setTelephone(cleaned);
    } else if (cleaned.length === 2 && cleaned[0] === '9' && /[1-59]/.test(cleaned[1])) {
      setTelephone(cleaned);
    } else if (cleaned.length > 2 && cleaned[0] === '9' && /[1-9]/.test(cleaned[1]) && cleaned.length <= 9) {
      setTelephone(cleaned);
    }
  };

  const handleEmailChange = (text) => {
    const cleaned = text.toLowerCase();
    setEmail(cleaned);
  };

  const handleNameChange = (text) => {
    // Remove caracteres não alfabéticos, mas permite espaços únicos entre as palavras
    const cleaned = text.replace(/[^a-zA-Z\s]/g, '').replace(/\s+/g, ' ');
    setName(cleaned);
  };

  const handleNameBlur = () => {
    // Remove espaços extras entre as palavras e espaços no início e no fim
    const trimmed = name.trim();
    const words = trimmed.split(' ').filter(word => word !== '');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    setName(capitalizedWords.join(' '));
  };
  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const validatePassword = (password) => {
    const uppercaseRegex = /^[A-Z]/; // Verifica se começa com uma letra maiúscula
    const numberRegex = /\d/; // Verifica se contém pelo menos um número
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/; // Verifica se contém pelo menos um caractere especial

    if (password.length < 8) {
      return "A senha deve ter no mínimo 8 caracteres.";
    }

    if (!uppercaseRegex.test(password)) {
      return "A senha deve começar com uma letra maiúscula.";
    }

    if (!numberRegex.test(password)) {
      return "A senha deve conter pelo menos um número.";
    }

    if (!specialCharRegex.test(password)) {
      return "A senha deve conter pelo menos um caractere especial.";
    }

    return null;
  };
  
  async function handleCreateAccount() {
    const emailRegex = /^[a-z0-9._%+-]+@(gmail.com|hotmail.com|icloud.com|outlook.com|yahoo.com)$/;

    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido.');
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      Alert.alert('Erro', passwordError);
      return;
    }

    try {
      const user = {
        name: name,
        email: email,
        telephone: telephone,
        password: password,
        type: 1,
        macAddress: 'XX:XX:XX:XX:XX:XX'
      };

      console.log(user); 

      const response = await createUser(user);

      if (response) {
        Alert.alert('Conta criada com sucesso!', 'Você pode agora fazer login.');
        navigation.navigate('login');
      }
    } catch (error) {
      if (error.response) {
        // A response was received but status code is not in the range of 2xx
        switch (error.response.status) {
          case 400:
            Alert.alert('Erro', 'Requisição inválida. Verifique os dados informados.');
            break;
          case 409:
            Alert.alert('Erro', 'Usuário já existe. Tente um telefone ou e-mail diferente.');
            break;
          case 503:
            Alert.alert('Erro', 'Serviço indisponível. Tente novamente mais tarde.');
            break;
          default:
            Alert.alert('Erro', 'Ocorreu um erro ao tentar criar a conta. Tente novamente mais tarde.');
        }
      } else if (error.request) {
        // The request was made but no response was received
        Alert.alert('Erro', 'Não foi possível conectar ao servidor. Verifique sua conexão com a internet.');
      } else {
        // Something happened in setting up the request that triggered an Error
        Alert.alert('Erro', 'Ocorreu um erro inesperado. Tente novamente mais tarde.');
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
            placeholder="Informe o seu Nome"
            placeholderTextColor={'#fff'}
            value={name}
            onChangeText={handleNameChange}
            onBlur={handleNameBlur}
          />

          <TextInput
            style={styles.inputForm}
            placeholder="Informe o seu Email"
            keyboardType="email-address"
            placeholderTextColor={'#fff'}
            value={email}
            onChangeText={handleEmailChange}
            onBlur={Keyboard.dismiss}
          />

          <TextInput
            style={styles.inputForm}
            placeholder="Informe o seu número de telefone"
            keyboardType="number-pad"
            placeholderTextColor={'#fff'}
            value={telephone}
            onChangeText={handleTelefoneChange}
            onBlur={Keyboard.dismiss}
            maxLength={9}
          />

          <TextInput
            style={styles.inputForm}
            placeholder="Informe a sua senha"
            placeholderTextColor={'#fff'}
            secureTextEntry={true}
            value={password}
            onChangeText={handlePasswordChange}
            onBlur={Keyboard.dismiss}
          />

          <TouchableOpacity style={styles.btnGetStarted} onPress={handleCreateAccount}>
            <Text style={styles.btnText}>Criar Conta</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
