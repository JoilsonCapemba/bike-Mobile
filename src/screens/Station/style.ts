import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
 container:{
   flex: 1,
   height: '100%'
 },
 map:{
  flex: 1,
  width: "100%"
 },
 title:{
    margin: 10,
    alignSelf: 'center',
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
 },
 contentStation:{
    backgroundColor: '#2E2938',
    borderRadius: 15,
    justifyContent: 'center',
    padding: 20,
    width: 'auto'
  },
  btnText: {
    fontSize: 18,
    alignItems: 'center',
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold'
  },
  btn:{
    backgroundColor: '#B4ACF9',
    padding: 9,
    width: 100,
    borderRadius: 10,
    alignSelf: 'center'
  },
  avatar:{
    width: 30,
    height: 30
  }
})