import React, {Component} from 'react';
import {connect} from 'react-redux';

import NoteBookToolbarComponent from './NoteBookToolbarComponent.jsx';
import NoteBookBottomToolbarComponent from './NoteBookBottomToolbarComponent.jsx';

import {fetchNoteBook} from '../actions/NoteBookActions';

class NoteBookComponent extends Component{
    render(){
        return (
            <div>
                <div className="fix-top">
                    <NoteBookToolbarComponent className="notebook-toolbar" />
                </div>
                {this.props.children}
                <div className="fix-bottom">
                    <NoteBookBottomToolbarComponent className="notebook-bottom-toolbar" />
                </div>
            </div>
        );
    }

    componentWillMount(){
    }

    componentDidMount(){
        this.props.dispatch(fetchNoteBook(this.props.params.id));
    }
}

const IsFetchingSelector = state => state.notebook.isFetching;

function select(state){
    return {
        isFetching: IsFetchingSelector(state)
    };
}

export default connect(select)(NoteBookComponent);