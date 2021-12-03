import React from "react";

import s from './VideoItem.module.scss';

const VideoItem = ({viewType, videoInfo}) => {
  return (
    <li className={viewType === 'row' ? s.videoItem : s.second}>
      <div >
        <img className={viewType === 'row' ? s.videoItem__cover : s.second__cover}  src={videoInfo?.thumbnails.medium.url} alt="Обложка"/>
      </div>
      <div className={viewType === 'row' ? s.videoItem__wrapper : s.second__wrapper}>
        <p className={s.videoItem__title}>
          {videoInfo?.title}
        </p>
        <div className={viewType === 'row' ? s.videoItem__desc : s.second__desc}>
          <p className={s.videoItem__channel}>{videoInfo.channelTitle}</p>
        </div>
      </div>
    </li>
  );
};

export default VideoItem;
