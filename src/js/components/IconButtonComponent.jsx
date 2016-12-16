import React, {Component} from 'react';

export default class IconButtonComponent extends Component{
    render(){
        return (
            <a className={`react iconbtn ${this.props.className || ''}`} href="javascript:;" onClick={this.props.onClick}>
                <img src={this.props.src} />
            </a>
        );
    }
}