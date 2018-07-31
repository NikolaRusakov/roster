import {HIDE, SHOW, CHANGE_SIZE, CHANGE_TITLE} from './ModalActions'

const initialState = {
    components: [],
    customSize: [],
};

export function modalDialog(state = initialState, action) {
    console.log(state);
    switch (action.type) {
        case SHOW:
            return {
                ...state,
                components: [
                    ...state.components,
                    {
                        component: action.component,
                        componentProps: action.componentProps,
                        title: action.title,
                        modalProps: action.modalProps,
                    }
                ],
                customSize: [
                    ...state.customSize,
                    null
                ]
            };
        case HIDE:
            return {
                ...state,
                components: [
                    ...state.components.slice(0, state.components.length - 1)
                ],
                customSize: [
                    ...state.customSize.slice(0, state.components.length - 1)
                ]
            };
        case CHANGE_SIZE:
            return {
                ...state,
                customSize: [
                    ...state.customSize.slice(0, state.components.length - 1),
                    action.size
                ]
            };
            break;
        case CHANGE_TITLE:
            return {
                ...state,
                components: [
                    ...state.components.slice(0, state.components.length - 1),
                    {
                        ...state.components[state.components.length - 1],
                        title: action.title
                    }
                ],
            };
            break;
        default:
            return state
    }
}
