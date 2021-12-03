import React, {useEffect} from "react";
import { Input, Space } from 'antd';



import s from './MainPage.module.scss';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {videosActions} from "../../store/videos/videosActions";

const { Search } = Input;

const MainPage = ({searchValue, setSearchValue, maxResult, setMaxResult, onSearch}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {isLoading, isError} = useSelector(state => state.video)

  useEffect(() => {
    dispatch(videosActions.setIsError(""));
  }, [])

  return (
    <div className={s.mainPage} >
      <div className={s.mainPage__content}>
        <h1 className={s.search__title}>Поиск видео</h1>
        {isError && <span>{isError}</span>}
        <Search
          placeholder="Что хотите посмотреть ?"
          enterButton="Найти"
          size="large"
          style={{width: '600px'}}
          onSearch={onSearch}
          value={searchValue}
          loading={isLoading}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default MainPage;
