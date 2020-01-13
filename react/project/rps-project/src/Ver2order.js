import React,
{
  useState,
  useEffect,
  useRef
} from 'react';
// ver. 1
function Game() {
  console.log('1. load');
  const [pick, setPick] = useState('');
  const [myPick, setMyPick] = useState('');
  const [winner, setWinner] = useState('');
  const selRef = useRef(null); // ver. 2
  const runGame = val => {
    const items = ['가위', '바위', '보'];
    const ranIdx = Math.floor(Math.random() * items.length);
    setPick(items[ranIdx]);
    setMyPick(val);
  };
  useEffect(() => {
    console.log('3. useEffect1')
    let _winner;
    if (pick === '가위') {
      if (myPick === '가위') _winner = 'none';
      if (myPick === '바위') _winner = 'you';
      if (myPick === '보') _winner = 'com';
    } else if (pick === '바위') {
      if (myPick === '가위') _winner = 'com';
      if (myPick === '바위') _winner = 'none';
      if (myPick === '보') _winner = 'you';
    } else {
      if (myPick === '가위') _winner = 'you';
      if (myPick === '바위') _winner = 'com';
      if (myPick === '보') _winner = 'none';
    }
    setWinner(_winner);
  }, [pick, myPick]);
  useEffect(() => {
    console.log('4. useEffect2')
    console.log('winner is ' + winner);
  }, [winner]);
  const handleSelChange = () => {
    const val = selRef.current.value;
    runGame(val);
    console.log(val);
  }
  // 1 2 3 4 1 2

  return (
    <>
      {winner}
      {(() => console.log('2. render'))()}
      <select ref={selRef} onChange={handleSelChange}>
        <option value="가위">가위</option>
        <option value="바위">바위</option>
        <option value="보">보</option>
      </select>
    </>
  );
}
export default Game;