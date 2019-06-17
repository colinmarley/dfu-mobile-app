//Device
export const SET_BROWSER = 'SET_BROWSER';

//BLE
export const ADD_DEVICE = 'ADD_DEVICE';
export const SET_CONNECTED = 'SET_CONNECTED';




/* Action Creators */
//Device
export const setBrowser = isBrowser => ({
    type: SET_BROWSER,
    isBrowser
});


//BLE
export const setConnected = isConnected => ({
    type: SET_CONNECTED,
    isConnected
});

export const addDevice = device => ({
    type: ADD_DEVICE,
    device
});