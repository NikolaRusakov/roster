import React from 'react';
import AbstractReactComponent from './AbstractReactComponent';
import {hide,show} from '../reducers/ModalActions'
import {Button, Modal} from 'reactstrap';

export default class AbstractModal extends AbstractReactComponent {
    handleDialogClose = () => {
        const {submitting} = this.props;

        !submitting && this.props.dispatch(hide())
    };

    content = () => {
        return (
            <div>
                {this.body()}
                {this.footer()}
            </div>
        )
    }


    render() {
        const {dialogTitle} = this.props;

        return (
            <div>
                {this.header(dialogTitle)}
                {this.content()}
            </div>
        )
    }

    body = () => {
        return (
            <Modal.Body>...dialog body...</Modal.Body>
        )
    }

    header = (title) => {
        return (
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
        )
    }

    footer = (saveTitle = 'accept') => {
        const {pristine, submitting} = this.props;
        return <Modal.Footer>
            <Button color="success" type="submit" disabled={pristine || submitting}>
                {/*<Icon icon='check'/> */}
                {saveTitle}
            </Button>
            <Button color="danger" disabled={submitting} onClick={this.handleDialogClose}><Icon icon='times'/> Close</Button>
        </Modal.Footer>
    }
}
