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
            <Text style={styles.title}>SuleniaStation</Text>
            <View style={styles.content}>
                <StationResume stationName="estado"/>
                <TouchableOpacity style={styles.btn} >
                    <Text style={styles.btnText}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} >
                    <Text style={styles.btnText}>perfil</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} >
                    <Text style={styles.btnText}>estacoes</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}