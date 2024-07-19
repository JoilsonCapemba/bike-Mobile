import {View, Text, Image} from 'react-native'
import { styles } from './style'
import { useContext } from 'react'
import { AuthProvider, Context } from 'src/context'

export function PerfilResume(){
  const context = useContext(Context)

  return(
    <View style={styles.container}>
        <View style={styles.avatar}>
          <Image source={require('@assets/avatar.png')}/>
        </View>
        <View style={styles.contentResume}>
          <Text style={styles.userName}>{context?.user}</Text>
          <Text style={styles.pontos}>{context?.saldo}</Text>
        </View>
    </View>
  )
}