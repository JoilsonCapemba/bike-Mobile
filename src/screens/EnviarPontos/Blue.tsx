import React, { useState, useEffect } from 'react';  
import { StyleSheet, Text, View, Button, Platform } from 'react-native';  
import * as Bluetooth  from 'expo-bluetooth';  
import * as Permissions from 'expo-permissions';  
 

import BluetoothSerial from 'react-native-bluetooth-serial';
import PermissionsAndroid from 'react-native-permissions';

const App = () => {  
  const [connectedDevice, setConnectedDevice] = useState(null);  
  const [devices, setDevices] = useState([]);  
  const [isScanning, setIsScanning] = useState(false);  
  const [isConnected, setIsConnected] = useState(false);  

  const scanDevices = async () => {  
    try {   

      await PermissionsAndroid.PERMISSIONS.ANDROID.BLUETOOTH_CONNECT

      setIsScanning(true);  
      const foundDevices = await Bluetooth.discoverDevices();  
      setDevices(foundDevices);  
      setIsScanning(false);  
    } catch (error) {  
      console.error(error);  
    }  
  };  

  const connectToDevice = async (device) => {  
    try {  
      await Bluetooth.connect(device.address);  
      setConnectedDevice(device);  
      setIsConnected(true);  
    } catch (error) {  
      console.error(error);  
    }  
  };  

  const disconnect = async () => {  
    try {  
      await Bluetooth.disconnect(connectedDevice.address);  
      setConnectedDevice(null);  
      setIsConnected(false);  
    } catch (error) {  
      console.error(error);  
    }  
  };  

  const sendData = async (data) => {  
    if (isConnected) {  
      try {  
        await Bluetooth.write(connectedDevice.address, data);  
      } catch (error) {  
        console.error(error);  
      }  
    } else {  
      console.error('Not connected to any device!');  
    }  
  };  

  const handleDataReceived = (data) => {  
    console.log('Data received:', data);  
  };  

  useEffect(() => {  
    if (connectedDevice) {  
      Bluetooth.onDataReceived(connectedDevice.address, handleDataReceived);  
      return () => Bluetooth.offDataReceived(connectedDevice.address);  
    }  
  }, [connectedDevice]);  

  return (  
    <View style={styles.container}>  
      <Text>Bluetooth Connection</Text>  
      {!isConnected && (  
        <View>  
          {Platform.OS === 'android' && (  
            <Button title="Enable Bluetooth" onPress={() => Bluetooth.enableBluetooth()} />  
          )}  
          <Button title="Scan Devices" onPress={scanDevices} />  
          {isScanning && <Text>Scanning...</Text>}  
          {devices.length > 0 && (  
            <View>  
              <Text>Available Devices:</Text>  
              {devices.map((device) => (  
                <Button key={device.address} title={device.name} onPress={() => connectToDevice(device)} />  
              ))}  
            </View>  
          )}  
        </View>  
      )}  
      {isConnected && (  
        <View>  
          <Text>Connected to: {connectedDevice.name}</Text>  
          <Button title="Disconnect" onPress={disconnect} />  
          <Button title="Send Data" onPress={() => sendData('Hello from React Native!')} />  
        </View>  
      )}  
    </View>  
  );  
};  

const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    backgroundColor: '#fff',  
    alignItems: 'center',  
    justifyContent: 'center',  
  },  
});  

export default App; 