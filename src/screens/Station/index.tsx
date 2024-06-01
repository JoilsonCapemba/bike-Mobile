import { HeaderPage } from "@components/HeaderPage/Index";
import { styles } from "./style";
import { Text, View, TouchableOpacity } from "react-native";
import { PerfilResume } from "@components/PerfilResume";
import { StationResume } from "@components/StationResume";
import { NumberBikes } from "@components/NumberBikes";

export function Station(){
    return(
        <View style={styles.container}>
            <HeaderPage/>
            <PerfilResume/>
            <Text style={styles.title}>SuleniaStation</Text>
            <View style={styles.contentStation}>
                <StationResume stationName="estado"/>
                <NumberBikes totalBike={5}/>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>Levantar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}