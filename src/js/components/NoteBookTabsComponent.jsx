import React, {Component} from 'react';

import TabsComponent from './TabsComponent.jsx';

export default class NoteBookTabsComponent extends Component{
    render(){
        let tabs = [
            {text: 'Outline'},
            {text: 'Mind Map'},
            {text: 'Hybrid'}
        ];

        return (
            <TabsComponent tabs={tabs} />
        );
    }
}