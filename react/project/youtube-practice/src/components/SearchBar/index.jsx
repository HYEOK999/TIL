import React from 'react';
import loupe from './images/loupe.png';
import './SearchBar.css';

import { connect } from 'react-redux';
import { updateQuery } from '../../actions'
import { bindActionCreators} from 'redux';

const SearchBar = props => {
  // const handleEnter = search => e =>  {
  //   if (e.key === 'Enter') {
  //     search(e.target.value)
  //   }
  // }

  let input = '';

  return (
    <div className="search-wrapper">
      <input
       ref = {ref => (input = ref)}
       type="search"
       className="search-bar"
       placeholder="검색어를 입력하세요"
       defaultValue = { props.query || '' }
       autoFocus
      //  onKeyPress = { handleEnter(props.onSearch) }
       onChange={props.onSearch}
      />
      <button className="btn-search" onClick={() => props.onSearch(input.value)}>
        <img className="search-icon" src={loupe} alt="검색" />
      </button>
    </div>
  );
}


function mapStateToProps(state) {
  return {
    query : state.videoInfo.query
   }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateQuery
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);