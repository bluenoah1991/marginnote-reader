import React, {Component} from 'react';

export default class TabsComponent extends Component{
    render(){
        let items = _.map(this.props.tabs, function(tab, index){
            return (
                <li key={index}>
                    <a href={tab.href}>{tab.text}</a>
                </li>
            );
        });

        return (
            <ul className={`react tabs ${this.props.className || ''}`}>
                {items}
            </ul>
        );
    }
}