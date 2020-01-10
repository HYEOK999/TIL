import React, { useEffect, useState, useRef, useReducer }from 'react'

const reducer = (state, action) => {
  const data = state.history;
  // eslint-disable-next-line default-case
  switch (action.type) {
    case 'ADD':
      return {
        ...state, // 게임 기록 유지
        history : data
          ? [
            ...data,
            action.newGame
          ]
          : [action.newGame]
      }
    case 'RESULT' :
      let _comWin, _userWin
      if(action.winner === 'computer') {
        _comWin = state.comWin
          ? parseInt(state.comWin, 10) + 1
          : 1
      }
      if(action.winner === 'user') {
        _userWin = state.userWin
        ? parseInt(state.userWin, 10) + 1
        : 1
      }
      // if(action.winner === 'none') {
      //   _comWin = state.comWin;
      //   _userWin = state.userWin;
      // }
      return {
        ...state,
        comWin: _comWin || state.comWin,
        userWin: _userWin || state.userWin
      }
    case 'RESET':
      return {};
  }
}

const App = (props) => {
  // 0 ~ 2
  console.log('load');
  const [pick, setPick] = useState(null);
  const [myPick, setMyPick] = useState(null);
  const [winner, setWinner] = useState(null);
  const selectRef = useRef(null);
  const [state, dispatch] = useReducer(reducer, []);

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

    // 기록을 해주는 로직을 추가한다.
    if (_winner) {
      setWinner(_winner);
      dispatch({ type: 'ADD', newGame: `${_winner}가 이겼습니다.(컴퓨터: ${pick} / 유저: ${myPick})` })
      dispatch({ type: 'RESULT', winner: _winner})
    }
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

  const { history, comWin, userWin } = state
  return (
    <>
      우승자 : {winner}
      <br/>
      컴퓨터 : {comWin || 0} / 유저 : {userWin || 0}
      <br/>
      <select ref={selectRef} onChange={handleSelectChange}>
        <option value="가위">가위</option>
        <option value="바위">바위</option>
        <option value="보">보</option>
      </select>
      <button onClick={() => dispatch({type: 'RESET'})}>초기화</button>
      {
        history && history.map((h, index) => <h1 key={index}>{h}</h1> )
      }
    </>
  );
}

export default App;