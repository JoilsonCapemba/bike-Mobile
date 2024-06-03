import { View , Text , Image, TouchableOpacity, TextInput} from "react-native";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";


export function Login(){
  const navigation = useNavigation()

  return(
    <View style={styles.container}>
      <Image source={require('@assets/Logo.png')} />
      <Text style={styles.logoTitle}>BikeShare</Text>

      <TextInput 
        style={styles.inputForm}
        placeholder="Informe o seu Username"
        placeholderTextColor={'#fff'}
        keyboardType="email-address"
      />

      <TextInput 
        style={styles.inputForm}
        placeholder="Informe a sua senha"
        placeholderTextColor={'#fff'}
        keyboardType="visible-password"
      />
      

      <TouchableOpacity style={styles.btnGetStarted} onPress={()=> navigation.navigate('conectedWithBike')}>
        <Text style={styles.btnText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  )
}