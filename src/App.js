import React, {useEffect, useState} from "react";

import AppRouter from "./components/AppRouter";
import {useDispatch} from "react-redux";
import {authActions} from "./store/auth/authActions";

function App() {

  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    debugger;
    if (localStorage.getItem("token")) {
      const user = localStorage.getItem("user");
      dispatch(authActions.setUser(user));
      dispatch(authActions.setIsAuth(true));
      // setIsLoading(false);
    } else {
      // setIsLoading(false);
    }
    setIsLoading(false);
  }, []);


  if (isLoading) {
    return (
      <div>
        LOADING...
      </div>
    );
  }


  return (
    <AppRouter/>
  );
}

export default App;
