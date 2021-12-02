import React from "react";
import { Input, Space } from 'antd';



import s from './MainPage.module.scss';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {videosActions} from "../../store/videos/videosActions";

const { Search } = Input;

const MainPage = ({searchValue, setSearchValue, maxResult, setMaxResult}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {isLoading,isError} = useSelector(state => state.video)



  const onSearch = value => {
    dispatch(videosActions.fetchVideo(value, maxResult, history))
  }

  return (
    <div className={s.mainPage} >
      <div className={s.mainPage__content}>
        <h1 className={s.search__title}>Поиск видео</h1>
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
