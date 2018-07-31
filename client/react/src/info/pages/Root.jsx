import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import Layout from './Layout';
import ModalDialog from "../components/ModalDialog";

let DevTools;
if (typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__) {
    DevTools = require('../DevTools').default;
}


export default class Root extends React.Component {
    static PropTypes = {
        store: React.PropTypes.object.isRequired
    };

    render() {
        const {store} = this.props;

        return <Provider store={store} key="provider">
            <div className="root-container">
                <BrowserRouter basename={serverContextPath} key="router">
                    <Layout/>
                </BrowserRouter>
                {DevTools && <DevTools key="devtools"/>}
                <ModalDialog/>
            </div>
        </Provider>
    }
}
