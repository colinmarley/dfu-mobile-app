import { combineReducers } from 'redux';

import deviceReducers from './deviceReducers';
import bleReducers from './bleReducers';

const rootReducer = combineReducers({
    device: deviceReducers,
    ble: bleReducers
});

export default rootReducer;
