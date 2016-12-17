import React, {Component} from 'react';

import NoteBookToolbarComponent from './NoteBookToolbarComponent.jsx';
import NoteBookBottomToolbarComponent from './NoteBookBottomToolbarComponent.jsx';

export default class NoteBookComponent extends Component{
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
}