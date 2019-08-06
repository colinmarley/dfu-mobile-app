//Device
export const SET_BROWSER = 'SET_BROWSER';

//BLE
export const ADD_DEVICE = 'ADD_DEVICE';
export const SET_CONNECTION_STATUS = 'SET_CONNECTION_STATUS';
export const SET_CONNECTED_DEVICE = 'SET_CONNECTED_DEVICE';
export const CLEAR_DEVICES = 'CLEAR_DEVICES';

//DFU
export const SET_DFU_READY = 'SET_DFU_READY';
export const SET_DFU_START = 'SET_DFU_START';
export const SET_DFU_PROGRESS = 'SET_DFU_PROGRESS';
export const SET_DFU_STATUS = "SET_DFU_STATUS";
export const SET_FILE_URI = 'SET_FILE_URI';
export const SET_FILE_NAME = 'SET_FILE_NAME';
export const CLEAR_DFU_FLAGS = 'CLEAR_DFU_FLAGS';




/* Action Creators */
//Device
export const setBrowser = isBrowser => ({
    type: SET_BROWSER,
    isBrowser
});


//BLE
export const setConnectedDevice = device => ({
    type: SET_CONNECTED_DEVICE,
    device
});

export const setConnectionStatus = isConnected => ({
    type: SET_CONNECTION_STATUS,
    isConnected
});

export const addDevice = device => ({
    type: ADD_DEVICE,
    device
});

export const clearDevices = () => ({
    type: CLEAR_DEVICES
});


//DFU
export const setDfuReady = dfuReady => ({
    type: SET_DFU_READY,
    dfuReady
});

export const setDfuStart = dfuStart => ({
    type: SET_DFU_START,
    dfuStart
});

export const setDfuProgress = dfuProgress => ({
    type: SET_DFU_PROGRESS,
    dfuProgress
});

export const setDfuStatus = dfuStatus => ({
    type: SET_DFU_STATUS,
    dfuStatus
});

export const setFileUri = fileUri => ({
    type: SET_FILE_URI,
    fileUri
});

export const setFileName = fileName => ({
    type: SET_FILE_NAME,
    fileName
});

export const clearDfuFlags = () => ({
    type: CLEAR_DFU_FLAGS,
})