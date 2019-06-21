import {
    SET_DFU_READY, SET_DFU_PROGRESS, SET_FILE_URI, SET_FILE_NAME
} from '../actions/index';

const initState = {
    dfuReady: false,
    dfuProgress: 0,
    fileName: "",
    fileUri: "",
}

const dfuReducers = (state = initState, action) => {
    switch (action.type) {
        case SET_DFU_READY:
            return ({...state, dfuReady: action.dfuReady});
        case SET_DFU_PROGRESS:
            return ({...state, dfuProgress: action.dfuProgress});
        case SET_FILE_URI:
            console.log("setFileUri: ", action.fileUri);
            return ({...state, fileUri: action.fileUri});
        case SET_FILE_NAME:
            return ({...state, fileName: action.fileName});
        default:
            return state;
    }
}

export default dfuReducers;