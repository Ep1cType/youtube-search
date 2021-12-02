import {SET_IS_AUTH, SET_IS_ERROR, SET_IS_LOADING, SET_USER} from "./authTypes";

const initialState = {
  isAuth: false,
  isLoading: false,
  user: '',
  isError: '',
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_IS_AUTH: {
      return {
        ...state,
        isAuth: action.payload
      }
    }
    case SET_IS_LOADING: {
      return {
        ...state,
        isLoading: action.payload
      }
    }
    case SET_USER: {
      return {
        ...state,
        user: action.payload
      }
    }
    case SET_IS_ERROR: {
      return {
        ...state,
        isError: action.payload
      }
    }
    default:
      return state;
  }
}
