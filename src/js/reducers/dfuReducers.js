import { SET_DFU_STATUS, SET_INIT_STATUS, SET_FIRMWARE_STATUS } from '../actions/index';

const initState = {
    dfuReady: false,
    initSent: false,
    firmwareSent: false
}

const dfuReducers = (state = initState, action) => {
    switch (action.type) {
        case SET_DFU_STATUS:
            return ({...state, dfuReady: action.dfuReady});
        case SET_INIT_STATUS:
            return ({...state, initSent: action.initSent});
        case SET_FIRMWARE_STATUS:
            return ({...state, firmwareSent: action.firmwareSent});
        default:
            return state;
    }
}

export default dfuReducers;