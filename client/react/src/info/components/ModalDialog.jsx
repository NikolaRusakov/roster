import React from 'react';
import {connect} from 'react-redux';
import AbstractReactComponent from './AbstractReactComponent';
import {hide} from '../reducers/ModalActions';
import {Modal, ModalHeader} from "reactstrap";
import classNames from 'classnames';
import CustomModal from "./CustomModal";

const CLOSE_CLOSE = "CLOSE_CLOSE";

const DIALOG_ZINDEX = 1050;

class ModalDialog extends AbstractReactComponent {

    static childContextTypes = {
        isModal: React.PropTypes.bool.isRequired
    };

    componentDidMount() {
        this.backdropNode = document.createElement('div');
    }

    componentWillReceiveProps(nextProps) {
        const {modalDialog: {components}} = nextProps;
        switch (components.length) {
            case 0:
                this.backdropNode.className = "";
                break;
            default:
                if (components.length === 1 && components[0].modalProps.noBackdrop) {
                } else {
                    document.body.appendChild(this.backdropNode);
                    this.backdropNode.style.zIndex = DIALOG_ZINDEX;
                    if (this.props.modalDialog.components.length === 0 && components.length === 1) {
                        this.backdropNode.className = "modal-backdrop backdrop-fade-init";
                        setTimeout(() => {
                            this.backdropNode.className = "modal-backdrop fade show";
                        }, 1);
                    }
                }
                break;
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const {modalDialog: {components}} = this.props;
        if (components.length > 0) {
            let index = components.length - 1;
            while (index > 0) {
                if (!components[index].modalProps.noBackdrop) {
                    break;
                }
                index--;
            }

            const cls = "dialog-top-wrapper-" + index;
            const el = document.getElementsByClassName(cls)[0];
            document.body.insertBefore(this.backdropNode, el);
        }

    }

    getChildContext() {
        return {isModal: true};
    }

    handleClose = (e) => {
        const {modalDialog: {components}} = this.props;
        const c = components[components.length - 1];
        const {onClose, ...otherModalProps} = c.componentProps || {};

        let defaultPrevented = false;
        onClose && onClose({
            ...e,
            preventDefault: () => {
                defaultPrevented = true;
                e && e.preventDefault();
            }
        });
        if (!defaultPrevented) {
            this.props.dispatch(hide());
        }
    };

    handleToggle = (e) => {
        this.handleClose(e);
    };

    render() {
        const {dispatch, className, modalDialog: {components, customSize}} = this.props;
        let modalDialogClassName = className;

        if (components.length === 0) {
            return <div></div>;
        }

        const dialogs = components.map((c, index) => {
            const {size, className, noHeader, ...otherModalProps} = c.modalProps;
            let useSize = customSize[index] || size;
            const modalCls = classNames(
                modalDialogClassName,
                className,
                {
                    "dialog-lg": useSize && useSize === "full",
                    [`modal-dialog-${useSize}`]: useSize
                }
            );

            const topModal = index == components.length - 1;

            return (
                <CustomModal
                    isOpen={true}
                    topWrapperClassName={`dialog-top-wrapper-${index}`}
                    backdrop={false}
                    zIndex={DIALOG_ZINDEX}
                    keyboard={true}
                    key={index}
                    wrapClassName={topModal ? "modal-top" : "modal-bottom"}
                    modalClassName="modal-fade-wrapper"
                    className={modalCls}
                    ref={`modal${index}`}
                    toggle={this.handleToggle}
                    {...otherModalProps}
                >
                    {!noHeader && <ModalHeader toggle={this.handleClose}>
                        {c.title}
                    </ModalHeader>}
                    <c.component isDialog={true} {...c.componentProps} onClose={this.handleClose}/>
                </CustomModal>
            )
        });

        return (
            <div className="dialogs-container">
                {dialogs}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        modalDialog: state.modalDialog
    }
}

export default connect(mapStateToProps)(ModalDialog);
