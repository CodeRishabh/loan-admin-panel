import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    requestList: []
}

const setRequestList = (state, action) => {
    let RequestList = [...state.requestList]
    RequestList = action.data
    return updateObject(state, { requestList: RequestList });
}

const setApproval = (state, action) => {
    let RequestList = [...state.requestList]
    const index = RequestList.findIndex((request) => request._id === action.data)
    RequestList[index].approval = true
    return updateObject(state, { requestList: RequestList });
}
const setRejection = (state, action) => {
    let RequestList = [...state.requestList]
    const index = RequestList.findIndex((request) => request._id === action.data)
    RequestList[index].approval = false
    return updateObject(state, { requestList: RequestList });
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_REQUESTS_LIST: return setRequestList(state, action);
        case actionTypes.SET_APPROVAL: return setApproval(state, action);
        case actionTypes.SET_REJECTION: return setRejection(state, action);
        default:
            return state;
    }
};

export default reducer;