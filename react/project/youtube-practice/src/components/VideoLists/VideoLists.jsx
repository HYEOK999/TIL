import React from 'react';

const VideoLists = props => {
  console.log(props);
  return (
    <ul>
      {props.children}
    </ul>
  );
}

export default VideoLists;