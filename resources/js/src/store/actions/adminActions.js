import * as actionTypes from './actionTypes';

export const onUpdateAdmin = (data) => {
    return {
        type: actionTypes.ON_UPDATE_ADMIN,
        data: data
    }
}