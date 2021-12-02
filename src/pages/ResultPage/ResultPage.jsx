import React, {useEffect, useState} from "react";

import s from './ResultPage.module.scss';
import {Input, Tooltip} from "antd";
import {HeartOutlined} from "@ant-design/icons";
import {useHistory} from "react-router-dom";
import VideoList from "../../components/VideoList/VideoList";
import VideoItem from "../../components/VideoItem/VideoItem";
import {useDispatch, useSelector} from "react-redux";
import {videosActions} from "../../store/videos/videosActions";

const { Search } = Input;

const ResultPage = ({searchValue, setSearchValue, showModal, maxResult, orderBy}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {isLoading, isError, videoList, totalCount} = useSelector(state => state.video)


  const [visible, setVisible] = useState(false);
  const [viewType, setViewType] = useState('row');

  useEffect(() => {
    dispatch(videosActions.fetchVideo(searchValue, maxResult, history))
  }, [])

  const suffix = (
    <>
      <Tooltip color="#ffffff" placement="bottom" visible={visible} title={
        <>
        <div style={{color: "black"}}>
          Поиск сохранён в разделе «Избранное»
        </div>
        <span style={{color: "#1890ff", cursor: "pointer"}} onClick={() => history.push('/favourites')}>Перейти в Избранное</span>
      </>
      }>
        <HeartOutlined
          onClick={() => showModal()}
          style={{
            cursor:"pointer",
            fontSize: 24,
            color: '#1890ff',
          }}
        />
      </Tooltip>
    </>
  );



  const onSearch = value => {
    console.log(value);
  }


  return (
    <div className={s.resultPage}>
      <div className={s.resultPage__content}>
        <div className={s.resultPage__header}>
          <h2 className={s.header__title}>Поиск видео</h2>
          <Search
            placeholder="Что хотите посмотреть ?"
            enterButton="Найти"
            size="large"
            style={{width: '100%', height: '52px'}}
            suffix={suffix}
            onSearch={onSearch}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className={s.resultPage__main}>
          <div className={s.resultPage__nav}>
            <div className={s.result__desc}>
              <span className={s.result__desc__text}>Видео по запросу "{searchValue}"</span>
              <span className={s.result__desc__count}>{totalCount}</span>
            </div>
            <div className={s.nav__settings}>
              <button onClick={() => setViewType('row')}>row</button>
              <button onClick={() => setViewType('card')}>card</button>
            </div>
          </div>
          {!isLoading
            ?
            <VideoList viewType={viewType}>
              {videoList.map((video) => (
                <VideoItem key={video.etag} videoInfo={video.snippet} viewType={viewType} />
              ))}
            </VideoList>
            :
            <div>
              LOADING...
            </div>
          }

        </div>
      </div>
    </div>
  );
};

export default ResultPage;
