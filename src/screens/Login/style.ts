import { Link } from '@react-navigation/native'
import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
 container:{
   flex: 1,
   backgroundColor: '#2E2938',
   justifyContent: 'center',
   alignItems: 'center',
 },
 logoTitle: {
   color: '#fff',
   fontSize: 34,
   fontWeight: '700',
   marginTop: -40,
   marginBottom: 40
 },
 btnGetStarted:{
   backgroundColor: '#B4ACF9',
   width: 150,
   height: 50,
   borderRadius: 10,
   marginTop: 20,
   justifyContent: 'center',
 },
 btnText: {
   fontSize: 24,
   alignItems: 'center',
   textAlign: 'center',
   color: '#fff',
   fontWeight: 'bold'
 },
 inputForm:{
  backgroundColor: '#504A55',
  height: 50,
  borderRadius: 10,
  width: 300,
  marginBottom: 35,
  padding: 10,
  color: '#fff',
  fontSize: 18
 },
 link:{
  color: 'orange',
  fontSize: 14
 },
 dica:{
  color: '#fff',
  fontSize: 14
 }
 
})