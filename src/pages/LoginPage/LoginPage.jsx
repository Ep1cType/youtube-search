import React, {useEffect} from "react";

import s from "./LoginPage.module.scss";

import logo from "../../assets/icons/sibdev-logo.svg";

import {Input, Form, Button, Checkbox} from "antd";
// import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../store/auth/authActions";
import {videosActions} from "../../store/videos/videosActions";
import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router";
import AuthService from "../../services/AuthService";

const LoginPage = () => {
  // const history = useHistory();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isLoading, isAuth, isError} = useSelector(state => state.auth);
  const fromPage = location.state?.from?.pathname || "/";

  // const location = useLocation();
  // const dispatch = useDispatch();
  // const navigation = useNavigate();
  debugger;

  // useEffect(() => {
  //   debugger;
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     const user = localStorage.getItem("user");
  //     dispatch(authActions.setUser(user));
  //     dispatch(authActions.setIsAuth(true));
  //     navigate(fromPage, {replace: true});
  //   }
  // }, [])


  useEffect(() => {
    dispatch(videosActions.setIsError(""));
  }, []);

  const onFinish = async (values) => {
    const {username, password} = values;
    const response = await AuthService.getUsers();
    const mockUser = response.data.find(user => user.username === username && user.password === password);
    if (mockUser) {
      localStorage.setItem('token', Math.random().toString(25).substring(2));
      localStorage.setItem('user', mockUser.username)
      console.log(mockUser)
      dispatch(authActions.setUser(mockUser.username))
      dispatch(authActions.setIsAuth(true))
      navigate(fromPage, {replace: true});
      // dispatch(authActions.login({navigate, fromPage, username, password}));
    }
  }

  return (
    <div className={s.loginPage}>
      <div className={s.loginPage__content}>
        <div className={s.logo}>
          <img src={logo} alt="sibdev" className={s.logo__img}/>
        </div>
        <h2>Вход</h2>
        {isError && <span>{isError}</span>}
        <Form
          name="basic"
          initialValues={{remember: true}}
          layout={"vertical"}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Логин"
            name="username"
            rules={[{required: true, message: "Пожалуйста введите свой логин!"}]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="Пароль"
            name="password"
            rules={[{required: true, message: "Пожалуйста введите свой пароль!"}]}
          >
            <Input.Password/>
          </Form.Item>
          <Form.Item wrapperCol={{offset: 8, span: 16}}>
            <Button loading={isLoading} type="primary" htmlType="submit">
              Войти
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
