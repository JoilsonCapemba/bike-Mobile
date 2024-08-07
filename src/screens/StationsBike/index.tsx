import React, { useContext, useState, useEffect, useCallback } from "react";
import { HeaderPage } from "@components/HeaderPage/Index";
import { FlatList, Image, Text, TextInput, TouchableOpacity, View, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { styles } from "./style";
import { PerfilResume } from "@components/PerfilResume";
import { StationResume } from "@components/StationResume";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Context } from "src/context";
import { StationsContext } from "src/context/stationsContext";
import { getStations } from 'src/services/StatiosService';

// Defina a interface para Station
interface Station {
  serviceName: string;
  serviceUrl: string;
  id: number;
}

export function StationsBike() {
  const context = useContext(Context);
  const stationsContext = useContext(StationsContext);

  // Tipagem explícita para stations
  const [stations, setStations] = useState<Station[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchStations = async () => {
    setLoading(true);
    try {
      const stationsData = await getStations();
      if (stationsData && Array.isArray(stationsData)) {
        setStations(stationsData);
      } else {
        throw new Error('Formato de dados inválido');
      }
    } catch (error) {
      if (error.message === 'Network Error') {
        Alert.alert("Erro", "Não foi possível conectar ao servidor. Verifique sua conexão com a internet.");
      } else {
        Alert.alert("Erro", "Ocorreu um erro ao buscar estações. Tente novamente mais tarde.");
      }
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchStations();
    }, [])
  );

  const navigation = useNavigation();

  const filteredStations = stations.filter(station =>
    station.serviceName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: '#282B33' }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <HeaderPage />
          <PerfilResume />
          <Text style={styles.title}>Estações</Text>
          <View style={styles.containerSearch}>
            <TextInput
              style={styles.inputForm}
              placeholder="Informe o nome da Estação"
              placeholderTextColor={'#c4c1c1'}
              value={searchText}
              onChangeText={setSearchText}
              onBlur={Keyboard.dismiss}
            />
            <TouchableOpacity style={styles.btnSeach}>
              <Image source={require('src/assets/bx-search.png')} />
            </TouchableOpacity>
          </View>

          <View>
            {loading ? (
              <Text style={styles.loadingMessage}>Carregando estações...</Text>
            ) : (
              <FlatList
                style={styles.list}
                data={filteredStations}
                keyExtractor={(item) => item.serviceName}
                renderItem={({ item }) => (
                  <StationResume
                    stationName={item.serviceName}
                    onPress={() => navigation.navigate('station', { stationName: item.serviceName })}
                  />
                )}
                ListEmptyComponent={() => (
                  <Text style={styles.emptyMessage}>Nenhuma estação encontrada</Text>
                )}
              />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
