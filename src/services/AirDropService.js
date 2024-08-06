import { NativeModules } from 'react-native';
const { AirDropModule } = NativeModules;

if (!AirDropModule) {
  console.error('AirDropModule is null');
} else {
  console.log('AirDropModule is loaded');
}

export const sendPhoneNumberViaAirDrop = async (phoneNumber) => {
  console.log('Sending phone number via AirDrop:', phoneNumber);
  try {
    const result = await AirDropModule.sendPhoneNumber(phoneNumber.toString());
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const receivePhoneNumberViaAirDrop = (callback) => {
  if (!AirDropModule) {
    console.error('AirDropModule is null');
    return;
  }
  AirDropModule.receivePhoneNumber((phoneNumber) => {
    console.log('Received phone number via AirDrop:', phoneNumber);
    callback(phoneNumber);
  });
};
