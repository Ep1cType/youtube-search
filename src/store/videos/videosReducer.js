import {
  DELETE_FAVOURITE, EDIT_FAVOURITE,
  SET_FAVOURITE_LIST,
  SET_IS_ERROR,
  SET_IS_LOADING,
  SET_TOTAL_COUNT,
  SET_VIDEO_LIST
} from "./videosTypes";

const initialState = {
  isLoading: false,
  isError: '',
  videoList: [],
  totalCount: 0,
  favouriteList: [],
}

export default function videosReducer(state = initialState, action) {
  switch (action.type) {
    case SET_IS_LOADING : {
      return {
        ...state,
        isLoading: action.payload
      }
    }
    case SET_VIDEO_LIST: {
      return {
        ...state,
        videoList: action.payload
      }
    }
    case SET_IS_ERROR: {
      return {
        ...state,
        isError: action.payload
      }
    }
    case SET_TOTAL_COUNT: {
      return {
        ...state,
        totalCount: action.payload
      }
    }
    case SET_FAVOURITE_LIST: {
      return {
        ...state,
        favouriteList: action.payload
      }
    }
    case DELETE_FAVOURITE: {
      return {
        ...state,
        favouriteList: state.favouriteList.filter(favourite => favourite.id !== action.payload)
      }
    }
    case EDIT_FAVOURITE: {
      return {
        ...state,
        favouriteList: state.favouriteList.map((favourite) => (favourite.id === action.payload.favourId ? action.payload.newFavour : favourite))
      }
    }
    default:
      return state;
  }
}
