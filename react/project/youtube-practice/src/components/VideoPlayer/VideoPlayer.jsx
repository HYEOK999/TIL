import React from 'react';
import './VideoPlayer.css';
import qs from 'query-string';

const VideoPlayer = (props) => {
  // const { id } = props.match.params;

  const videoId = qs.parse(props.location.search);
  console.log(videoId);

  // const _id = id || videoId.v;
  const url = `https://youtube.com/embed/${videoId.v}`;
  // const state = props.videoLists.filter((video) => video.id.videoId === props.videoId)
  // console.log(state[0].snippet);
  return (
    <div className="video-player-wrap">
        <iframe src={url} title={videoId.v} className="video-player" />
        {/* <span>{state[0].snippet.title}</span> */}
    </div>
  )
};

export default VideoPlayer;