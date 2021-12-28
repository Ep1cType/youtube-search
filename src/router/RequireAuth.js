import React, {useEffect} from "react";
import {Navigate} from "react-router";
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../store/auth/authActions";

const RequireAuth = ({children}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(authActions.setIsAuth(false));
    }
  }, [])

  if (!isAuth) {
    return <Navigate to="login" state={{from: location}}/>;
  }

  return children;
};

export default RequireAuth;
