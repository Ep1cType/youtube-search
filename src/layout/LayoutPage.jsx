import React, {useEffect, useState} from "react";
import {Outlet} from "react-router";
// import {Route, useHistory} from "react-router-dom";

import s from "../pages/LoginPage/LoginPage.module.scss";

import {Input, InputNumber, Layout, Modal, Select, Slider} from "antd";
import MainPage from "../pages/MainPage/MainPage";
import FavouritesPage from "../pages/FavouritesPage/FavouritesPage";
import ResultPage from "../pages/ResultPage/ResultPage";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../store/auth/authActions";
import {videosActions} from "../store/videos/videosActions";
import PageHeader from "../components/PageHeader/PageHeader";
import ModalWindow from "../components/ModalWindow/ModalWindow";
import ProtectedRoute from "../router/ProtectedRoute";
import {Route, Routes, useNavigate} from "react-router";
import LoginPage from "../pages/LoginPage/LoginPage";

const {Content} = Layout;
const {Option} = Select;

const LayoutPage = () => {
  // const history = useHistory();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {isLoading, isAuth, isError, user} = useSelector(state => state.auth);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [maxResult, setMaxResult] = useState(12);
  const [favourId, setFavourId] = useState("");
  const [favouriteName, setFavouriteName] = useState("");
  const [modalError, setModalError] = useState("");
  const [orderBy, setOrderBy] = useState("relevance");
  const [editMode, setEditMode] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const [showSearch, setShowSearch] = useState("");

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     const user = localStorage.getItem("user");
  //     dispatch(authActions.setUser(user));
  //     dispatch(authActions.setIsAuth(true));
  //   } else {
  //     navigate("/login");
  //     // history.push("/login");
  //   }
  // }, []);

  const showModal = () => {
    debugger;
    setIsModalVisible(true);
  };

  const handleEditMode = (item) => {
    debugger;
    const {author, id, name, search, maxResult, orderBy} = item;
    setFavourId(id);
    setFavouriteName(name);
    setSearchValue(search);
    setMaxResult(maxResult);
    setOrderBy(orderBy);
    setEditMode(true);
    setIsModalVisible(true);
  };

  const handleEditOk = () => {
    setFavouriteName("");
    setMaxResult(12);
    setOrderBy("relevance");
    dispatch(videosActions.editFavour({
      author: user,
      id: favourId,
      name: favouriteName,
      search: searchValue,
      maxResult,
      orderBy
    }, favourId));
    setEditMode(false);
    setIsModalVisible(false);
  };

  const handleOk = () => {
    setModalError("");
    if (favouriteName) {
      const favourite = {
        author: user,
        id: Math.random().toString(20).substr(8),
        name: favouriteName,
        search: searchValue,
        maxResult,
        orderBy
      };
      setIsModalVisible(false);
      setTooltipVisible(true);
      // setTimeout(() => {
      //   setTooltipVisible(false);
      // }, 3000);
      setFavouriteName("");
      setMaxResult(12);
      dispatch(videosActions.createFavourite(favourite));
    } else {
      setModalError("Введите название");
    }
  };
  const handleCancel = () => {
    setModalError("");
    setEditMode(false);
    setIsModalVisible(false);
    setMaxResult(12);
    setFavouriteName("");
  };

  const maxResultChange = (value) => {
    setMaxResult(value);
  };

  const onSearch = value => {
    setShowSearch(searchValue);
    dispatch(videosActions.fetchVideo(value, maxResult, orderBy, navigate));
  };

  const handleSearch = (item) => {
    const {id, name, search, maxResult, orderBy} = item;
    setFavourId(id);
    setFavouriteName(name);
    setSearchValue(search);
    setMaxResult(maxResult);
    setOrderBy(orderBy);
    // history.push("/result");
    navigate("/result");
  };


  return (
    <Layout>
      <PageHeader/>
      <Content style={{padding: "0 50px", marginTop: 64}}>
        <Outlet/>
        {/*<Route element={<ProtectedRoute />}>*/}
        {/*  <Route path="/result" element={<ResultPage />} />*/}
        {/*  <Route path="/favourite" element={<FavouritesPage />} />*/}
        {/*</Route>*/}
        {/*<Route exact={true} path="/">*/}
        {/*  <MainPage*/}
        {/*    setOrderBy={setOrderBy}*/}
        {/*    setFavouriteName={setFavouriteName}*/}
        {/*    onSearch={onSearch}*/}
        {/*    maxResult={maxResult}*/}
        {/*    setMaxResult={setMaxResult}*/}
        {/*    searchValue={searchValue}*/}
        {/*    setSearchValue={setSearchValue}*/}
        {/*  />*/}
        {/*</Route>*/}
        {/*<Route exact={true} path="/favourites">*/}
        {/*  <FavouritesPage*/}
        {/*    handleSearch={handleSearch}*/}
        {/*    handleEditMode={handleEditMode}*/}
        {/*  />*/}
        {/*</Route>*/}
        {/*<Route exact={true} path="/result">*/}
        {/*  <ResultPage*/}
        {/*    showSearch={showSearch}*/}
        {/*    tooltipVisible={tooltipVisible}*/}
        {/*    onSearch={onSearch}*/}
        {/*    orderBy={orderBy}*/}
        {/*    maxResult={maxResult}*/}
        {/*    showModal={showModal}*/}
        {/*    searchValue={searchValue}*/}
        {/*    setSearchValue={setSearchValue}*/}
        {/*  />*/}
        {/*</Route>*/}
      </Content>
      {/*<ModalWindow*/}
      {/*  handleCancel={handleCancel}*/}
      {/*  handleEditOk={handleEditOk}*/}
      {/*  isEditMode={editMode}*/}
      {/*  handleSubmitOk={handleOk}*/}
      {/*  isModalVisible={isModalVisible}*/}
      {/*  searchValue={searchValue}*/}
      {/*  setSearchValue={setSearchValue}*/}
      {/*  maxResult={maxResult}*/}
      {/*  setMaxResult={setMaxResult}*/}
      {/*  favouriteName={favouriteName}*/}
      {/*  setFavouriteName={setFavouriteName}*/}
      {/*/>*/}
      {/*<Modal visible={isModalVisible} okText={editMode ? "Изменить" : "Сохранить"}*/}
      {/*       cancelText={editMode ? "Не изменять" : "Не сохранять"} onOk={editMode ? handleEditOk : handleOk}*/}
      {/*       onCancel={handleCancel}>*/}
      {/*  <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>*/}
      {/*    {editMode ? <h3>Изменить запрос</h3> : <h3>Сохранить запрос</h3>}*/}
      {/*    <div className={s.searchValue}*/}
      {/*         style={{display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: 24}}>*/}
      {/*      <label>Запрос:</label>*/}
      {/*      <Input className={s.modalInput} onChange={(e) => setSearchValue(e.target.value)} disabled={!editMode}*/}
      {/*             value={searchValue}/>*/}
      {/*    </div>*/}
      {/*    <div className={s.favouriteName}>*/}
      {/*      <label className={s.favouriteName__label}><span style={{color: "red"}}>*</span> Название</label>*/}
      {/*      <Input className={s.modalInput} value={favouriteName} onChange={(e) => setFavouriteName(e.target.value)}/>*/}
      {/*      {modalError && <span style={{color: "red"}}>{modalError}</span>}*/}
      {/*    </div>*/}
      {/*    <div className={s.order}>*/}
      {/*      <label className={s.order__label}>Сортировать по</label>*/}
      {/*      <Select className={s.modalInput} onChange={(e) => setOrderBy(e)} value={orderBy}>*/}
      {/*        <Option value="relevance">Без сортировки</Option>*/}
      {/*        <Option value="date">Дате</Option>*/}
      {/*        <Option value="rating">Рейтингу</Option>*/}
      {/*        <Option value="title">Названию</Option>*/}
      {/*        <Option value="videoCount">Количеству видео</Option>*/}
      {/*        <Option value="viewCount">Количеству просмотров</Option>*/}
      {/*      </Select>*/}
      {/*    </div>*/}
      {/*    <div className={s.slider}>*/}
      {/*      <label className={s.slider__label}>Максимальное количество</label>*/}
      {/*      <div className={s.slider__content}>*/}
      {/*        <Slider*/}
      {/*          min={5}*/}
      {/*          max={50}*/}
      {/*          onChange={maxResultChange}*/}
      {/*          value={maxResult}*/}
      {/*          style={{width: 310}}*/}
      {/*        />*/}
      {/*        <InputNumber*/}
      {/*          type={"number"}*/}
      {/*          min={5}*/}
      {/*          max={50}*/}
      {/*          value={maxResult}*/}
      {/*          onChange={maxResultChange}*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</Modal>*/}
    </Layout>
  );
};

export default LayoutPage;
