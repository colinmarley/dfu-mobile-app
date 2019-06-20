//Device
export const SET_BROWSER = 'SET_BROWSER';

//BLE
export const ADD_DEVICE = 'ADD_DEVICE';
export const SET_CONNECTION_STATUS = 'SET_CONNECTION_STATUS';
export const SET_CONNECTED_DEVICE = 'SET_CONNECTED_DEVICE';

//DFU
export const SET_DFU_STATUS = 'SET_DFU_STATUS';
export const SET_INIT_STATUS = 'SET_INIT_STATUS';
export const SET_FIRMWARE_STATUS = 'SET_FIRMWARE_STATUS';
export const SET_INIT_FILE_URI = 'SET_INIT_FILE_URI';
export const SET_FIRMWARE_FILE_URI = 'SET_FIRMWARE_FILE_URI';
export const SET_INIT_FILE_NAME = 'SET_INIT_FILE_NAME';
export const SET_FIRMWARE_FILE_NAME = 'SET_FIRMWARE_FILE_NAME';




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
export const setDfuStatus = dfuReady => ({
    type: SET_DFU_STATUS,
    dfuReady
});

export const setInitStatus = initSent => ({
    type: SET_INIT_STATUS,
    initSent
});

export const setFirmwareStatus = firmwareSent => ({
    type: SET_FIRMWARE_STATUS,
    firmwareSent
});

export const setInitFileUri = fileUri => ({
    type: SET_INIT_FILE_URI,
    fileUri
});

export const setFirmwareFileUri = fileUri => ({
    type: SET_FIRMWARE_FILE_URI,
    fileUri
});

export const setInitFileName = fileName => ({
    type: SET_INIT_FILE_NAME,
    fileName
});

export const setFirmwareFileName = fileName => ({
    type: SET_FIRMWARE_FILE_NAME,
    fileName
});