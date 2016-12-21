import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import ListComponent from './ListComponent.jsx';
import ListItemComponent from './ListItemComponent.jsx';

class OutlineViewComponent extends Component{
    render(){
        let rootNotes = this._findRootNotes();
        let items = [];
        _.forEach(rootNotes, function(rootNote, index){
            items.push(this._createItem(rootNote, index));
        }.bind(this));

        return (
            <ListComponent>
                {items}
            </ListComponent>
        );
    }
    
    _createItem(note, key){
        let listItemProps = {
            key: key,
            title: note.title,
            number: 0,
            content: [
                {type: 'paragraph', text: 'The following list provides a few reasons why note taking is an important activity'},
                {type: 'image', src: './img/1.png'}
            ]
        };
        let children = [];
        _.forEach(this._findChildNotes(note), function(childNote, index){
            children.push(this._createItem(childNote, index));
        }.bind(this));
        return (
            <ListItemComponent {...listItemProps}>
                {children}
            </ListItemComponent>
        )
    }

    _findChildNotes(parentNote){
        return _(parentNote.children).map(function(noteId){
            let childNote = _.find(this.props.notes, function(note, noteId_){
                return noteId_ == noteId;
            });
            if(childNote){
                return childNote;
            } else {
                return null;
            }
        }.bind(this)).filter(function(note){
            return note != null;
        }).value();
    }

    _findRootNotes(){
        let childNoteIds = _.reduce(this.props.notes, function(result, note, noteId){
            _.forEach(note.children, function(childNoteId){
                result[childNoteId] = true;
            });
            return result;
        });

        return _.filter(this.props.notes, function(note, noteId){
            return !childNoteIds[noteId];
        });
    }
}

const NotesSelector = state => state.note.data;

function select(state){
    return {
        notes: NotesSelector(state)
    };
}

export default connect(select)(OutlineViewComponent);