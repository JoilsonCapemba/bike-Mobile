import { NativeModules } from 'react-native';
const { AirDropModule } = NativeModules;

export const sendPhoneNumberViaAirDrop = async (phoneNumber) => {
  try {
    const result = await AirDropModule.sendPhoneNumber(phoneNumber.toString());
    return result;
  } catch (error) {
    throw error;
  }
};

export const receivePhoneNumberViaAirDrop = (callback) => {
  if (!AirDropModule) {
    return;
  }
  AirDropModule.receivePhoneNumber((phoneNumber) => {
    callback(phoneNumber);
  });
};
