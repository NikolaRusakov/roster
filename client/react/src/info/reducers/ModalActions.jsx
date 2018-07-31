import React from 'react';
import {connect} from 'react-redux';

export const SHOW = 'ModalDialog.show';
export const HIDE = 'ModalDialog.hide';
export const CHANGE_SIZE = 'ModalDialog.changeSize';
export const CHANGE_TITLE = 'ModalDialog.changeTitle';

export function show(component, componentProps, title, modalProps = {}) {
    console.log(component);
    console.log(componentProps);
    return {
        type: SHOW,
        component: component,
        componentProps: componentProps,
        title: title,
        modalProps: modalProps
    }
}

export function hide() {
    return (dispatch, getState) => {
        if (getState().modalDialog.components.length > 0) {
            dispatch({
                type: HIDE,
            })
        }
    }
}
