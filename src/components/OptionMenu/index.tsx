import { styles } from "./style";
import { View, Text, Image, TouchableOpacity } from "react-native";


export function OptionMenu(){
  return(
    <TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.stationName}>Opcao</Text>
      </View>
    </TouchableOpacity>
  )
}