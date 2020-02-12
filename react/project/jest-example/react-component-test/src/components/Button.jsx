import React, { useState, useEffect, useRef } from 'react';

const MESSAGE = {
  INIT: '버튼이 눌리지 않았다.',
  CLICKED: '버튼이 방금 눌렸다.',
};

const Button = () => {
  const [message, setMessage] = useState(MESSAGE.INIT);
  const timer = useRef(null);
  function click() {
    if (timer.current !== null) clearTimeout(timer.current);
    setMessage(MESSAGE.CLICKED);
    timer.current = setTimeout(() => {
      setMessage(MESSAGE.INIT);
    }, 5000);
  }

  useEffect(() => {
    return () => {
      if (timer.current !== null) clearTimeout(timer.current);
    };
  }, []);

  return (
    <>
      <button onClick={click} disabled={message === MESSAGE.CLICKED ? true : false}>
        button
      </button>
      <p>{message}</p>
      <span>hello</span>
    </>
  );
};
export default Button;
