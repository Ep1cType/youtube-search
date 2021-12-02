import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import authReducer from "./auth/authReducer";
import videosReducer from "./videos/videosReducer";


let reducers = combineReducers({
  auth: authReducer,
  video: videosReducer,
});

export const store = createStore(reducers, applyMiddleware(thunk));
