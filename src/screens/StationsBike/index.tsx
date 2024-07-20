import { HeaderPage } from "@components/HeaderPage/Index";
import { Button, FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { PerfilResume } from "@components/PerfilResume";
import { useContext, useState } from "react";
import { OptionMenu } from "@components/OptionMenu";
import { StationResume } from "@components/StationResume";
import { useNavigation } from "@react-navigation/native";
import { Context } from "src/context";
import { StationsContext } from "src/context/stationsContext";


export function StationsBike(){
    const context = useContext(Context)
    const stationsContext = useContext(StationsContext)

    

   const [stations, setStations] = useState(stationsContext?.stations) 
   const navigation = useNavigation()

   console.log(stations)

    return(
        <View style={styles.container}>
            <HeaderPage />
            <PerfilResume/>
            <Text style={styles.title}>Estations</Text>
            <View style={styles.containerSearch}>
                <TextInput 
                    style={styles.inputForm}
                    placeholder="Informe o nome da Estacao"
                    placeholderTextColor={'#c4c1c1'}
                    keyboardType="email-address"
                />

                <TouchableOpacity style={styles.btnSeach}>
                    <Image source={require('src/assets/bx-search.png')}/>
                </TouchableOpacity>  
            </View>

            <View >
                <FlatList
                    style={styles.list}
                    data={stations}
                    keyExtractor={item => item}
                    renderItem={({item})=> (
                        <StationResume stationName={item['serviceName']} onPress={()=> navigation.navigate('station')}/>
                    )}
                />
            </View>
        </View>
    )
}