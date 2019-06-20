import {
    SET_DFU_STATUS, SET_INIT_STATUS, SET_FIRMWARE_STATUS,
    SET_INIT_FILE_URI, SET_FIRMWARE_FILE_URI
} from '../actions/index';

const initState = {
    dfuReady: false,
    initSent: false,
    firmwareSent: false,
    initFileUri: "",
    firmwareFileUri: ""
}

const dfuReducers = (state = initState, action) => {
    switch (action.type) {
        case SET_DFU_STATUS:
            return ({...state, dfuReady: action.dfuReady});
        case SET_INIT_STATUS:
            return ({...state, initSent: action.initSent});
        case SET_FIRMWARE_STATUS:
            return ({...state, firmwareSent: action.firmwareSent});
        case SET_INIT_FILE_URI:
            return ({...state, initFileUri: action.fileUri});
        case SET_FIRMWARE_FILE_URI:
            return ({...state, firmwareFileUri: action.fileUri});
        default:
            return state;
    }
}

export default dfuReducers;