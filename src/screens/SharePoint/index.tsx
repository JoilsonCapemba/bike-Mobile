import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Context } from "src/context"; 
import { sendPointsService } from 'src/services/UserServices';
import { styles } from "./style"; 

export function SendPoints() {
    const context = useContext(Context);
    const navigation = useNavigation();
    const [telefoneReceptor, setTelefoneReceptor] = useState('');
    const [saldo, setSaldo] = useState('');

    async function handleSendPoints() {
        try {
            const success = await sendPointsService(context.telephone, telefoneReceptor, parseInt(saldo));
            if (success) {
                Alert.alert('Sucesso', 'Pontos enviados com sucesso');
                // navigation.navigate('menu');
            }
        } catch (error) {
            Alert.alert('Erro', error.message);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enviar Pontos</Text>
            
            <TextInput
                style={styles.inputForm}
                placeholder="Telefone do Receptor"
                placeholderTextColor={'#fff'}
                onChangeText={setTelefoneReceptor}
                value={telefoneReceptor}
            />

            <TextInput
                style={styles.inputForm}
                placeholder="Quantidade de Pontos"
                placeholderTextColor={'#fff'}
                keyboardType="numeric"
                onChangeText={setSaldo}
                value={saldo}
            />

            <TouchableOpacity style={styles.btnSendPoints} onPress={handleSendPoints}>
                <Text style={styles.btnText}>Enviar Pontos</Text>
            </TouchableOpacity>
        </View>
    );
}
