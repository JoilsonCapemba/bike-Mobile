import {View, Text, Image} from 'react-native'
import { styles } from './style'

export function PerfilResume(){
  return(
    <View style={styles.container}>
        <View style={styles.avatar}>
          <Image source={require('@assets/avatar.png')}/>
        </View>
        <View style={styles.contentResume}>
          <Text style={styles.userName}>Marcia</Text>
          <Text style={styles.pontos}>7</Text>
        </View>
    </View>
  )
}