import React, {useEffect, useState} from "react";

import s from "./FavouritesPage.module.scss";

import {Divider, List} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {videosActions} from "../../store/videos/videosActions";
import {useLocation, useNavigate, useOutletContext} from "react-router";
import {Link} from "react-router-dom";
import ModalWindow from "../../components/ModalWindow/ModalWindow";


const FavouritesPage = () => {
  // const {favouriteList} = useSelector(state => state.video);
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [favouriteList, setFavouriteList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [maxResults, setMaxResults] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [nameFav, setNameFav] = useState("");
  const [error,setError] = useState("");

  // useEffect(() => {
  // if(!favouriteList.length) {
  //   dispatch(videosActions.fetchFavouriteList(user));
  // }
  // dispatch(videosActions.setIsError(""));
  // }, []);

  useEffect(() => {
    debugger;
    setIsLoading(true)
    const favourites = localStorage.getItem("favourites");
    const favouriteList = JSON.parse(favourites);
    if (favouriteList) {
      // setFavouriteList(favouriteList)
      const userFavouriteList = favouriteList.filter(favourite => favourite.userName === user);
      if (userFavouriteList) {
        setFavouriteList(userFavouriteList);
      }
      setIsLoading(false)
    } else {
      setError("Ошибка загрузки")
    }
  }, []);

  const onSearch = (item) => {
    navigate(`/result?search_query=${item.searchResult}&max_result=${item.maxResults}&order_by=${item.orderBy}`, {
      replace: true,
    });
  };

  const onModalOpen = (item) => {
    debugger;
    setSearchValue(item.searchResult)
    setMaxResults(item.maxResults)
    setOrderBy(item.orderBy)
    setNameFav(item.favouriteName)
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

  if (isLoading) {
    return (
      <h2>Loading...</h2>
    )
  }

  return (
    <>
      <div className={s.favouritesPage}>
        <div className={s.favouritesPage__content}>
          <div className={s.favouritesPage__header}>
            <h2 className={s.header__title}>Избранное</h2>
          </div>
          {favouriteList
            ?
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
                  <span className={s.favouritesItem__name} onClick={() => onSearch(item)} >{item.favouriteName}</span>
                </List.Item>
              }
            />
            :
            <div>Ничего не найдено</div>
          }
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
