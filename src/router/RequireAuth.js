import React, {useEffect} from "react";
import {Navigate, useNavigate} from "react-router";
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../store/auth/authActions";

const RequireAuth = ({children}) => {
  const isAuth = useSelector(state => state.auth.isAuth);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  debugger;

  if (!isAuth) {
    return <Navigate to="login" state={{from: location}}/>;
  }

  return children;
};

export default RequireAuth;
