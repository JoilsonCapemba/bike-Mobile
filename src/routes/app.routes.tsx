import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GetStarted } from "@screens/GetStarted/Index";
import { Login } from "@screens/Login";
import { Station } from "@screens/Station";
import { StationsBike } from "@screens/StationsBike";


export function AppRoutes(){

  const {Navigator, Screen} = createNativeStackNavigator()
  
  return(
    <Navigator screenOptions={{headerShown: false}}>
      <Screen
        name="getStarted"
        component={GetStarted}
      />
      <Screen
        name="login"
        component={Login}
      />
      <Screen
        name="stationsBike"
        component={StationsBike}
      />
      <Screen
        name="station"
        component={Station}
      />
    </Navigator>
  )
}