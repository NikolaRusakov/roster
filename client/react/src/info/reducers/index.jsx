import {combineReducers} from 'redux';
import app from './app';
import {modalDialog} from './modalReducer';

export default combineReducers({
    modalDialog: modalDialog,
    app,
});
