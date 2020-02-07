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
  btnGmail: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    paddingVertical: 5,
    width: '100%',
    marginBottom: '10%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  },

  // buttonDiv: {
  //   display: 'flex',
  //   alignContent: 'center',
  //   justifyContent: 'flex-start'
  // },
  btnIcon: { fontSize: 27 },
  btnText: {
    height: '100%',
    width: '100%',
    fontSize: 27,
    fontWeight: '300',
    color: '#fff',
    textAlign: 'center'
  },
  textInput: { fontSize: 18, backgroundColor: 'black', opacity: 0.6, marginVertical: 5, color: 'white' },
  btnEmail: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'grey',
    paddingVertical: 7,
    width: '100%',
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  }
};
