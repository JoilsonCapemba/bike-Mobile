import { View , Text , Image, TouchableOpacity} from "react-native";
import { styles } from "./style";


export function HeaderPage(){
  return(
    <View style={styles.container}>
      <View >
        <Image source={require('@assets/Logo.png')} style={styles.imgLog}/>
        <Text style={styles.logoTitle}>BikeShare</Text>
      </View>

      <TouchableOpacity>
        <Image source={require('@assets/XMLID_101_.png')} style={styles.menuIcon}/>
      </TouchableOpacity>
    </View>
  )
}