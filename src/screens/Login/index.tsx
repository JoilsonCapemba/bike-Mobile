import { View , Text , Image, TouchableOpacity, TextInput, Alert} from "react-native";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";
import {login} from './../../services/UserServices'
import { useState } from "react";


export function Login(){
  const navigation = useNavigation()

  const [telefone, SetTelefone] = useState('')
  const [senha, SetSenha] = useState('')

  async function loginUser() {
    if(login(telefone, senha)){
      navigation.navigate('stationsBike')
    }else{
      Alert.alert("Dados incorretos", "tentar novamente",[
        text
      ])
    }
  }

  return(
    <View style={styles.container}>
      <Image source={require('@assets/Logo.png')} />
      <Text style={styles.logoTitle}>BikeShare</Text>

      <TextInput 
        style={styles.inputForm}
        placeholder="Informe o seu Telefone"
        placeholderTextColor={'#fff'}
        keyboardType="email-address"
        onChangeText={telefone => SetTelefone(telefone)}
      />

      <TextInput 
        style={styles.inputForm}
        placeholder="Informe a sua senha"
        placeholderTextColor={'#fff'}
        keyboardType="visible-password"
        onChangeText={senha => SetSenha(senha)}
      />
      

      <TouchableOpacity style={styles.btnGetStarted} onPress={()=> loginUser}>
        <Text style={styles.btnText}>Entrar</Text>
      </TouchableOpacity>

      <Text style={styles.dica}>
        Ainda nao possue uma conta ? 
        <TouchableOpacity onPress={() => navigation.navigate('createAccount')}>
          <Text style={styles.link}>Criar Counta</Text>
        </TouchableOpacity>
      </Text>
    </View>
  )
}