import { ADD_DEVICE, SET_CONNECTED } from '../actions/index';

const initState = {
    devices: []
}

const bleReducers = (state = initState, action) => {
    switch (action.type) {
        case SET_CONNECTED:
            return state;
        case ADD_DEVICE:
            return ({...state, devices: [...state.devices, action.device]});
        default:
            return state;
    }
};

export default bleReducers;