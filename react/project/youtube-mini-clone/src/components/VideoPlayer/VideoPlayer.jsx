import React from "react";
import "./VideoPlayer.css";

const VideoDetail = props => {
  const { videoId } = props;
  if (!videoId) return null;
  const url = `https://youtube.com/embed/${videoId}`;
  return (
    <div className="video-detail">
        <iframe src={url} title={videoId} className="video-player" />
    </div>
  );
};

export default VideoDetail;
