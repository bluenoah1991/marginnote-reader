import React, {Component} from 'react';

import MindMap from 'mindmap.js';

export default class MindMapViewComponent extends Component{
    render(){
        return (
            <canvas className="react mindmap" id="mindmap"></canvas>
        );
    }

    componentDidMount(){
        // adjust dpi
        let canvas = document.getElementById('mindmap');
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        var scene = this.scene = new Scene('mindmap', {
            infinity: true
        });

        var serial = 0;

        // Drawing a Node
        var node = new Node({
            name: 'General Tips',
            serial: ++serial,
            items: [
                {type: 'image', src: './img/1.png'},
                {type: 'paragraph', text: 'These methods of note taking are generally time consuming and ineffective and there is an easier way!'}
            ]
        });

        scene.addBox(node.box, 20, 20, 0);

        for(var i = 0; i < 2; i++){
            var childnode = new Node({
                name: 'General Tips',
                serial: ++serial,
                items: [
                    {type: 'image', src: './img/1.png'},
                    {type: 'paragraph', text: 'These methods of note taking are generally time consuming and ineffective and there is an easier way!'}
                ]
            });
            node.addChildNode(childnode);
            for(var i_ = 0; i_ < 2; i_++){
                var childnode_ = new Node({
                    name: 'General Tips',
                    serial: ++serial,
                    items: [
                        {type: 'paragraph', text: 'These methods of note taking are generally time consuming and ineffective and there is an easier way!'}
                    ]
                });
                childnode.addChildNode(childnode_);
                var childnode2_ = new Node({
                    name: 'General Tips',
                    serial: ++serial,
                    items: [
                        {type: 'paragraph', text: 'These methods of note taking are generally time consuming and ineffective and there is an easier way!'}
                    ]
                });
                childnode_.addChildNode(childnode2_);
            }
        }
    }

    componentWillUnmount(){
        this.scene.close();
    }
}