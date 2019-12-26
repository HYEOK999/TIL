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
import VideoPlayerDes from './VideoPlayerDes';

const VideoPlayer = (props) => {

  let text = '';
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

  if (!id) return null

  // const handleEnter = (k) => (e) => {
  //   if(e.key === 'Enter') {
  //       k(id, e.target.value);
  //     }
  // }

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
      <main className="video-player-wrap">
        <iframe src={URL} title={id} className="video-player" />
        <br/>
        <section className="video-player-description">
          <VideoPlayerDes videoInfo={videoInfo}></VideoPlayerDes>
          <h2 className="video-player-title">{ videoInfo.snippet && videoInfo.snippet.title }</h2>
          <div className='video-player-info'>
            <div className='viewCount-date'>
              <span>조회수 : {(`${videoInfo.statistics && videoInfo.statistics.viewCount}`).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}회</span>
              <span> &#183; { (`${videoInfo.snippet && videoInfo.snippet.publishedAt}`).slice(0, 10).replace(/-/g, match => '. ') }</span>
            </div>
            <div className='like-button-box'>
              <button onClick={() => props.like(id, true)} className="like">
                <svg viewBox='0 0 24 24' preserveAspectRatio='xMidYMid meet' focusable='false'
                  className='style-scope yt-icon' fill='gray'
                  style={{
                        pointerEvents: 'none',
                        display: 'block',
                        width: '100%',
                        height: '100%',
                      }}
                >
                  <g className='style-scope yt-icon'>
                    <path
                      d='M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z'
                      className='style-scope yt-icon'
                    />
                  </g>
                </svg>
                <span>
                  { props.data[id] && props.data[id].likeCount ? props.data[id].likeCount : 0}
                </span>
              </button>
              <button onClick={() => props.like(id, false)} className="disLike">
                <svg viewBox='0 0 24 24' preserveAspectRatio='xMidYMid meet' focusable='false'
                  className='style-scope yt-icon' fill='gray'
                  style={{
                        pointerEvents: 'none',
                        display: 'block',
                        width: '100%',
                        height: '100%',
                      }}
                >
                    <g className='style-scope yt-icon'>
                      <path
                        d='M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z'
                        className='style-scope yt-icon'
                      />
                    </g>
                  </svg>
                  <span>
                    { props.data[id] && props.data[id].disLikeCount ? props.data[id].disLikeCount : 0}
                  </span>
                </button>
            </div>
          </div>
        </section>
        <br/>
        <hr/>
        <br/>
        {/* <input type='text' onKeyPress={handleEnter(props.comment)} /> */}

        <textarea placeholder="공개 댓글 추가..." className="comment-text" ref={ref => text = ref}></textarea>

        <div className="submit-box">
          <button className="cancle">취소</button>
          <button className="submit" onClick={() => {
              props.comment(id, text.value)
              text.value = '';
            }
          }>확인</button>
        </div>

        <div>
          {
            props.data[id] &&
            props.data[id].comments &&
            props.data[id].comments.map((comment) =>
              <div className="content" key={uuid.v4()}>
                {comment.text}
                <button className="content-delete"onClick={() => props.deleteComment(id, comment.cid)}>삭제</button>
              </div>
            )
          }
        </div>
      </main>
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