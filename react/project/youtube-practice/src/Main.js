import React from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';
import uuid from 'uuid';
import qs from 'query-string';

import './App.css';

import SearchBar from './components/SearchBar';
import Nav from './components/Nav';
import VideoLists from './components/VideoLists/VideoLists';
import VideoContent from './components/VideoLists/VideoContent';
import spinner from './components/images/spinner.gif';
// import VideoPlayer from './components/VideoPlayer/VideoPlayer';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateQuery } from './actions';

const URL = 'https://www.googleapis.com/youtube/v3/search';

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      videoLists : [],
      nextPageToken : '',
      // selectedVideo : null
    }

    Object.getOwnPropertyNames(Main.prototype).forEach(
      key => (this[key] = this[key].bind(this))
    );

    this.defaultState = this.state;
    // this.getYoutube = this.getYoutube.bind(this);
    // this.setVideoId = this.setVideoId.bind(this);
    // this.setInput = this.setInput.bind(this);
  }

  _getYoutubeData = debounce(async (query, isChanged) => {
    if (isChanged) {
      this.setState(this.defaultState);
    }

    const { nextPageToken } = this.state;
    const params = {
      key : process.env.REACT_APP_YOUTUBE_API_KEY,
      q : query,
      part : 'snippet',
      maxResults: 10,
      pageToken : nextPageToken
    }

    try {
      const res = await axios.get( URL, { params });
      this.setState({
        videoLists : [...this.state.videoLists,...res.data.items],
        nextPageToken: res.data.nextPageToken
      })
    } catch (error) {
      console.error(error);
    }
  }, 550 );

  getYoutubeData(query) {
    let isChanged = false;
    if(this.props.query !== query) {
      isChanged = true;
      this.props.updateQuery(query);
    }
    this._getYoutubeData(query, isChanged);
  }

  // async componentWillMount(){
  //   await this.getYoutube('여행');
  // }

  componentDidMount() {
    const { props } = this;
    if (props.location) { // 방어코드. lacation이 주입되기까지 기다린다.
      const { search_query } = qs.parse(props.location.search);
      if(search_query) this.getYoutubeData(search_query || '');
    }
  }

  componentDidUpdate(prevProps) { //prevState도 있다.
    const { props } = this;
    // props는 최신값, 따라서 방어코드를 작성한다.
    if ( props.location ) {
      const { search_query } = qs.parse(props.location.search)
      const { search_query : prev } = qs.parse(prevProps.location.search)
      if( search_query !== prev ) { // 중요한 방어코드
        this.getYoutubeData(search_query || '')  // undefined가 나올경우 '여행'을 띄운다.
      }
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
          {/* <SearchBar input={input} setInput={this.setInput} onSearch={debounce(this.getYoutubeData,500)} /> */}
          <SearchBar onSearch={e =>
            {
              this.props.history.push(`/results?search_query=${e.target.value}`);
            }
          }
          />
        </Nav>
        <main className = 'main-content'>
          <InfiniteScroll
              loadMore = {() => this.getYoutubeData(this.props.query)}
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
        </main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    query : state.videoInfo.query
   }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    // bindActionCreators : 액션크리에이터를 여기에 나열해준다.
    updateQuery
    // ++ actions의 add함수가 여기에 바인딩 되어야한다.
  }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Main);

