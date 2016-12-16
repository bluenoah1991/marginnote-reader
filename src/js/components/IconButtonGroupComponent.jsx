import React, {Component} from 'react';

export default class IconButtonGroupComponent extends Component{
    render(){
        return (
            <div className={`react iconbtn-group ${this.props.className || ''}`}>
                {this.props.children}
            </div>
        );
    }
}