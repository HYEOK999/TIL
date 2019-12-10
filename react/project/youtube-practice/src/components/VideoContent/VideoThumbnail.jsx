import React from 'react';

const VideoThumbnail = props => {
  console.log(props);
  return (
    <a href="#">
      <img src={props.image.snippet.thumbnails.default.url} alt={'test'}/>
    </a>
  );
}

export default VideoThumbnail;