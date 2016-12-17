import 'babel-polyfill';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import reducers from './reducers';

import HomeComponent from './components/HomeComponent.jsx';
import NoteBookComponent from './components/NoteBookComponent.jsx';
import TopologyViewComponent from './components/TopologyViewComponent.jsx';
import OutlineViewComponent from './components/OutlineViewComponent.jsx';
import MindMapViewComponent from './components/MindMapViewComponent.jsx';

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route name='home' path='/xxx' component={HomeComponent} />
            <Route name='notebook' path='/' component={NoteBookComponent}>
                <Route name='topology-view' path='/topology' component={TopologyViewComponent}>
                    <Route name='outline-view' path='/outline' component={OutlineViewComponent} />
                    <Route name='mindmap-view' path='/mindmap' component={MindMapViewComponent} />
                </Route>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('marginnote')
);