import {combineReducers} from 'redux';

import ViewModeReducer from './ViewModeReducer';
import NoteBookReducer from './NoteBookReducer';

export default combineReducers({
    viewmode: ViewModeReducer,
    notebook: NoteBookReducer
});