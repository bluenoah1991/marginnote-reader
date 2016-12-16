import _ from 'lodash';
import React, {Component} from 'react';

export default class ListItemComponent extends Component{
    render(){
        let items = _.map(this.props.content, function(item, index){
            switch(item.type){
                case 'paragraph':
                    return <p key={index}>{item.text}</p>;
                case 'image':
                    return <img key={index} src={item.src} />
            }
        });

        let has_children = false;
        if(this.props.children != undefined){
            has_children = true;
        }

        return (
            <div className="react listitem" style={{borderRightColor: this.props.color}}>
                <p className={`title ${has_children ? 'has-children' : ''}`}>{this.props.title}</p>
                <div className="content">
                    {items}
                </div>
                <span className="serial" style={{
                    borderColor: this.props.color,
                    color: this.props.color
                }}>{this.props.number}</span>
                <div className="children">
                    {this.props.children}
                </div>
            </div>
        );
    }
}