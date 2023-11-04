import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    adminDetails: []
}

const onUpdateAdmin = (state, action) => {
    let AdminDetail = [...state.adminDetails]
    AdminDetail = action.data
    return updateObject(state, { adminDetails: AdminDetail });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.ON_UPDATE_ADMIN: return onUpdateAdmin(state, action);
        default:
            return state;
    }
};

export default reducer;