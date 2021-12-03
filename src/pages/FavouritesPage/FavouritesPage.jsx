import React, {useEffect} from "react";

import s from "./FavouritesPage.module.scss";

import {Divider, List} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {videosActions} from "../../store/videos/videosActions";
import {useHistory} from "react-router-dom";

const FavouritesPage = ({handleEditMode, setSearchValue}) => {
  const {favouriteList} = useSelector(state => state.video);
  const {user} = useSelector(state => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(videosActions.fetchFavouriteList(user));
    dispatch(videosActions.setIsError(""));
  }, []);

  const handleDelete = (id) => {
    dispatch(videosActions.deleteFavour(id));
  };

  const handleSearch = (item) => {
    setSearchValue(item.search)
    history.push("/result")
  }

  return (
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
                  onClick={() => handleEditMode(item)}
                  key="edit"
                >Изменить
                </span>,
                  <span
                    onClick={() => handleDelete(item.id)}
                    className={s.favouritesItem__delete}
                    key="delete"
                  >Удалить
                  </span>]}>
              <span className={s.favouritesItem__name} onClick={() => handleSearch(item)}>{item.name}</span>
            </List.Item>
          }
        />
      </div>
    </div>
  );
};

export default FavouritesPage;
