import React from "react";

import s from "./LoginPage.module.scss";

import logo from "../../assets/icons/sibdev-logo.svg";

import {Input, Form, Button, Checkbox} from "antd";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../store/auth/authActions";

const LoginPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {isLoading, isAuth, isError} = useSelector(state => state.auth)

  const onFinish = (values) => {
    console.log("Success:", values);
    const {username, password} = values;
    dispatch(authActions.login({history, username, password}))
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={s.loginPage}>
      <div className={s.loginPage__content}>
        <div className={s.logo}>
          <img src={logo} alt="sibdev" className={s.logo__img}/>
        </div>
        <h2>Вход</h2>
        {isError}
        <Form
          name="basic"
          initialValues={{remember: true}}
          layout={"vertical"}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
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
