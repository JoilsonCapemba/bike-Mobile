import { HeaderPage } from "@components/HeaderPage/Index";
import { styles } from "./style";
import { Text, View, TouchableOpacity } from "react-native";
import { PerfilResume } from "@components/PerfilResume";
import { StationResume } from "@components/StationResume";
import { NumberBikes } from "@components/NumberBikes";
import { useNavigation, useRoute } from "@react-navigation/native";

export function Menu(){

    const navigation = useNavigation()
    return(
        <View style={styles.container}>
            <HeaderPage/>
            <PerfilResume/>
            <Text style={styles.title}>MENU</Text>
            <View style={styles.content}>
                <TouchableOpacity style={styles.btn} onPress={()=> navigation.navigate('stationsBike')}>
                    <Text style={styles.btnText}>ESTAÇOES</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={()=> navigation.navigate('perfil')}>
                    <Text style={styles.btnText}>PERFIL</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} >
                    <Text style={styles.btnText}>ENVIAR PONTOS</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn}  onPress={()=>navigation.navigate('login')}>
                    <Text style={styles.btnText}>TERMINAR SESSAO</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}