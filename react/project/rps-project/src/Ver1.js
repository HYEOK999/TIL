import React, { useEffect, useState, useRef }from 'react'

const App = (props) => {
  // 0 ~ 2
  console.log('load');
  const [pick, setPick] = useState(null);
  const [myPick, setMyPick] = useState(null);
  const [winner, setWinner] = useState(null);

  const runGame = (value) => {
    const items = ['가위', '바위', '보'];
    const randomIndex = Math.floor(Math.random() * items.length);
    setPick(items[randomIndex]);
    setMyPick(value);
    // 여기서는 승패의 여부에 대한 로직을 구현할 수 없다.
  }

  // useEffect(() => {
  //   console.log('컴퓨터, ', pick);
  // }, [pick])

  // useEffect(() => {
  //   console.log('사용자, ', myPick);
  // }, [myPick])

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
  }, [pick, myPick])

  useEffect(() => {
    console.log('컴퓨터, ', pick);
    console.log('사용자, ', myPick);
    console.log('우승자, ', winner);
  }, [winner])

  return (
    <>
      {winner}
      <button onClick={() => runGame('가위')}>가위</button>
      <button onClick={() => runGame('바위')}>바위</button>
      <button onClick={() => runGame('보')}>보</button>
    </>
  );
}

export default App;