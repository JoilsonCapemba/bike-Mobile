import { View , Text , Image, TouchableOpacity} from "react-native";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";


export function HeaderPage(){
  const navigation = useNavigation()

  return(
    <View style={styles.container}>
      <View >
        <Image source={require('@assets/Logo.png')} style={styles.imgLog}/>
        <Text style={styles.logoTitle}>BikeShare</Text>
      </View>

      <TouchableOpacity onPress={()=> navigation.navigate('menu')}>
        <Image source={require('@assets/XMLID_101_.png')} style={styles.menuIcon}/>
      </TouchableOpacity>
    </View>
  )
}