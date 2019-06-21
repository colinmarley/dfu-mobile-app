//Device
export const SET_BROWSER = 'SET_BROWSER';

//BLE
export const ADD_DEVICE = 'ADD_DEVICE';
export const SET_CONNECTION_STATUS = 'SET_CONNECTION_STATUS';
export const SET_CONNECTED_DEVICE = 'SET_CONNECTED_DEVICE';

//DFU
export const SET_DFU_READY = 'SET_DFU_READY';
export const SET_DFU_PROGRESS = 'SET_DFU_PROGRESS';
export const SET_FILE_URI = 'SET_FILE_URI';
export const SET_FILE_NAME = 'SET_FILE_NAME';




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


//DFU
export const setDfuReady = dfuReady => ({
    type: SET_DFU_READY,
    dfuReady
});

export const setDfuProgress = dfuProgress => ({
    type: SET_DFU_PROGRESS,
    dfuProgress
});

export const setFileUri = fileUri => ({
    type: SET_FILE_URI,
    fileUri
});

export const setFileName = fileName => ({
    type: SET_FILE_NAME,
    fileName
});