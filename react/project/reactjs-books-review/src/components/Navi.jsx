import React from 'react';
import { Link } from 'react-router-dom';

const Navi = ({ logout }) => {
  function click() {
    logout();
  }

  return (
    <div>
      <button onClick={click}> 로그아웃 </button>
      <Link to="/signin">로그인 화면으로 가기</Link>
    </div>
  );
};

export default Navi;
