import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Route, Switch, Redirect} from 'react-router-dom';
import {InfoPage} from './index';
import {INFO_PATH} from '../routes';
import ModalDialog from "../components/ModalDialog";


class Layout extends PureComponent {

    renderApp() {
        return (
            <div>
                <ModalDialog/>
                    <Switch>
                        <Route path={INFO_PATH} component={InfoPage}/>
                        <Route component={() => <Redirect to={INFO_PATH}/>}/>
                    </Switch>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderApp()}
            </div>
        );
    }
}


export default connect(null)(Layout);
