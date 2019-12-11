import React from 'react';
import axios from 'axios';
import Nav from './components/Nav/Nav'
import SearchBar from './components/SearchBar/SearchBar'
import { debounce } from 'lodash';
import VideoContent from './components/VideoContent/VideoContent'
// import VideoThumbnail from './components/VideoContent/VideoThumbnail'
import './App.css'
import VideoThumbnail from './components/VideoContent/VideoThumbnail';

const URL = 'https://www.googleapis.com/youtube/v3/search';
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      videoLists : [],
      query : null,
      nextPageToken : null
    }

    this.defaultState = this.state;
    this.getYoutube = this.getYoutube.bind(this);
    this.setInput = this.setInput.bind(this);
  }

  async getYoutube(query) {
    if (!query) return;
    if (this.state.query !== query) {
      this.setState(this.defaultState); // 이유 : 검색어가 바뀔경우 UI부분도 초기화되야되기 때문
    }

    const { nextPageToken } = this.state;
    const params = {
      key : 'AIzaSyCXndE4mNdeCpXWm-7iSu2kUzWuSsliCmc',
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

  setInput(input) {
    this.setState({ input })
  }

  render() {
    const { input } = this.state;
    return (
      <div className = 'App'>
        <Nav>
          <SearchBar input={input} setInput={this.setInput} onSearch={debounce(this.getYoutube,500)} />
        </Nav>
        <main className = 'main-content'>
          <VideoContent
            {...this.state}
          >
          </VideoContent>
        </main>
      </div>
    );
  }
}

export default App;
