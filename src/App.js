import React, {useEffect, useState} from "react";

import AppRouter from "./components/AppRouter";
import {useDispatch} from "react-redux";
import {authActions} from "./store/auth/authActions";
import Loader from "./components/Loader/Loader";

function App() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("token");
      if (token) {
        return token
      } else {
        throw new Error()
      }
    }
    debugger;
    fetchUser()
      .then((token) => {
        const user = localStorage.getItem("user");
        dispatch(authActions.setUser(user));
        dispatch(authActions.setIsAuth(true));
      }).catch((err) => {
        console.log("Ошибка проверки аутентификации")
    }).finally(() => {
      setIsLoading(false);
    })
  }, []);


  if (isLoading) {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Loader />
      </div>
    );
  }


  return (
    <AppRouter/>
  );
}

export default App;
