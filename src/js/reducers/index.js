import { combineReducers } from 'redux';

import deviceReducers from './deviceReducers';
import bleReducers from './bleReducers';
import dfuReducers from './dfuReducers';

const rootReducer = combineReducers({
	device: deviceReducers,
	ble: bleReducers,
	dfu: dfuReducers,
});

export default rootReducer;
