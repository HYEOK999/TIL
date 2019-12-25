import React, { useState, useEffect } from 'react';
import './VideoPlayer.css';
import qs from 'query-string';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import uuid from 'uuid';
import axios from 'axios';

import SearchBar from "../SearchBar";
import Nav from "../Nav";
import { like, comment, deleteComment } from '../../actions'

const VideoPlayer = (props) => {

  const { _id } = props.match.params;
  const { v } = qs.parse(props.location.search);
  const id = _id || v ? _id || v : null;
  const URL = `https://youtube.com/embed/${id}`;

  // useState
  const [ videoInfo, setVideoInfo ] = useState({})

  async function getYoutubeVideoData(videoId) {
    const params = {
      key: process.env.REACT_APP_YOUTUBE_API_KEY,
      part: 'snippet, statistics',
      id: videoId
    };

    const { data } = await axios.get(
      'https://www.googleapis.com/youtube/v3/videos',
      {
        params,
      },
    );
    setVideoInfo({...data.items[0]})
  }

  useEffect(() => {
    getYoutubeVideoData(id);
  }, []);

  console.log(videoInfo);
  if (!id) return null

  const handleEnter = (k) => (e) => {
    if(e.key === 'Enter') {
        k(id, e.target.value);
      }
  }

  return (
    <div>
      <Nav>
        {/* <SearchBar input={input} setInput={this.setInput} onSearch={debounce(this.getYoutube,500)} /> */}
        <SearchBar onSearch={e =>
          {
            this.props.history.push(`/results?search_query=${e.target.value}`);
          }
        }/>
      </Nav>
      <div className="video-player-wrap">

      <iframe src={URL} title={id} className="video-player" />
      <button onClick={() => props.like(id, true)}>좋아요</button>
      { props.data[id] &&
        props.data[id].likeCount ? props.data[id].likeCount : 0}
      <button onClick={() => props.like(id, false)}>싫아요</button>
      { props.data[id] &&
        props.data[id].disLikeCount ? props.data[id].disLikeCount : 0}

      <input type='text' onKeyPress={handleEnter(props.comment)} />

      {/* <textarea ref={ref => text = ref}></textarea>
      <button onClick={() => props.comment(id, text.value, cid)}>확인</button> */}
      <div>
        {
          props.data[id] &&
          props.data[id].comments &&
          props.data[id].comments.map((comment) =>
            <h1 key={uuid.v4()}>
              {comment.text}
              <button onClick={() => props.deleteComment(id, comment.cid)}>삭제</button>
            </h1>
          )
        }
        {
          videoInfo.snippet &&
          videoInfo.snippet.tags &&
          videoInfo.snippet.tags.map(tag => <div key={uuid.v4()}>{tag}</div>)
        }
      </div>
    </div>
  );
  </div>
  )
};

function mapStateToProps(state) {
  return {
    data : state.videoInfo.data
   }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    // bindActionCreators : 액션크리에이터를 여기에 나열해준다.
    // ++ actions의 add함수가 여기에 바인딩 되어야한다.
    like,
    comment,
    deleteComment
  }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(VideoPlayer);