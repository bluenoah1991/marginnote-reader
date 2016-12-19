import Immutable from 'immutable';

import ViewModeActionTypes from '../actions/ViewModeActionTypes';

export default function(state = {}, action){
    switch(action.type){
        case ViewModeActionTypes.SWITCH_VIEW_MODE:
            let immutable_state = Immutable.fromJS(state);
            immutable_state = immutable_state.setIn(['current'], action.viewmode);
            return immutable_state.toJS();
        default:
            return state;
    }
};