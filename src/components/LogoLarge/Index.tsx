import { View , Text , Image} from "react-native";
import { styles } from "./style";

export function LogoLarge(){
  return(
    <View>
      <Image source={require('@assets/Logo.png')} />
      <Text style={styles.logoTitle}>BikeShare</Text>
    </View>
  )
}