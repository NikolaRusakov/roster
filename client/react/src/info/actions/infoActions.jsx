
export const actions = {
    AREA_INFO_LIST: "infoList",
    SHOW_MODAL: "SHOW_MODAL",
    HIDE_MODAL: "HIDE_MODAL"
}

export function infoListFetch(payload) {
    return {
        type: actions.AREA_INFO_LIST,
        payload
    }
}

export const showModal = ({modalProps, modalType}) => dispatch => {
    dispatch({
        type: actions.SHOW_MODAL,
        modalProps,
        modalType
    });
}

export const hideModal = () => dispatch => {
    dispatch({
        type: actions.HIDE_MODAL
    });
}
