import React, {Component} from 'react';

import TabsComponent from './TabsComponent.jsx';

export default class NoteBookTabsComponent extends Component{
    render(){
        let tabs = [
            {text: 'Outline', href: `#/notebook/${this.props.noteBookId}/outline`},
            {text: 'Mind Map', href: `#/notebook/${this.props.noteBookId}/mindmap`},
            {text: 'Hybrid'}
        ];

        return (
            <TabsComponent tabs={tabs} />
        );
    }
}