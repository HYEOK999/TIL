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

  return (
    <div className="search-wrapper">
      <input
        type="text"
        onChange={e => props.setInput(e.target.value)}
        onKeyPress={handleEnter(props.onSearchVideos)}
        className="search-bar"
        placeholder="검색어를 입력하세요"
      />

      <button className="btn-search" onClick={() => props.onSearch(props.input)}>
        <img className='search-icon' src={searchIcon} alt="검색"/>
      </button>
    </div>
  )
};
export default SearchBar;