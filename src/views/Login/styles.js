export const loginStyles = {
  backgroundImage: {
    resizeMode: 'cover', // or 'stretch'
    alignItems: 'center'
  },
  containerDiv: {
    height: '100%',
    display: 'flex',
    width: '70%',
    justifyContent: 'space-around'
  },

  titleText: {
    color: 'white',
    fontSize: 45,
    marginTop: '5%',
    fontWeight: '300',
    textShadowColor: '#000',
    textShadowRadius: 40
  },

  btnIcon: { width: '30%', height: '100%', textAlign: 'center', fontSize: 33 },
  btnText: { width: '70%', fontSize: 27, fontWeight: '100', color: '#fff', borderLeftColor: '#fff', borderLeftWidth: 2, textAlign: 'center' },
  authButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 7,
    width: '100%',
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  },
  textInput: { fontSize: 18, backgroundColor: 'black', opacity: 0.6, marginVertical: 5, color: 'white' }
};
