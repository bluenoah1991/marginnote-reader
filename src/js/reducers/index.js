import {combineReducers} from 'redux';

import ViewModeReducer from './ViewModeReducer';
import NoteBookReducer from './NoteBookReducer';
import NoteReducer from './NoteReducer';

export default combineReducers({
    viewmode: ViewModeReducer,
    notebook: NoteBookReducer,
    note: NoteReducer,
});