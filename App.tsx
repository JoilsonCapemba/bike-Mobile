import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Routes from './src/routes';
import { AuthProvider } from './src/context';
import { StationsAuthProvider } from './src/context/stationsContext';

export default function App() {
  return (
    <AuthProvider>
      <StationsAuthProvider>
        <Routes />
      </StationsAuthProvider>
    </AuthProvider>
  );
}
