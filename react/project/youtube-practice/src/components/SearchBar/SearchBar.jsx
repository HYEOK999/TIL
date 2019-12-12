import React from 'react';
import loupe from './images/loupe.png';
import './SearchBar.css';

const SearchBar = props => {

  const handleEnter = search => e =>  {
    if (e.key === 'Enter') {
      search(e.target.value)
    }
  }

  let input = '';

  return (
    <div className="search-wrapper">
      <input
       ref = {ref => input = ref}
       type="search"
       className="search-bar"
       placeholder="검색어를 입력하세요"
       autoFocus
       onKeyPress = { handleEnter(props.onSearch) }
       // onChange = {(e) => props.onSearch(e.target.value) }
      />
      <button className="btn-search" onClick={() => props.onSearch(input)}>
        <img className="search-icon" src={loupe} alt="검색" />
      </button>
    </div>
  );
}

export default SearchBar;