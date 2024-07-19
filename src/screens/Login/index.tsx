import { View , Text , Image, TouchableOpacity, TextInput, Alert} from "react-native";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";
import {loginService} from './../../services/UserServices'
import { useContext, useState } from "react";
import { Context } from "src/context";


export function Login(){
  const navigation = useNavigation()
  const context = useContext(Context)

  const [telefone, SetTelefone] = useState('')
  const [senha, SetSenha] = useState('')

  async function loginUser() {
    const login = await loginService(telefone,senha)
    if(login){
        context?.setUser(login.name)
        context?.setTelephone(login.telephone)
        context?.setEmail(login.email)
        context?.setSaldo(login.saldo) 
        navigation.navigate('stationsBike')
    }else{
      Alert.alert("Dados incorretos", "tentar novamente")
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
        secureTextEntry={true}
        onChangeText={senha => SetSenha(senha)}
      />
      

      <TouchableOpacity style={styles.btnGetStarted} onPress={loginUser}>
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