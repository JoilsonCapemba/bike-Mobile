import { styles } from "./style";
import { View, Text, Image, TouchableOpacity, TouchableOpacityProps } from "react-native";

type PropsStation = TouchableOpacityProps & {
  stationName: string
}

export function StationResume({stationName, ...rest}: PropsStation){
  return(
    <TouchableOpacity style={styles.container} {...rest}>
      <Text style={styles.stationName}>{stationName}</Text>
      <Image source={require('@assets/withBike.png')} />
    </TouchableOpacity>
  )
}