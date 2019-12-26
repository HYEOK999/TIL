import React from 'react'
import uuid from 'uuid'


const VideoPlayerDes = (props) => {

  const videoInfo = props.videoInfo;
  console.log('aa', videoInfo)
  return (
      <div className='video-tags' key={uuid.v4()}>
        {
          videoInfo.snippet &&
          videoInfo.snippet.tags &&
          videoInfo.snippet.tags.map(tag => '#'+ tag + ' ')
        }
      </div>
  );
}

export default VideoPlayerDes;