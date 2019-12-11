import React from 'react';
import './SearchBar.css';
import searchIcon from '../images/loupe.png'

const SearchBar = props => {
  // HOC: High order components
  const handleEnter = search => e => {
    if (e.key === 'Enter') {
      search(e.target.value)
    }
  }

  let input;
  return (
    <div className="search-wrapper">
      <input
        ref = {ref => (input = ref)}
        type="search"
        // onChange={e => props.setInput(e.target.value)}
        onKeyPress={handleEnter(props.onSearchVideos)}
        // onKeyPress={e => e.key === 'Enter' ? props.onSearchVideos(e.target.value) : null}
        className="search-bar"
        placeholder="검색어를 입력하세요"
      />

      <button className="btn-search" onClick={() => props.onSearchVideos(input.value)}>
        <img className='search-icon' src={searchIcon} alt="검색"/>
      </button>
    </div>
  )
};
export default SearchBar;