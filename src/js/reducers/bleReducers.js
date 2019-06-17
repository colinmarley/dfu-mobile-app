const initState = {
    
}

const bleReducers = (state = initState, action) => {
    switch (action.type) {
        case 'SET_CONNECTED':
            return state;
        default:
            return state;
    }
};

export default bleReducers;