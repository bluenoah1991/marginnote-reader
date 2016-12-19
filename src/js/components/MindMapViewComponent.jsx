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

    createNode(opts){
        let container = this._createContainer();
        container.append(this._createHeader(opts.name, opts.serial));
        opts.items.forEach(function(item){
            if(item.type == 'image'){
                container.append(this._createImage(item.src));
            } else if(item.type == 'paragraph'){
                container.append(this._createParagraph(item.text));
            }
        }.bind(this));
        return container;
    }

    _updateCanvas(){
        // Drawing a Node
        var node = new Node({
            element: this.createNode({
            name: 'General Tips',
            serial: 11,
            items: [
                {type: 'image', src: './img/1.png'},
                {type: 'paragraph', text: 'These methods of note taking are generally time consuming and ineffective and there is an easier way!'}
            ]
        })});

        this.scene.addBox(node.box, 20, 20, 0);

        for(var i = 0; i < 2; i++){
            var childnode = new Node();
            node.addChildNode(childnode);
            for(var i_ = 0; i_ < 2; i_++){
                var childnode_ = new Node();
                childnode.addChildNode(childnode_);
                var childnode2_ = new Node();
                childnode_.addChildNode(childnode2_);
            }
        }
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

const NotesSelector = state => state.notebook.notes;

function select(state){
    return {
        notes: NotesSelector(state)
    };
}

export default connect(select)(MindMapViewComponent);