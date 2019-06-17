//Device
export const SET_BROWSER = 'SET_BROWSER';

//BLE
export const ADD_DEVICE = 'ADD_DEVICE';
export const SET_CONNECTION_STATUS = 'SET_CONNECTION_STATUS';
export const SET_CONNECTED_DEVICE = 'SET_CONNECTED_DEVICE';




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