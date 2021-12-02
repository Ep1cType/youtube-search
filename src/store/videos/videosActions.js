import {
  DELETE_FAVOURITE, EDIT_FAVOURITE,
  SET_FAVOURITE_LIST,
  SET_IS_ERROR,
  SET_IS_LOADING,
  SET_TOTAL_COUNT,
  SET_VIDEO_LIST
} from "./videosTypes";
import VideoService from "../../services/VideoService";

export const videosActions = {
  setVideoList: (payload) => ({type: SET_VIDEO_LIST, payload}),
  setIsLoading: (payload) => ({type: SET_IS_LOADING, payload}),
  setTotalCount: (payload) => ({type: SET_TOTAL_COUNT, payload}),
  deletingFavourite: (payload) => ({type: DELETE_FAVOURITE, payload}),
  editingFavourite: (payload) => ({type: EDIT_FAVOURITE, payload}),
  setFavouriteList: (payload) => ({type: SET_FAVOURITE_LIST, payload}),
  setIsError: (payload) => ({type: SET_IS_ERROR, payload}),
  fetchVideo: (searchValue, maxResult, history) => async (dispatch) => {
    try {
      debugger;
      dispatch(videosActions.setIsError(""));
      debugger
      dispatch(videosActions.setIsLoading(true));
      const response = await VideoService.getVideoList(searchValue, maxResult);
      console.log(response.data);
      dispatch(videosActions.setTotalCount(response.data.pageInfo.totalResults))
      dispatch(videosActions.setVideoList(response.data.items))
      history.push('/result')
    } catch (e) {
    } finally {
      dispatch(videosActions.setIsLoading(false))
    }
  },
  createFavourite: (favourite) => async (dispatch) => {
    try {
      const favourites = localStorage.getItem("favourites") || '[]'
      const json = JSON.parse(favourites);
      json.push(favourite);
      dispatch(videosActions.setFavouriteList(json))
      localStorage.setItem("favourites", JSON.stringify(json))
    } catch (e) {

    } finally {

    }
  },
  fetchFavouriteList: (username) => async (dispatch) => {
    try {
      const favourites = localStorage.getItem("favourites");
      const favouriteList = JSON.parse(favourites);
      console.log(favouriteList)
      const mockFavourite = favouriteList.filter(favourite => favourite.author === username);
      console.log(mockFavourite)
      if (mockFavourite) {
        dispatch(videosActions.setFavouriteList(mockFavourite))

      }
    } catch (e) {

    } finally {

    }
  },
  deleteFavour: (id) => async (dispatch) => {
    try {
      const favourites = localStorage.getItem("favourites");
      const favouriteList = JSON.parse(favourites);
      const mockFavourite = favouriteList.filter(favourite => favourite.id !== id);
      dispatch(videosActions.deletingFavourite(id))
      localStorage.setItem("favourites", JSON.stringify(mockFavourite))
    } catch (e) {

    } finally {
    }
  },
  editFavour: (newFavour, favourId) => async (dispatch) => {
    try {
      const favourites = localStorage.getItem("favourites");
      const favouriteList = JSON.parse(favourites);
      const mockFavourite = favouriteList.map((favourite) => (favourite.id === favourId ? newFavour : favourite ));
      dispatch(videosActions.editingFavourite({newFavour, favourId}))
      localStorage.setItem("favourites", JSON.stringify(mockFavourite));
    } catch (e) {

    } finally {

    }
  }
};
