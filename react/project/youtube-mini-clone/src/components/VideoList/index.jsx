import React from 'react';
import VideoListItem from './VideoListItem';
import './VideoList.css';
import uuid from 'uuid';

const VideoList =  props => {
  const videos = props.videos.map(
    video => <VideoListItem {...video} key={uuid.v4()}
    onVideoSelect={props.onVideoSelect} />
  );
  return (
    <div>
       <ul className="video-list-wrapper">
         {videos}
       </ul>
    </div>
  );
};

export default VideoList;