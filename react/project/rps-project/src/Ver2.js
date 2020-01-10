import React, { useEffect, useState, useRef, useReducer }from 'react'

const App = (props) => {
  // 0 ~ 2
  console.log('load');
  const [pick, setPick] = useState(null);
  const [myPick, setMyPick] = useState(null);
  const [winner, setWinner] = useState(null);
  const selectRef = useRef(null);

  const runGame = (value) => {
    const items = ['가위', '바위', '보'];
    const randomIndex = Math.floor(Math.random() * items.length);
    setPick(items[randomIndex]);
    setMyPick(value);

    // 여기서는 승패의 여부에 대한 로직을 구현할 수 없다.
  }

  useEffect(() => {
    let _winner = ''; // 누가 이겼는지 표현하기 위한 값 : 'computer' , 'user'
    // pick : 컴퓨터, myPick : 사용자가 클릭한 value
    if (pick === '가위') {
      if (myPick === '바위') _winner = 'user'
      if (myPick === '보') _winner = 'computer'
      if (myPick === '가위') _winner = 'none'
    } else if(pick === '바위' ) {
        if (myPick === '바위') _winner = 'none'
        if (myPick === '보') _winner = 'user'
        if (myPick === '가위') _winner = 'computer'
    } else if(pick === '보' ) {
        if (myPick === '바위') _winner = 'computer'
        if (myPick === '보') _winner = 'none'
        if (myPick === '가위') _winner = 'user'
    }
    setWinner(_winner);
    // 기록을 해주는 로직을 추가한다.
  }, [pick, myPick])

  useEffect(() => {
    console.log('컴퓨터, ', pick);
    console.log('사용자, ', myPick);
    console.log('우승자, ', winner);
  }, [winner])

  const handleSelectChange = () => {
    const value = selectRef.current.value;
    runGame(value);
    console.log(value); // useRef는 리렌더링을 유발하지 않는다.
  }

  return (
    <>
      {winner}
      <select ref={selectRef} onChange={handleSelectChange}>
        <option value="가위">가위</option>
        <option value="바위">바위</option>
        <option value="보">보</option>
      </select>
    </>
  );
}

export default App;