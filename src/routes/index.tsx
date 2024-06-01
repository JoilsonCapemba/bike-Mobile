import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";
import { StatusBar } from "expo-status-bar";

export default function Routes(){
  return(
    <NavigationContainer >
      <StatusBar
        translucent
        style="light"
      />
      <AppRoutes/>
    </NavigationContainer>
  )
}