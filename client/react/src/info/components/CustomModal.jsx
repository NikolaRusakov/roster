import React from 'react';
import {Modal} from "reactstrap";
import {
    getOriginalBodyPadding,
    conditionallyUpdateScrollbar,
    mapToCssModules,
} from 'reactstrap/lib/utils';
import classNames from 'classnames';

export default class CustomModal extends Modal {
    static propTypes = {
        topWrapperClassName: React.PropTypes.string,
    };

    show = () => {
        const {topWrapperClassName} = this.props;
        const classes = document.body.className;
        this._element = document.createElement('div');
        this._element.setAttribute('tabindex', '-1');

        // this._element.style.position = 'relative';   // vyvarovat se
        if (topWrapperClassName) {
            this._element.className = topWrapperClassName;
        }

        this._element.style.zIndex = this.props.zIndex;
        this.originalBodyPadding = getOriginalBodyPadding();

        conditionallyUpdateScrollbar();

        document.body.appendChild(this._element);

        document.body.className = mapToCssModules(classNames(
            classes,
            'modal-open'
        ), this.props.cssModule);

        this.renderIntoSubtree();
    }
}
