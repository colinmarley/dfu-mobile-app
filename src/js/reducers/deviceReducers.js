import { SET_BROWSER, SET_FS_ACCESS } from '../actions/index';

const initState = {
	isBrowser: false,
	hasFSAccess: false
};

const deviceReducers = (state = initState, action) => {
	switch (action.type) {
		case SET_BROWSER:
			return { ...state, isBrowser: action.isBrowser };
		case SET_FS_ACCESS:
			return { ...state, hasFSAccess: action.hasFSAccess };
		default:
			return state;
	}
};

export default deviceReducers;
