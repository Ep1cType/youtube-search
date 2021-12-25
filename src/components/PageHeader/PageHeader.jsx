import React from "react";
import {useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";

import {Layout, Menu} from "antd";

import {authActions} from "../../store/auth/authActions";

import logo from "../../assets/icons/sibdev-logo.svg";

const {Header} = Layout;

const PageHeader = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {pathname} = useLocation();

  const selectedKey = pathname === "/result" ? "/" : pathname;

  const handleRoute = (route) => {
    return () => {
      navigate(route)
    };
  };

  const handleExit = () => {
    return () => {
      dispatch(authActions.logout());
    };
  };

  return (
    <Header style={{display: "flex", backgroundColor: "#ffffff", justifyContent: "space-between", padding: '0 300px'}}>
      <div style={{display: "flex"}}>
        <img src={logo} alt="Sibdev"/>
        <Menu theme="white" mode="horizontal" defaultSelectedKeys={[`${selectedKey}`]}>
          <Menu.Item key="/" onClick={handleRoute("/")}>Поиск</Menu.Item>
          <Menu.Item key="/favourites" onClick={handleRoute("/favourites")}>Избранное</Menu.Item>
        </Menu>
      </div>
      <Menu theme="white" mode="horizontal">
        <Menu.Item onClick={handleExit()} key="1">Выйти</Menu.Item>
      </Menu>
    </Header>
  );
};

export default PageHeader;
