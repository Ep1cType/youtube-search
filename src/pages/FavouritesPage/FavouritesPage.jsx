import React, {useEffect, useState} from "react";

import s from "./FavouritesPage.module.scss";

import {Divider, List} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {videosActions} from "../../store/videos/videosActions";
import {useLocation, useOutletContext} from "react-router";
import {Link} from "react-router-dom";
import ModalWindow from "../../components/ModalWindow/ModalWindow";


const FavouritesPage = () => {
  // const {favouriteList} = useSelector(state => state.video);
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const [favouriteList, setFavouriteList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [maxResults, setMaxResults] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [nameFav, setNameFav] = useState("");

  // useEffect(() => {
  // if(!favouriteList.length) {
  //   dispatch(videosActions.fetchFavouriteList(user));
  // }
  // dispatch(videosActions.setIsError(""));
  // }, []);

  useEffect(() => {
    const favourites = localStorage.getItem("favourites");
    const favouriteList = JSON.parse(favourites);
    const userFavouriteList = favouriteList.filter(favourite => favourite.author === "admin");
    if (userFavouriteList) {
      setFavouriteList(userFavouriteList);
    }
  }, []);

  const onModalOpen = (item) => {
    setSearchValue(item.search)
    setMaxResults(item.maxResult)
    setOrderBy(item.orderBy)
    setNameFav(item.name)
    setIsModalVisible(true)
  }

  const onModalCancel = () => {
    setIsModalVisible(false);
    setSearchValue("")
    setMaxResults("")
    setOrderBy("")
    setNameFav("")
  }

  const onModalSubmit = () => {

  }

  const onFavouriteDelete = (id) => {
    dispatch(videosActions.deleteFavour(id));
  };

  return (
    <>
      <div className={s.favouritesPage}>
        <div className={s.favouritesPage__content}>
          <div className={s.favouritesPage__header}>
            <h2 className={s.header__title}>Избранное</h2>
          </div>
          <List
            size="large"
            className={s.favouritesList}
            dataSource={favouriteList}
            renderItem={item =>
              <List.Item
                className={s.favouritesItem}
                style={{backgroundColor: "white"}}
                actions={
                  [<span
                    className={s.favouritesItem__change}
                    // onClick={() => handleEditMode(item)}
                    key="edit"
                    onClick={() => onModalOpen(item)}
                  >
                  Изменить
                </span>,
                    <span
                      // onClick={() => handleDelete(item.id)}
                      className={s.favouritesItem__delete}
                      key="delete"
                    >Удалить
                  </span>]}>
                {/*<span className={s.favouritesItem__name} onClick={() => handleSearch(item)}>{item.name}</span>*/}
              </List.Item>
            }
          />
        </div>
      </div>
      <ModalWindow
        onModalSubmit={onModalSubmit}
        onModalCancel={onModalCancel}
        isEditMode={true}
        searchValue={searchValue}
        favouriteName={nameFav}
        isModalVisible={isModalVisible}
        maxResult={maxResults}
        setFavouriteName={setNameFav}
        setMaxResult={setMaxResults}
        setSearchValue={setSearchValue}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
      />
    </>
  );
};

export default FavouritesPage;
