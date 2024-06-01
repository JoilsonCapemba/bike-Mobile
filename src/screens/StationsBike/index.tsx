import { HeaderPage } from "@components/HeaderPage/Index";
import { Button, FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { PerfilResume } from "@components/PerfilResume";
import { useState } from "react";
import { OptionMenu } from "@components/OptionMenu";
import { StationResume } from "@components/StationResume";
import { useNavigation } from "@react-navigation/native";


export function StationsBike(){
   const [stations, setStations] = useState(['sulenia','capemba','botelho']) 
   const navigation = useNavigation()

    return(
        <View style={styles.container}>
            <HeaderPage />
            <PerfilResume/>
            <Text style={styles.title}>Estations</Text>
            <View style={styles.containerSearch}>
                <TextInput 
                    style={styles.inputForm}
                    placeholder="Informe o seu Username"
                    placeholderTextColor={'#fff'}
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
                        <StationResume stationName={item} onPress={()=> navigation.navigate('station')}/>
                    )}
                />
            </View>
        </View>
    )
}