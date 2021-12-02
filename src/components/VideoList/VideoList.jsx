import React from "react";

import s from './VideoList.module.scss';
import VideoItem from "../VideoItem/VideoItem";

const VideoList = ({children, viewType}) => {
  return (
    <ul className={viewType === 'row' ? s.videoList : s.second}>
      {children}
    </ul>
  );
};

export default VideoList;
