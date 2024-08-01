import { HeaderPage } from "@components/HeaderPage/Index";
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { PerfilResume } from "@components/PerfilResume";
import { useContext, useState, useEffect } from "react";
import { StationResume } from "@components/StationResume";
import { useNavigation } from "@react-navigation/native";
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

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const stationsData = await getStations();
        setStations(stationsData);
      } catch (error) {
        console.error("Erro ao buscar estações:", error);
      }
    };

    fetchStations();
  }, []);

  const navigation = useNavigation();

  console.log("Rendered stations:", stations);

  return (
    <View style={styles.container}>
      <HeaderPage />
      <PerfilResume />
      <Text style={styles.title}>Estações</Text>
      <View style={styles.containerSearch}>
        <TextInput
          style={styles.inputForm}
          placeholder="Informe o nome da Estacao"
          placeholderTextColor={'#c4c1c1'}
        />
        <TouchableOpacity style={styles.btnSeach}>
          <Image source={require('src/assets/bx-search.png')} />
        </TouchableOpacity>
      </View>

      <View>
        <FlatList
          style={styles.list}
          data={stations}
          keyExtractor={(item) => item.serviceName} // Use o nome do item como chave
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
      </View>
    </View>
  );
}
