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
import BluetoothSerial from 'react-native-bluetooth-serial';
import PermissionsAndroid from 'react-native-permissions';
//import Permissions from 'react-native-permissions';


import React, { useEffect} from 'react';
import * as Permissions from 'expo-permissions';
import * as ExpoDevice from "expo-device";
import * as Bluetooth from 'expo-bluetooth';


export function Chat(){

    const context = useContext(Context)
   
    const [scanning, setScanning] = useState(false);
    
    const [isEnabled, setIsEnabled] = useState(false);  
    const [devices, setDevices] = useState([]);  
    const [connectedDevice, setConnectedDevice] = useState(null);  
    const [message, setMessage] = useState('');

    useEffect(() => {  
        // Verificar se o Bluetooth está disponível  
        BluetoothSerial.BluetoothSerial.isEnabled()  
            .then((enabled) => setIsEnabled(enabled))  
            .catch((err) => console.log(err));  

        // Solicitar permissão para usar o Bluetooth (Android)  
        if (Platform.OS === 'android') { 
             
             requestBluetoothPermission();  
        }  
    }, []);  
    



    


   const [stations, setStations] = useState(['sulenia','capemba','botelho']) 
   const navigation = useNavigation()
   const [menssages, setMenssages] = useState([])
   const [sms, SetSms] = useState('')

    return(
        <View style={styles.container}>
            <HeaderPage />
            <PerfilResume/>
            <Text style={styles.title}>Chat</Text>

            <View style={styles.containerMessages}>
                <FlatList
                    style={styles.list}
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
                        onChangeText={sms => SetSms(sms)}
                    />
                

                <TouchableOpacity style={styles.btnSeach} onPress={()=> setMenssages(prevState=> [sms, ... prevState])}>
                    <Image source={require('src/assets/send-solid-24.png')}/>
                </TouchableOpacity>
            </View> 
        </View>
    )
}