import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E2938',
  },
  title: {
    margin: 20,
    alignSelf: 'center',
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  containerMessages: {
    flex: 1,
    gap: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
  inputForm: {
    backgroundColor: '#504A55',
    height: 50,
    borderRadius: 10,
    padding: 10,
    flex: 1,
    color: '#fff',
    fontSize: 18
  },
  btnSeach: {
    backgroundColor: '#504A55',
    padding: 8,
    borderRadius: 8
  },
  sendContainer: {
    gap: 5,
    flexDirection: 'row',
    alignItems: "center",
    marginBottom: 20,
    padding: 10
  },
  smsContainer: {
    padding: 0,
    marginBottom: 10,
    borderRadius: 15
  },
  userMessage: {
    backgroundColor: '#B4ACF9',
    alignSelf: 'flex-end',
    width: 270,
    marginEnd: 10,
  },
  otherMessage: {
    backgroundColor: '#85597F',
    marginLeft: 10,
    width: 270
  },
  sms: {
    fontSize: 16,
    color: '#fff',
    padding: 4,
    paddingLeft: 8
  },
  flutua: {
    flex: 1,  
    justifyContent: 'center',  
    alignItems: 'center',
  },
  user: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
    paddingLeft: 8
  },
  data: {
    fontSize: 12,
    color: '#111',
    paddingLeft: 8
  }
})
