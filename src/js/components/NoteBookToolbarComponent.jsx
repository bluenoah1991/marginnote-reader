import React, {Component} from 'react';

import FluidComponent from './FluidComponent.jsx';
import IconButtonComponent from './IconButtonComponent.jsx';
import IconButtonGroupComponent from './IconButtonGroupComponent.jsx';

export default class NoteBookToolbarComponent extends Component{
    render(){
        return (
            <FluidComponent className={this.props.className}>
                <IconButtonComponent src="./img/back-100.png" />
                <IconButtonGroupComponent>
                    <IconButtonComponent src="./img/literature-100.png" />
                    <IconButtonComponent src="./img/navigation-toolbar-left-100.png" />
                    <IconButtonComponent src="./img/mindmap-100.png" />
                </IconButtonGroupComponent>
            </FluidComponent>
        );
    }
}