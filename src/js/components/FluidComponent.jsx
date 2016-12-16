import _ from 'lodash';
import React, {Component} from 'react';

export default class FluidComponent extends Component{
    render(){
        let items = _.map(this.props.children, function(child, index){
            if(child.props.orientation == undefined ||
                child.props.orientation == 'left'){
                    return React.cloneElement(child, {
                        key: index,
                        className: child.className || '' + ' ' + 'fluid-left'
                    });
            } else {
                return React.cloneElement(child, {
                    key: index,
                    className: child.className || '' + ' ' + 'fluid-right'
                });
            }
        });

        return (
            <div className={`react fluid ${this.props.className || ''}`}>
                {items}
            </div>
        )
    }
}