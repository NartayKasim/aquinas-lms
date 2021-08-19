import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import userReducer from './user/userReducer';
import courseReducer from './course/courseReducer';
import thunk from 'redux-thunk';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    user: userReducer,
    courses: courseReducer
})

export default createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunk))
)