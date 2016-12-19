import ViewModeActionTypes from './ViewModeActionTypes';

export function switchViewMode(viewmode){
    const action = {
        type: ViewModeActionTypes.SWITCH_VIEWMODE,
        viewmode: viewmode
    };
    return action;
}