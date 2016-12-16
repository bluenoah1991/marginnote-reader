import React, {Component} from 'react';

export default class ListComponent extends Component{
    render(){
        return (
            <div className="react list">
                {this.props.children}
            </div>
        );
    }
}