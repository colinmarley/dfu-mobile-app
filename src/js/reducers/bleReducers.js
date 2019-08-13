import {
	ADD_DEVICE,
	SET_CONNECTED_DEVICE,
	SET_CONNECTION_STATUS,
	CLEAR_DEVICES,
	SET_INIT_SCAN,
} from '../actions/index';

const initState = {
	devices: [],
	connectedDevice: {
		name: '',
		id: '',
	},
	isConnected: false,
	didInitScan: false
};

const bleReducers = (state = initState, action) => {
	switch (action.type) {
		case SET_CONNECTION_STATUS:
			return { ...state, isConnected: action.isConnected };
		case SET_CONNECTED_DEVICE:
			return { ...state, connectedDevice: action.device };
		case ADD_DEVICE:
			return { ...state, devices: [...state.devices, action.device] };
		case CLEAR_DEVICES:
			return { ...state, devices: [] };
		case SET_INIT_SCAN:
			return { ...state, didInitScan: action.didInitScan };
		default:
			return state;
	}
};

export default bleReducers;
