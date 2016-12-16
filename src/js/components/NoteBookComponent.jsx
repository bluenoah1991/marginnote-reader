import React, {Component} from 'react';

import NoteBookToolbarComponent from './NoteBookToolbarComponent.jsx';
import NoteBookBottomToolbarComponent from './NoteBookBottomToolbarComponent.jsx';
import NoteBookTabsComponent from './NoteBookTabsComponent.jsx';
import ListComponent from './ListComponent.jsx';
import ListItemComponent from './ListItemComponent.jsx';

export default class NoteBookComponent extends Component{
    render(){
        return (
            <div>
                <div className="fix-top">
                    <NoteBookToolbarComponent className="notebook-toolbar" />
                </div>
                <div className="fix-top-2">
                    <div className="notebook-tabs-box">
                        <NoteBookTabsComponent />
                    </div>
                </div>
                <div className="fix-body">
                    <ListComponent>
                        <ListItemComponent 
                            title="The reasons why students should take note" 
                            color="#e67e22" 
                            number={1} 
                            content={[
                                {type: 'paragraph', text: 'The following list provides a few reasons why note taking is an important activity'},
                                {type: 'image', src: './img/1.png'}
                            ]}>
                            <ListItemComponent 
                                title="tips" 
                                number={1} 
                                content={[
                                    {type: 'paragraph', text: 'The following list provides a few reasons why note taking is an important activity'},
                                    {type: 'image', src: './img/1.png'}
                                ]}>
                                <ListItemComponent 
                                    title="stimulates your ability to recall" 
                                    color="#3498db" 
                                    number={1} 
                                    content={[
                                        {type: 'paragraph', text: 'The following list provides a few reasons why note taking is an important activity'},
                                        {type: 'image', src: './img/1.png'}
                                    ]} />
                                <ListItemComponent 
                                    title="organise the ideas" 
                                    number={1} 
                                    content={[
                                        {type: 'paragraph', text: 'The following list provides a few reasons why note taking is an important activity'},
                                        {type: 'image', src: './img/1.png'}
                                    ]} />
                            </ListItemComponent>
                        </ListItemComponent>
                        <ListItemComponent 
                            title="sq3r" 
                            number={1} 
                            content={[
                                {type: 'paragraph', text: 'The following list provides a few reasons why note taking is an important activity'},
                                {type: 'image', src: './img/1.png'}
                            ]} />
                    </ListComponent>
                </div>
                <div className="fix-bottom">
                    <NoteBookBottomToolbarComponent className="notebook-bottom-toolbar" />
                </div>
            </div>
        );
    }
}