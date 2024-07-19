import Routes from '@routes/index';
import { GetStarted } from '@screens/GetStarted/Index';
import { Login } from '@screens/Login';
import { Station } from '@screens/Station';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AuthProvider } from 'src/context';

export default function App() {
  return (
    <AuthProvider>
      <Routes/>
    </AuthProvider>
  );
}
