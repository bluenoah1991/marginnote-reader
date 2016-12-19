import NoteBookActionTypes from './NoteBookActionTypes';
import {NoteBook} from '../common/DataAdapter';

export function fetchNoteBookRequest(){
    const action = {
        type: NoteBookActionTypes.FETCH_NOTEBOOK_REQUEST
    };
    return action;
}

export function fetchNoteBookSuccess(data){
    const action = {
        type: NoteBookActionTypes.FETCH_NOTEBOOK_SUCCESS,
        data: data
    };
    return action;
}

export function fetchNoteBookFailure(err){
    const action = {
        type: NoteBookActionTypes.FETCH_NOTEBOOK_FAILURE,
        err: err
    };
    return action;
}

export function fetchNoteBook(identifier){
    return function(dispatch){
        dispatch(fetchNoteBookRequest());
        NoteBook.create(identifier, function(err, notebook){
            if(err){
                dispatch(fetchNoteBookFailure(err));
            }
            dispatch(fetchNoteBookSuccess(notebook));
        })
    };
}