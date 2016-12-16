import ViewModeActionTypes from './ViewModeActionTypes';

export function switchViewMode(view_mode){
    const action = {
        type: ViewModeActionTypes.SWITCH_VIEW_MODE,
        view_mode: view_mode
    };
    return action;
}