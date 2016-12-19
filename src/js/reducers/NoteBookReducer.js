import Immutable from 'immutable';

import NoteBookActionTypes from '../actions/NoteBookActionTypes';

export default function(state = {}, action){
    let immutable_state = Immutable.fromJS(state);
    switch(action.type){
        case NoteBookActionTypes.FETCH_NOTEBOOK_REQUEST:
            immutable_state = immutable_state.setIn(['isFetching'], true);
            return immutable_state.toJS();
        case NoteBookActionTypes.FETCH_NOTEBOOK_SUCCESS:
            immutable_state = immutable_state.setIn(['isFetching'], false);
            immutable_state = immutable_state.setIn(['raw'], action.data.raw);
            immutable_state = immutable_state.setIn(['notes'], action.data.notes());
            return immutable_state.toJS();
        default:
            return state;
    }
};