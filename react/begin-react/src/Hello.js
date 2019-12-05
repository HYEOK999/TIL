import React from 'react';

const a = null;

function Hello({color, name, isSpecial}) {
  return <div style={{ color }}>
    {isSpecial ? <b>*</b> : ''}
    안녕하세요 {name}
    {a}
  </div>
  {/* 비구조화 할당 디스트럭처링 */}
}

export default Hello;