import { View , Text , Image, TouchableOpacity} from "react-native";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";


export function GetStarted(){
  const navigation = useNavigation()

  return(
    <View style={styles.container}>
      <Image source={require('@assets/Logo.png')} />
      <Text style={styles.logoTitle}>BikeShare</Text>
      <Text style={styles.dicaGetstarted}>Aproveita o seu passeio com o BikeShare</Text>
      <TouchableOpacity style={styles.btnGetStarted} onPress={()=> navigation.navigate('login')}>
        <Text style={styles.btnText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  )
}