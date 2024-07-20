import Routes from '@routes/index';
import { GetStarted } from '@screens/GetStarted/Index';
import { Login } from '@screens/Login';
import { Station } from '@screens/Station';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AuthProvider } from 'src/context';
import { StationsAuthProvider } from 'src/context/stationsContext';

export default function App() {
  return (
    <AuthProvider>
      <StationsAuthProvider>
              <Routes/>
      </StationsAuthProvider>
    </AuthProvider>
  );
}
