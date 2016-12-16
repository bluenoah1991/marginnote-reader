import React, {Component} from 'react';

import FluidComponent from './FluidComponent.jsx';
import IconButtonComponent from './IconButtonComponent.jsx';

export default class NoteBookBottomToolbarComponent extends Component{
    render(){
        return (
            <FluidComponent className={this.props.className}>
                <IconButtonComponent src="./img/undo-100.png" />
                <IconButtonComponent src="./img/redo-100.png" />
                <IconButtonComponent src="./img/sorting-arrows-100.png" />
            </FluidComponent>
        );
    }
}