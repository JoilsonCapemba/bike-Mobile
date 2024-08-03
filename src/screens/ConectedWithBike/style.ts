import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
 container:{
   flex: 1,
   backgroundColor: '#2E2938',
   justifyContent: 'center',
   alignItems: 'center',
 },
 map:{
    flex: 1,
    width: "100%",
 },
 content:{
  width: '100%',
  height: 210,
  borderRadius: 10
 },
 logoTitle:{
  color: '#fff',
    fontSize: 10,
    fontWeight: '700',
 },
 imgLog:{
    width: 40,
    height: 40
 },
 contentMenu:{
  flex: 1,
  width: "100%",
  flexDirection: "row",
  gap: 40,
  justifyContent: 'center',
  marginTop: 10
 },
 btnText: {
   fontSize: 18,
   alignItems: 'center',
   textAlign: 'center',
   color: '#fff',
   fontWeight: 'bold',
 },
 btn: {
   backgroundColor: '#B4ACF9',
   padding: 10,
   width: '100%',
   borderRadius: 10,
   alignSelf: 'center',
   marginTop: 10,
 }
})