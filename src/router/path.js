import MainPage from "../pages/MainPage/MainPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import {LOGIN_ROUTE, MAIN_ROUTE} from './pathTypes';
import LayoutPage from "../layout/LayoutPage";

export const routes = [
  {
    exact: true,
    path: LOGIN_ROUTE,
    component: LoginPage
  },
  {
    exact: false,
    path: MAIN_ROUTE,
    component: LayoutPage
  }
]
