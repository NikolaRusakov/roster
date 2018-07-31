import {actions} from '../actions/infoActions';

const initialState = {
    [actions.AREA_INFO_LIST]: [],
};


export default function app(state = initialState, action) {
    switch (action.type) {
        case actions.AREA_INFO_LIST: {
            state = {
                ...state,
                [actions.AREA_INFO_LIST]: [
                    ...action.payload.data
                ]
            };
            return state;
        }
        default:
            return state;
    }

}
