import { combineReducers } from 'redux';
import logReducer from './logReducer';
import techReducer from './techReducer';
export default combineReducers({ log: logReducer, techs: techReducer });
