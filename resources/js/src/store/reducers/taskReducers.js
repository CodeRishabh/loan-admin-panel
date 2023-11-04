import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    tasksList: []
}

const setTasks = (state, action) => {
    let TasksList = [...state.tasksList]
    TasksList = action.data
    return updateObject(state, { tasksList: TasksList });
}

const addTask = (state, action) => {
    let TasksList = [...state.tasksList]
    TasksList.push(action.data)
    return updateObject(state, { tasksList: TasksList });
}

const onUpdateTask = (state, action) => {
    let TasksList = [...state.tasksList]
    const index = TasksList.findIndex((task) => task._id === action.id)
    TasksList[index].completed = action.data
    return updateObject(state, { tasksList: TasksList });
}

const onDeleteTask = (state, action) => {
    let TasksList = [...state.tasksList]
    const index = TasksList.findIndex((task) => task._id === action.id)
    TasksList.splice(index, 1)
    return updateObject(state, { tasksList: TasksList });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.SET_TASKS: return setTasks(state, action);
        case actionTypes.ADD_TASKS: return addTask(state, action);
        case actionTypes.ON_UPDATE_TASK: return onUpdateTask(state, action);
        case actionTypes.ON_DELETE_TASK: return onDeleteTask(state, action);
        default:
            return state;
    }
};

export default reducer;