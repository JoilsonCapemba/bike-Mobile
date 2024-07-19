import { View , Text , Image, TouchableOpacity, TextInput} from "react-native";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {createUser} from './../../services/UserServices'

type User  = {
    name: string
    email: string
    telefone: string
    senha: string
    tipo: number 
    enderecoMac: string
}

export function CreateAccount(){
  const navigation = useNavigation()
  const [name, SetName] = useState('joilson')
  const [email, SetEmail] = useState('')
  const [telefone, SetTelefone] = useState('')
  const [senha, SetSenha] = useState('')
  




  async function hundlecreateAccount(){

    const user = {
        name: name,
        email: email,
        telefone: telefone,
        senha: senha,
        tipo: 1,
        enderecoMac: 'XXX xxx xxx'

    }

    createUser(user)


    navigation.navigate('login')
  }

  return(
    <View style={styles.container}>
      <Image source={require('@assets/Logo.png')} />
      <Text style={styles.logoTitle}>BikeShare</Text>

      <TextInput 
        style={styles.inputForm}
        placeholder="Informe o seu Nome"
        placeholderTextColor={'#fff'}
        keyboardType="default"
        onChangeText={nome => SetName(nome)}
      />

      <TextInput 
        style={styles.inputForm}
        placeholder="Informe o seu Email"
        placeholderTextColor={'#fff'}
        keyboardType="default"
        onChangeText={email => SetEmail(email)}
      />

      <TextInput 
        style={styles.inputForm}
        placeholder="Informe o seu numero de telefone"
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
      

      <TouchableOpacity style={styles.btnGetStarted} onPress={hundlecreateAccount}>
        <Text style={styles.btnText}>Criar Conta</Text>
      </TouchableOpacity>
    </View>
  )
}