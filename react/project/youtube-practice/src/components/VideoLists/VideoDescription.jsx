import React from 'react'
import './VideoList.css'

const VideoDescription = (props) => {
  const videoData = {
    url : props.snippet.thumbnails.high.url,
    title : props.snippet.title,
    channel : props.snippet.channelTitle,
    id : props.id.videoId,
    description : props.snippet.description
  }
  return (
      <figcaption>
        <span className="video-title">{videoData.title}</span><br/>
        <span className="video-channel">체널명 : {videoData.channel}</span><br/>
        <span className="video-desc">{videoData.description}</span>
      </figcaption>
  );
}

export default VideoDescription;