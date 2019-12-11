import React from 'react';
import uuid from 'uuid';
import VideoThumbnail from './VideoThumbnail'

const VideoContent = props => {
  return (
    <ul>
      {props.videoLists.map((item) => {
        return (
          <li key={uuid.v4()}>
            <VideoThumbnail image={item}></VideoThumbnail>
            <div>{item.snippet.title}</div>
          </li>
        );
      })}
    </ul>
  );
}

export default VideoContent;