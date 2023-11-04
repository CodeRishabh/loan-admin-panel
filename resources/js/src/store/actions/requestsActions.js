import * as actionTypes from './actionTypes';

export const setRequestList = (data) => {
    return {
        type: actionTypes.SET_REQUESTS_LIST,
        data: data
    }
}

export const setApproval = (data) => {
    return {
        type: actionTypes.SET_APPROVAL,
        data: data
    }
}
export const setRejection = (data) => {
    return {
        type: actionTypes.SET_REJECTION,
        data: data
    }
}