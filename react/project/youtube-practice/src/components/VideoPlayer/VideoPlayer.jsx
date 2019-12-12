import React from 'react';
import './VideoPlayer.css'

const VideoPlayer = (props) => {
  const url = `https://youtube.com/embed/${props.videoId}`;
  const state = props.videoLists.filter((video) => video.id.videoId === props.videoId)
  console.log(state[0].snippet);
  return (
    <div className="video-player-wrap">
        <iframe src={url} title={props.videoId} className="video-player" />
        <span>{state[0].snippet.title}</span>
    </div>
  )
};

export default VideoPlayer;