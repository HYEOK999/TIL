import React from 'react';
import axios from 'axios';
import Nav from './components/Nav/Nav';
import { debounce } from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';
import uuid from 'uuid';
import qs from 'query-string';

import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import VideoLists from './components/VideoLists/VideoLists';
import VideoContent from './components/VideoLists/VideoContent';
import spinner from './components/images/spinner.gif';
// import VideoPlayer from './components/VideoPlayer/VideoPlayer';

const URL = 'https://www.googleapis.com/youtube/v3/search';
class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      videoLists : [],
      query : '',
      nextPageToken : '',
      // selectedVideo : null
    }

    this.defaultState = this.state;
    this.getYoutube = this.getYoutube.bind(this);
    // this.setVideoId = this.setVideoId.bind(this);
    // this.setInput = this.setInput.bind(this);
  }

  async getYoutube(query) {
    if (!query) {
      this.setState(this.defaultState);
      setTimeout(() =>
      this.props.history.push(`/results?search_query=${query}`), 0)
      return;
    }
    if (this.state.query !== query) {
      setTimeout(() =>
      this.props.history.push(`/results?search_query=${query}`), 0)
      this.setState(this.defaultState); // 이유 : 검색어가 바뀔경우 UI부분도 초기화되야되기 때문
    }

    const { nextPageToken } = this.state;
    const params = {
      key : process.env.REACT_APP_YOUTUBE_API_KEY,
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

  // async componentWillMount(){
  //   await this.getYoutube('여행');
  // }

  componentDidMount() {
    const { props } = this;
    if (props.location) { // 방어코드. lacation이 주입되기까지 기다린다.
      const { search_query } = qs.parse(props.location.search);
      this.getYoutube(search_query);
    }
  }

  // setVideoId(id) {
  //   this.setState({ selectedVideo : id })
  // }

  // setInput(input) {
  //   this.setState({ input })
  // }

  render() {
    // const { selectedVideo } = this.state;
    return (
      <div className = 'App'>
        <Nav>
          {/* <SearchBar input={input} setInput={this.setInput} onSearch={debounce(this.getYoutube,500)} /> */}
          <SearchBar onSearch={debounce(this.getYoutube,500)} />
        </Nav>
        <main className = 'main-content'>
          <InfiniteScroll
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
                  // onSelectVideo={this.setVideoId} {...this.state}
                  onSelectVideo={selectedVideo => this.props.history.push(`/watch?v=${selectedVideo}`)}
                  {...this.state}
               />
              </VideoLists>
            </InfiniteScroll>
          }
        </main>
      </div>
    );
  }
}

export default Main;
