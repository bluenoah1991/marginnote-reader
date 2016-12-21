import NoteActionTypes from './NoteActionTypes';
import {Note} from '../common/DataAdapter';

export function fetchNotesRequest(){
    const action = {
        type: NoteActionTypes.FETCH_NOTES_REQUEST
    };
    return action;
}

export function fetchNotesSuccess(data){
    const action = {
        type: NoteActionTypes.FETCH_NOTES_SUCCESS,
        data: data
    };
    return action;
}

export function fetchNotesFailure(err){
    const action = {
        type: NoteActionTypes.FETCH_NOTES_FAILURE,
        err: err
    };
    return action;
}

export function fetchNotes(notebookId){
    return function(dispatch){
        dispatch(fetchNotesRequest());
        Note.query(notebookId, function(err, notes){
            if(err){
                dispatch(fetchNotesFailure(err));
            } else {
                dispatch(fetchNotesSuccess(notes));
            }
        })
    };
}