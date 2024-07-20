import { HeaderPage } from "@components/HeaderPage/Index";
import { Button, FlatList, Image, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform } from "react-native";
import { styles } from "./style";
import { PerfilResume } from "@components/PerfilResume";
import { useContext, useState } from "react";
import { OptionMenu } from "@components/OptionMenu";
import { StationResume } from "@components/StationResume";
import { useNavigation } from "@react-navigation/native";
import { Context } from "src/context";

import { BleManager } from 'react-native-ble-plx';





export function Chat(){
    const context = useContext(Context)

   const [stations, setStations] = useState(['sulenia','capemba','botelho']) 
   const navigation = useNavigation()
   const [menssages, setMenssages] = useState([])
   const [sms, SetSms] = useState('')
   
   function handleSendSMS(){
    setMenssages(prevState=> [sms, ... prevState])
    SetSms('')
   }

    return(
        <View style={styles.container}>
            <HeaderPage />
            <PerfilResume/>
            <Text style={styles.title}>Chat</Text>

            <View style={styles.containerMessages}>
                <FlatList
                    data={menssages}
                    keyExtractor={item => item}
                    renderItem={({item})=> (
                        <View style={styles.smsContainer}><Text style={styles.sms}>{item}</Text></View>
                    )}
                />
            </View>

            <View style={styles.sendContainer}> 
                    <TextInput 
                        style={styles.inputForm}
                        placeholder="Escreve Aqui a sms"
                        placeholderTextColor={'#9c9999'}
                        keyboardType='default'
                        onChangeText={sms => {SetSms(sms)}}
                        value={sms}
                    />
                

                <TouchableOpacity style={styles.btnSeach} onPress={handleSendSMS}>
                    <Image source={require('src/assets/send-solid-24.png')}/>
                </TouchableOpacity>
            </View> 
        </View>
    )
}