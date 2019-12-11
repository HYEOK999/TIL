import React from 'react';
import axios from 'axios';
import uuid from 'uuid';
import { debounce } from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';

import Nav from './components/Nav/Nav';
import SearchBar from './components/SearchBar/SearchBar'
import VideoPlayer from './components/VideoPlayer/VideoPlayer'
import VideoList from './components/VideoList'
import spinner from './components/images/spinner.gif'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      videos : [],
      selectedVideo: null,
      query: '',
      nextPageToken: ''
    };

    // 상태 백업본
    this.defaultState = this.state;

    Object.getOwnPropertyNames(App.prototype).forEach(key => this[key] = this[key].bind(this))
  }

  async getYoutubeData(query = '여행') {
    if (!query) return
    if (this.state.query !== query) {
      this.setState(this.defaultState); // 이유 : 검색어가 바뀔경우 UI부분도 초기화되야되기 때문
    }

    const { nextPageToken } = this.state;
    const params = {
      key : 'AIzaSyCXndE4mNdeCpXWm-7iSu2kUzWuSsliCmc',
      q : query,
      part : 'snippet',
      maxResults: 10,
      pageToken: nextPageToken
    }
    try {
      const { data } = await axios.get('https://www.googleapis.com/youtube/v3/search', { params });

      this.setState({
        videos : [...this.state.videos, ...data.items],
        query,
        nextPageToken: data.nextPageToken
      }, console.log(this.state.videos));
    } catch (error) {
      console.error(error);
    }
  }

  // 페이지가 render()되기 전에 실행한다.
  // setState의 초기값을 별도로 지정하고싶을때 많이쓴다.
  async componentWillMount(){
    this.getYoutubeData();
  }

  // 상태를 업데이트 하기 위한 함수
  // setInput (input) {
  //   this.setState({ input })
  // }

  setVideo (setVideo) {
    this.setState({ selectedVideo : setVideo })
  }

  render () {
    // const { input , selectedVideo } = this.state;
    const { selectedVideo } = this.state;

    return (
      <div className="App">
        <Nav>
          {/* <SearchBar input={ input } setInput={ this.setInput } onSearchVideos={debounce(this.getYoutubeData, 500)}/> */}
          <SearchBar onSearchVideos={debounce(this.getYoutubeData, 500)}/>
        </Nav>
        {/* {
          selectedVideo
          ? <VideoPlayer videoId = { selectedVideo } />
          : <VideoList
          {...this.state}
          // onVideoSelect = {selectedVideo => this.setState({ selectedVideo })}
          onVideoSelect = { this.setVideo }
          />
        } */}

        {
          selectedVideo
            ? <VideoPlayer videoId = { selectedVideo } />
            : <InfiniteScroll
                loadMore = {() => this.getYoutubeData(this.state.query)}
                hasMore = {!!this.state.nextPageToken}
                loader = {
                  <div key={uuid.v4()} className="loader">
                    <img src={spinner} alt="loading" />
                  </div>
                  }
                >
                {/* 무한로딩으로 렌더링될 모든 컴포넌트 */}
                <VideoList
                  {...this.state}
                  // onVideoSelect = {selectedVideo => this.setState({ selectedVideo }
                  onVideoSelect = { this.setVideo }
                />
              </InfiniteScroll>
          }
      </div>
    );
  }
}
export default App;