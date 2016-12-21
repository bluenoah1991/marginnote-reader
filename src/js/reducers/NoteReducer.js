import _ from 'lodash';
import Immutable from 'immutable';

import NoteActionTypes from '../actions/NoteActionTypes';

export default function(state = {}, action){
    let immutable_state = Immutable.fromJS(state);
    switch(action.type){
        case NoteActionTypes.FETCH_NOTES_REQUEST:
            immutable_state = immutable_state.setIn(['isFetching'], true);
            return immutable_state.toJS();
        case NoteActionTypes.FETCH_NOTES_SUCCESS:
            immutable_state = immutable_state.setIn(['isFetching'], false);
            immutable_state = immutable_state.setIn(['data'], _(action.data).map(function(note){
                return [note.id(), {
                    title: note.title(),
                    mindpos: note.mindpos(),
                    children: note.children()
                }];
            }).fromPairs().value());
            return immutable_state.toJS();
        default:
            return state;
    }
};