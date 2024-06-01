import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
 container:{
   flex: 1,
   backgroundColor: '#2E2938',
 },
 title:{
    margin: 50,
    alignSelf: 'center',
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
 },
inputForm:{
    backgroundColor: '#504A55',
    height: 50,
    borderRadius: 10,
    padding: 10,
    flex: 1,
   },
   containerSearch:{
    flexDirection: 'row',
    gap: 20,
    paddingHorizontal: 18,
    alignItems: 'center',
    marginBottom: 50
   },
   btnSeach:{
      backgroundColor: '#504A55',
      padding: 8,
      borderRadius: 8
   },
   list:{
    paddingHorizontal: 18
   }
})