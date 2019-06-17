import { SET_BROWSER } from '../actions/index'; 

const initState = {
    isBrowser: false
}

const deviceReducers = (state = initState, action) => {
    switch (action.type) {
        case SET_BROWSER:
            return ({...state, isBrowser: action.isBrowser});
        default:
            return state;
    }
}

export default deviceReducers;