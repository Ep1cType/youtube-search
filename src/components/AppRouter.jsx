import React from "react";
import {Route, Routes} from "react-router";

import ResultPage from "../pages/ResultPage/ResultPage";
import FavouritesPage from "../pages/FavouritesPage/FavouritesPage";
import MainPage from "../pages/MainPage/MainPage";
import LayoutPage from "../layout/LayoutPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RequireAuth from "../router/RequireAuth";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage/>}/>
      <Route path="/" element={<RequireAuth>
        <LayoutPage/>
      </RequireAuth>}>
        <Route index element={<MainPage/>}/>
        <Route path="result" element={
          <RequireAuth>
            <ResultPage/>
          </RequireAuth>
        }/>
        <Route path="favourites" element={
          <RequireAuth>
            <FavouritesPage/>
          </RequireAuth>
        }/>
        <Route path="*" element={
          <RequireAuth>
            <ErrorPage/>
          </RequireAuth>
        }/>
      </Route>
    </Routes>
  );
};

export default AppRouter;
