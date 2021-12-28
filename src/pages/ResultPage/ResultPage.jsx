import React, {useEffect, useState} from "react";

import s from "./ResultPage.module.scss";

import {Input, Tooltip} from "antd";
import {AppstoreOutlined, HeartOutlined, UnorderedListOutlined} from "@ant-design/icons";
import VideoList from "../../components/VideoList/VideoList";
import VideoItem from "../../components/VideoItem/VideoItem";
import {useDispatch, useSelector} from "react-redux";
import {videosActions} from "../../store/videos/videosActions";
import {useLocation, useNavigate} from "react-router";
import {useSearchParams} from "react-router-dom";
import VideoService from "../../services/VideoService";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import Loader from "../../components/Loader/Loader";

const {Search} = Input;

// props = {searchValue, setSearchValue, showModal, maxResult, orderBy, onSearch, tooltipVisible, showSearch}

const ResultPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const {videoList, totalCount} = useSelector(state => state.video);

  const [searchParams, setSearchParams] = useSearchParams();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [maxResults, setMaxResults] = useState(searchParams.get("max_result"));
  const [orderBy, setOrderBy] = useState(searchParams.get("order_by"));
  const [favouriteName, setFavouriteName] = useState("");
  // const [searchValue, setSearchValue] = useState(searchParams.get("search_query"))

  // const searchValue = searchParams.get("search_query");
  const searchResult = searchParams.get("search_query");

  // let maxResults = searchParams.get("max_result");
  // let orderBy = searchParams.get("order_by");

  const [viewType, setViewType] = useState("row");

  const checkQueryParams = (maxResults, orderBy) => {
    if (maxResults > 50 || maxResults < 5) {
      setMaxResults(12);
      // setSearchParams({
      //   max_result: 25
      // })
    }
    if (!maxResults) {
      setMaxResults(12);
      // setSearchParams({
      //   max_result: 25
      // })
    }
    if (!orderBy) {
      setOrderBy("relevance");
      // setSearchParams({
      //   order_by: "relevance"
      // })
    }
  };

  checkQueryParams(maxResults, orderBy);

  useEffect(() => {
    if (searchResult) {
      debugger;
      setIsLoading(true);
      setInputValue(searchResult);
      VideoService.getVideoList(searchResult, maxResults, orderBy)
        .then((response) => {
          dispatch(videosActions.setVideoList(response.data.items));
          dispatch(videosActions.setTotalCount(response.data?.pageInfo?.totalResults));
          setIsLoading(false);
        }).catch((err) => {
        console.log(err.message);
      });
    } else {
      navigate("*", {replace: true, state: "Результатов не найдено"});
    }
  }, [searchResult]);

  const onSearch = () => {
    setSearchParams({
      search_query: inputValue
    });
  };

  const onModalSubmit = () => {

  }

  const onModalCancel = () => {
    setIsModalVisible(false)
  }

  const openModal = () => {
    setIsModalVisible(true)
    // navigate('/', {
    //   state: {
    //     backgroundLocation: location
    //   }
    // })
    // setSearchParams({
    //   openModal: true
    // })
  };

  const suffix = (
    <>
      {/*<Tooltip color="#ffffff" placement="bottom" visible={tooltipVisible} title={*/}
      {/*  <>*/}
      {/*  <div style={{color: "black"}}>*/}
      {/*    Поиск сохранён в разделе «Избранное»*/}


      {/*  </div>*/}
      {/*  /!*<span style={{color: "#1890ff", cursor: "pointer"}} onClick={() => history.push('/favourites')}>Перейти в Избранное</span>*!/*/}
      {/*</>*/}
      {/*}>*/}

      <HeartOutlined
        onClick={() => openModal()}
        style={{
          cursor: "pointer",
          fontSize: 24,
          color: "#1890ff",
        }}
      />

      {/*</Tooltip>*/}
    </>
  );

  return (
    <div className={s.resultPage}>
      <div className={s.resultPage__content}>
        <div className={s.resultPage__header}>
          <h2 className={s.header__title}>Поиск видео</h2>
          <Search
            placeholder="Что хотите посмотреть ?"
            enterButton="Найти"
            size="large"
            style={{width: "100%", height: "52px"}}
            suffix={suffix}
            onSearch={onSearch}
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
        </div>
        <div className={s.resultPage__main}>
          <div className={s.resultPage__nav}>
            <div className={s.result__desc}>
              <span className={s.result__desc__text}>Видео по запросу "{searchResult}"</span>
              <span className={s.result__desc__count}>{totalCount}</span>
            </div>
            <div className={s.nav__settings}>
              <UnorderedListOutlined onClick={() => setViewType("row")} style={{
                color: viewType === "row" ? "#000000" : "#E5E5E5",
                fontSize: 24,
                marginRight: 18
              }}/>
              <AppstoreOutlined onClick={() => setViewType("card")}
                                style={{color: viewType === "card" ? "#000000" : "#E5E5E5", fontSize: 24}}/>
            </div>
          </div>
          {!isLoading
            ?
            <VideoList viewType={viewType}>
              {videoList.map((video) => (
                <VideoItem key={video.etag} videoInfo={video.snippet} viewType={viewType}/>
              ))}
            </VideoList>
            :
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Loader />
            </div>
          }
        </div>
      </div>
      <ModalWindow
        onModalSubmit={onModalSubmit}
        onModalCancel={onModalCancel}
        orderBy={orderBy}
        maxResult={maxResults}
        favouriteName={favouriteName}
        searchValue={inputValue}
        setOrderBy={setOrderBy}
        setSearchValue={setInputValue}
        setMaxResult={setMaxResults}
        setFavouriteName={setFavouriteName}
        isEditMode={false}
        isModalVisible={isModalVisible}
      />
    </div>
  );
};

export default ResultPage;
