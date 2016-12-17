import React, {Component} from 'react';

import TabsComponent from './TabsComponent.jsx';

export default class NoteBookTabsComponent extends Component{
    render(){
        let tabs = [
            {text: 'Outline', href: '#/outline'},
            {text: 'Mind Map', href: '#/mindmap'},
            {text: 'Hybrid'}
        ];

        return (
            <TabsComponent tabs={tabs} />
        );
    }
}