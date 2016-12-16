import {combineReducers} from 'redux';

import ViewModeReducer from './ViewModeReducer';

export default combineReducers({
    view_mode: ViewModeReducer
});