import {combineReducers} from 'redux';
import AuthReducer from './reducers/authReducers/auth.reducers';
import FormReducer from './reducers/appReducers/form.reducers';
import OtherReducer from './reducers/appReducers/other.reducers';
import * as Types from './root.types';

const appReducer = combineReducers({
  auth: AuthReducer,
  app: combineReducers({
    form: FormReducer,
    other: OtherReducer,
  }),
});

const RootReducer = (state, action) => {
  Types.LOGOUT === action.type && [(state = undefined)];

  return appReducer(state, action);
};

export default RootReducer;
