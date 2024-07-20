import { View , Text , Image, TouchableOpacity, TextInput, Alert} from "react-native";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";
import {loginService} from './../../services/UserServices'
import { useContext, useState } from "react";
import { Context } from "src/context";
import { StationsContext } from "src/context/stationsContext";
import { getStations } from "src/services/StatiosService";


export function Login(){
  const navigation = useNavigation()
  const context = useContext(Context)

  const statioContext = useContext(StationsContext)

  const [telefone, SetTelefone] = useState('')
  const [senha, SetSenha] = useState('')

  async function loginUser() {
    const login = await loginService(telefone,senha)
    const stations = await getStations()
    if(login){
        context?.setUser(login.name)
        context?.setTelephone(login.telephone)
        context?.setEmail(login.email)
        context?.setSaldo(login.saldo) 

        //console.log(stations)

        navigation.navigate('stationsBike') 

        
        statioContext?.setStations(stations)

        /*statioContext?.setServiceName(stations.serviceName)
        statioContext?.setServiceUrl(stations.serviceUrl)
        statioContext?.setId(stations.id)*/

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
        Ainda não possui uma conta ? 
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('createAccount')}>
        <Text style={styles.link}>Criar Conta</Text>
      </TouchableOpacity>
    </View>
  )
}