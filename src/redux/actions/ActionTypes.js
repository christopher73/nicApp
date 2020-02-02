import keyMirror from 'keymirror'; //to return same string

const ActionTypes = keyMirror({
  GET_ERRORS: null,
  USER_LOADING: null,
  SET_CURRENT_USER: null,
  LOGOUT: null
});

export default ActionTypes;
