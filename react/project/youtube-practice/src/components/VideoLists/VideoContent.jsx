import React from 'react';
import uuid from 'uuid';
import './VideoList.css'
import VideoDescription from './VideoDescription';

const VideoContent = props => {
  console.log(props);
  const videos = props.videoLists.map((video) =>
      <li className='video-list'key={uuid.v4()} onClick={() => props.onSelectVideo(video.id.videoId)}>
        <figure>
          <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title}/>
          <VideoDescription {...video}/>
        </figure>
      </li>
    );
  return (
    <>
      {videos}
    </>
  );
}

export default VideoContent;