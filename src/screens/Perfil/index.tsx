import { HeaderPage } from "@components/HeaderPage/Index";
import { Button, FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { PerfilResume } from "@components/PerfilResume";
import { useContext, useState } from "react";
import { OptionMenu } from "@components/OptionMenu";
import { StationResume } from "@components/StationResume";
import { useNavigation } from "@react-navigation/native";
import { Context } from "src/context";


export function Perfil(){
    const context = useContext(Context)
    
   const navigation = useNavigation()

    return(
        <View style={styles.container}>
            <HeaderPage/>
            
            <View style={styles.content}>
                <View style={styles.avatar}>
                    <Image source={require('@assets/avatar.png')} width={90} height={90}/>
                </View>
                
                <Text style={styles.title}>{context?.user}</Text>

                <View style={styles.contentDescription}>
                    <Text style={styles.textDescricao}>{context?.email}</Text>
                </View>

                <View style={styles.contentDescription}>
                    <Text style={styles.textDescricao}>{context?.saldo}</Text>
                </View>

                <View style={styles.contentDescription}>
                    <Text style={styles.textDescricao}>{context?.telephone}</Text>
                </View>

            </View>
        </View>
    )
}