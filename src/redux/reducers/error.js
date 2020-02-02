import ActionType from '../actions/ActionTypes';

const initialState = { message: 'no error!!!', status: false };

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionType.GET_ERRORS:
      return { ...state, message: action.payload, status: true };
    default:
      return state;
  }
}
