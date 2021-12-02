import {SET_IS_AUTH, SET_IS_ERROR, SET_IS_LOADING, SET_USER} from "./authTypes";
import AuthService from "../../services/AuthService";

export const authActions = {
  setIsAuth: (payload) => ({type: SET_IS_AUTH, payload}),
  setUser: (payload) => ({type: SET_USER, payload}),
  setIsLoading: (payload) => ({type: SET_IS_LOADING, payload}),
  setIsError: (payload) => ({type: SET_IS_ERROR, payload}),
  login: (payload) => async (dispatch) => {
    try {
      dispatch(authActions.setIsLoading(true));
      dispatch(authActions.setIsError(""));
      const {username, password, history} = payload;
      const response = await AuthService.getUsers();
      const mockUser = response.data.find(user => user.username === username && user.password === password);
      if (mockUser) {
        localStorage.setItem('token', Math.random().toString(25).substring(2));
        localStorage.setItem('user', mockUser.username)
        console.log(mockUser)
        dispatch(authActions.setUser(mockUser.username))
        dispatch(authActions.setIsAuth(true))
        history.push('/');
      } else {
        dispatch(authActions.setIsError("Неправильный логин или пароль."))
      }
    } catch (e) {
      dispatch(authActions.setIsError("Ошибка при попытке входа."))
    } finally {
      dispatch(authActions.setIsLoading(false))
    }
  },
  logout: (history) => async (dispatch) => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    dispatch(authActions.setUser({}))
    dispatch(authActions.setIsAuth(false))
    history.push("/login")
  }
}
