import React from 'react';
import axios from 'axios';
import Nav from './components/Nav/Nav';
import { debounce } from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';
import uuid from 'uuid';

import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import VideoLists from './components/VideoLists/VideoLists';
import VideoContent from './components/VideoLists/VideoContent';
import spinner from './components/images/spinner.gif';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';

const URL = 'https://www.googleapis.com/youtube/v3/search';
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      videoLists : [],
      query : '',
      nextPageToken : '',
      selectedVideo : null
    }

    this.defaultState = this.state;
    this.getYoutube = this.getYoutube.bind(this);
    this.setVideoId = this.setVideoId.bind(this);
    // this.setInput = this.setInput.bind(this);
  }

  async getYoutube(query) {
    if (!query) return;
    if (this.state.query !== query) {
      this.setState(this.defaultState); // 이유 : 검색어가 바뀔경우 UI부분도 초기화되야되기 때문
    }

    const { nextPageToken } = this.state;
    const params = {
      key : '',
      q : query,
      part : 'snippet',
      pageToken : nextPageToken
    }

    try {
      const res = await axios.get( URL,{ params });
      this.setState({
        videoLists : [...this.state.videoLists,...res.data.items],
        query,
        nextPageToken: res.data.nextPageToken
      })
    } catch (error) {
      console.error(error);
    }
  }

  async componentWillMount(){
    await this.getYoutube('여행');
  }

  setVideoId(id) {
    this.setState({ selectedVideo : id })
  }

  // setInput(input) {
  //   this.setState({ input })
  // }

  render() {
    const { selectedVideo } = this.state;
    return (
      <div className = 'App'>
        <Nav>
          {/* <SearchBar input={input} setInput={this.setInput} onSearch={debounce(this.getYoutube,500)} /> */}
          <SearchBar onSearch={debounce(this.getYoutube,500)} />
        </Nav>
        <main className = 'main-content'>
          {selectedVideo
          ? <VideoPlayer videoId = {selectedVideo} {...this.state}/>
          : <InfiniteScroll
              loadMore = {() => this.getYoutube(this.state.query)}
              hasMore = {!!this.state.nextPageToken}
              loader = {
                <div key={uuid.v4()}>
                  <img src={spinner} alt="로더"/>
                </div>
              }
            >
              <VideoLists>
                <VideoContent
                  onSelectVideo={this.setVideoId} {...this.state}
                />
              </VideoLists>
            </InfiniteScroll>
          }
        </main>
      </div>
    );
  }
}

export default App;
