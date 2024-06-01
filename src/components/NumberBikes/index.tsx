import { styles } from "./style";
import { View, Text, Image } from "react-native";

type PropsStation = {
  totalBike: number
}

export function NumberBikes({totalBike}: PropsStation){
  return(
    <View style={styles.container}>
      <Text style={styles.stationName}>Bikes Free</Text>
      <Text style={styles.totalBike}>{totalBike}</Text>
    </View>
  )
}