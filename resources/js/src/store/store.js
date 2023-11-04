import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import adminReducers from '../store/reducers/adminReducers'
import requestReducers from '../store/reducers/requestReducers'
import taskReducers from '../store/reducers/taskReducers'
import thunk from 'redux-thunk';

const initialState = {};
const reducer = combineReducers({
    adminReducers, 
    requestReducers, 
    taskReducers,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;