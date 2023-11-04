import * as actionTypes from './actionTypes';

export const setTasks = (data) => {
    return {
        type: actionTypes.SET_TASKS,
        data: data
    }
}

export const addTask = (data) => {
    return {
        type: actionTypes.ADD_TASKS,
        data: data
    }
}

export const onUpdateTask = (id, data) => {
    return {
        type: actionTypes.ON_UPDATE_TASK,
        id: id,
        data: data
    }
}

export const onDeleteTask = (id) => {
    return {
        type: actionTypes.ON_DELETE_TASK,
        id: id,
    }
}