import React, {useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {Input} from "antd";

import s from "./MainPage.module.scss";

const {Search} = Input;

// props = {searchValue, setSearchValue, maxResult, setMaxResult, onSearch, setFavouriteName, setOrderBy}

const MainPage = () => {
  const navigate = useNavigate();

  const {isError} = useSelector(state => state.video);

  const [searchValue, setSearchValue] = useState("");

  const onChange = event => {
    setSearchValue(event.target.value);
  };

  const onSearch = () => {
    navigate(`/result?search_query=${searchValue.toString()}`, {
      replace: true,
      state: {
        max_result: 12,
        order_by: "relevance"
      }
    });
  };

  return (
    <div className={s.mainPage}>
      <div className={s.mainPage__content}>
        <h1 className={s.search__title}>Поиск видео</h1>
        <div className={s.error}>
          {isError && <span className={s.error__value}>{isError}</span>}
        </div>
        <Search
          // className={s.search__input}
          placeholder="Что хотите посмотреть ?"
          enterButton="Найти"
          size="large"
          value={searchValue}
          onSearch={onSearch}
          onChange={(event) => onChange(event)}
        />
      </div>
    </div>
  );
};

export default MainPage;
