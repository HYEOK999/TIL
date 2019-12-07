import React from 'react';
import './App.css';
import Axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list : [],
      subList : [],
    }

    this.sort = this.sort.bind(this);
    // Object.getOwnPropertyNames(App.prototype).forEach(key => this[key] = this[key].bind(this))
  }

  // async getYoutubeData(query) {
  //   try {
  //     const { data } = await Axios.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCT5YNj0WpEUrt_4K8b3GZ6NoBZTOImXMA&q=${query}&part=snippet`)
  //     this.setState({list : data.items });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  async getYoutubes(target, keyCode) {
    if(keyCode !== 13 || target.value.trim() === '') return;

    try {
      const { data } = await Axios.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCT5YNj0WpEUrt_4K8b3GZ6NoBZTOImXMA&q=${target.value.trim()}&part=snippet`)
      this.setState({ subList : data.items });
    } catch (error) {
      console.error(error);
    }
  }

  sort(){
    this.setState( {subList : this.state.subList.reverse()})
  }
  /*
  getYoutubeData(query) {
    const data = '';
    Axios.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCT5YNj0WpEUrt_4K8b3GZ6NoBZTOImXMA&q=${query}&part=snippet`)
      .then((res) => data = res.data)
      .catch((err) => console.log(err));
    this.setState({ data })
  }
  // */
  // componentDidMount() {
  //   this.getYoutubeData('여행');
  // }

  render () {
  return (
      <div>
        {/* <button onClick={() => this.getYoutubeData('여행')}>
          렌더링
        </button>
        <div>
          {this.state.list.map(item => {
            console.log(item.id.videoId);
            return <div key={item.id.videoId}>{item.snippet.title}</div>;
          })}
        </div> */}
        <div>
          <input type="text" onKeyDown={({target, keyCode}) => this.getYoutubes(target, keyCode)}></input>
        </div>
        <div>
          {this.state.subList.map(item => {
            console.log(item.id.videoId)
            return <div key={item.id.videoId}>{item.snippet.title}</div>
          })}
        </div>
        <button onClick={this.sort}>sort</button>
      </div>
    );
  }
}
export default App;