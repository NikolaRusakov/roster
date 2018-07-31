import React from 'react';
import ReactDOM from 'react-dom';
import Root from './pages/Root';
import {AppContainer} from 'react-hot-loader';
import store from './store/store'
import Redbox from 'redbox-react';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import './scss/component-styles.scss'

class CustomRedbox extends React.Component {
    static PropTypes = {
        error: React.PropTypes.instanceOf(Error).isRequired
    };

    render() {
        const {error} = this.props;
        console.error(error);
        return <Redbox error={error}/>;
    }
}

const render = Component => {
    const MOUNT_POINT = document.getElementById('root');

    ReactDOM.render(
        <AppContainer errorReported={CustomRedbox}>
            <Component store={store}/>
        </AppContainer>,
        MOUNT_POINT
    )
};

render(Root)

if (module.hot) {
    module.hot.accept('./pages/Root', () => render(Root));
}
