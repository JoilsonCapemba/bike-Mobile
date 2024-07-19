import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
 container:{
   flex: 1,
   backgroundColor: '#2E2938',
 },
 title:{
    margin: 80,
    alignSelf: 'center',
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
 },
 content:{
    flex: 1,
    backgroundColor: '#2E2938',
    paddingHorizontal: 18,
    gap: 10
  },
  btnText: {
    fontSize: 24,
    alignItems: 'center',
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold'
  },
  btn:{
    backgroundColor: '#504A55',
    width: '100%',
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
  },
})