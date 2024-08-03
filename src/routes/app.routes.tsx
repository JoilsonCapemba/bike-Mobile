import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Chat } from "@screens/Chat";
import { ConectedWithBike } from "@screens/ConectedWithBike/ConectedWithBike";
import { CreateAccount } from "@screens/CreateAccount";
import { GetStarted } from "@screens/GetStarted/Index";
import { Login } from "@screens/Login";
import { Menu } from "@screens/Menu";
import { Perfil } from "@screens/Perfil";
import { Station } from "@screens/Station";
import { StationsBike } from "@screens/StationsBike";
import { SendPoints } from "@screens/SharePoint";

export function AppRoutes(){

  const { Navigator, Screen } = createNativeStackNavigator();
  
  return (
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
        name="createAccount"
        component={CreateAccount}
      />
      <Screen
        name="stationsBike"
        component={StationsBike}
      />
      <Screen
        name="station"
        component={Station}
      />
      <Screen
        name="conectedWithBike"
        component={ConectedWithBike}
      />
      <Screen
        name="menu"
        component={Menu}
      />
      <Screen
        name="perfil"
        component={Perfil}
      />
      <Screen
        name="chat"
        component={Chat}
      />
      <Screen
        name="sendPoints"
        component={SendPoints}
      />
    </Navigator>
  );
}
