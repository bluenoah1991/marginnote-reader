import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import MindMap from 'mindmap.js';

class MindMapViewComponent extends Component{
    render(){
        return (
            <canvas className="react mindmap" id="mindmap"></canvas>
        );
    }

    _createContainer(){
        let element = $('<div />');
        element.addClass('mindmap-node');
        return element;
    }

    _createHeader(text, serial){
        let element = $('<p />');
        element.addClass('header');
        element.text(text);
        if(serial != undefined){
            let serialElement = $('<span />');
            serialElement.addClass('serial');
            serialElement.text(serial);
            element.append(serialElement);
        }
        return element;
    }

    // Create Item

    _createImage(src){
        let element = $('<img />', {
            src: src
        });
        element.addClass('item');
        element.addClass('image');
        return element;
    }

    _createParagraph(text){
        let element = $('<p />');
        element.addClass('item');
        element.addClass('paragraph');
        element.text(text);
        return element;
    }

    _createNode(opts){
        let name = opts.name || 'unknown';
        let serial = opts.serial || 0;
        let items = opts.items || [];

        let container = this._createContainer();
        container.append(this._createHeader(name, serial));
        items.forEach(function(item){
            if(item.type == 'image'){
                container.append(this._createImage(item.src));
            } else if(item.type == 'paragraph'){
                container.append(this._createParagraph(item.text));
            }
        }.bind(this));
        return container;
    }

    _createNodeFromData(note){
        let element = this._createNode({
            name: note.title
        });

        let node = new Node({
            element: element
        });
        return node;
    }

    _calcPos(note){
        if(note.mindpos){
            let [x, y] = note.mindpos;
            return [x / 4, y / 4];
        } else {
            return null;
        }
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

    _drawChildNodes(parentNode, parentNote){
        let childNotes = _(parentNote.children).map(function(noteId){
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

        _.forEach(childNotes, function(note){
            let node = this._createNodeFromData(note);
            parentNode.addChildNode(node);
            this._drawChildNodes(node, note);
        }.bind(this));
    }

    _updateCanvas(){
        if(this.props.notes == undefined){
            return;
        }

        let rootNotes = this._findRootNotes();

        for(var i in rootNotes){
            let rootNote = rootNotes[i];
            let rootNode = this._createNodeFromData(rootNote);
            let pos = this._calcPos(rootNote);
            if(pos == undefined){
                continue;
            }
            this.scene.addBox(rootNode.box, pos[0], pos[1], 0);
            this._drawChildNodes(rootNode, rootNote);
        }

        // Drawing a Node

        // var node = new Node({
        //     element: this._createNode({
        //     name: 'General Tips',
        //     serial: 11,
        //     items: [
        //         {type: 'image', src: './img/1.png'},
        //         {type: 'paragraph', text: 'These methods of note taking are generally time consuming and ineffective and there is an easier way!'}
        //     ]
        // })});
    }

    componentDidUpdate(){
        this._updateCanvas();
    }

    componentDidMount(){
        // adjust dpi
        let canvas = document.getElementById('mindmap');
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        this.scene = new Scene('mindmap', {
            infinity: true
        });
        this._updateCanvas();
    }

    componentWillUnmount(){
        this.scene.close();
    }
}

const NotesSelector = state => state.note.data;

function select(state){
    return {
        notes: NotesSelector(state)
    };
}

export default connect(select)(MindMapViewComponent);