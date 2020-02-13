// express
const express = require('express');
const path = require('path');

const ReactDOMServer = require('react-dom/server');
const React = require('react');
const fs = require('fs');

const app = express();

// app.get('/api/books', (req, res) => {
//   res.json(['hello', 'world']);
// });

// static 파일을 요청했는데 있으면 그걸 준다.
// use 미들웨어 같은거를 실행해줌.
app.use(express.static(path.join(__dirname, 'build')));

// 그 외 어떤 요청이 와도 index.html 을 준다.
// 새로고침 처리
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
app.get('*', (req, res) => {
  const string = ReactDOMServer.renderToString(
    React.createElement('div', null, 'Hello World!'),
  );
  //리액트 컴포넌트를 렌더링 해서 얻은 문자열 덩어리를, id가 root인 div안에 넣어야한다.

  const indexPath = path.join(__dirname, 'build', 'index.html');
  const indexString = fs.readFileSync(indexPath).toString();
  const responseData = indexString.replace(
    '<div id="root"></div>',
    `<div id="root">${string}</div>`,
  ); // index.html의 XXXXXXX를 string으로 대체한다.
  console.log(responseData);
  res.send(responseData);
});

app.listen(9000, () => {
  console.log('server start...');
});
