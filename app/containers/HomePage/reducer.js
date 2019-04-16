/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import { CHANGE_USERNAME, GET_ARTICLES, RECEIVED_ARTICLES } from './constants';

// The initial state of the App
export const initialState = fromJS({
  username: '',
  data: '',
});

function homeReducer(state = initialState, action) {
  console.log('in reducer home', action.type );
  switch (action.type) {
    case CHANGE_USERNAME:
      // Delete prefixed '@' from the github username
      return state.set('username', action.name.replace(/@/gi, ''));
    case GET_ARTICLES:
      return state.set('data', false);
    case RECEIVED_ARTICLES:
      return state.set('data', action.data);
    default:
      return state;
  }
}

export default homeReducer;
