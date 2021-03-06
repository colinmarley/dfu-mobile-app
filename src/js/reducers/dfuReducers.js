import {
	SET_DFU_READY,
	SET_DFU_PROGRESS,
	SET_FILE_URI,
	SET_FILE_NAME,
	SET_DFU_START,
	SET_DFU_STATUS,
	CLEAR_DFU_FLAGS,
} from '../actions/index';

const initState = {
	dfuReady: false,
	dfuStart: false,
	dfuProgress: 0,
	dfuStatus: '',
	fileName: '',
	fileUri: '',
};

const dfuReducers = (state = initState, action) => {
	switch (action.type) {
		case SET_DFU_READY:
			return { ...state, dfuReady: action.dfuReady };
		case SET_DFU_START:
			return { ...state, dfuStart: action.dfuStart };
		case SET_DFU_PROGRESS:
			return { ...state, dfuProgress: action.dfuProgress };
		case SET_DFU_STATUS:
			return { ...state, dfuStatus: action.dfuStatus };
		case SET_FILE_URI:
			return { ...state, fileUri: action.fileUri };
		case SET_FILE_NAME:
			return { ...state, fileName: action.fileName };
		case CLEAR_DFU_FLAGS:
			return {
				...state,
				dfuReady: false,
				dfuStart: false,
				dfuProgress: 0,
				dfuStatus: '',
				fileName: '',
				fileUri: '',
			};
		default:
			return state;
	}
};

export default dfuReducers;
