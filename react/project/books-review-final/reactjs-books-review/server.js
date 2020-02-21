const express = require('express');
const path = require('path');
const fs = require('fs');

const ReactDOMServer = require('react-dom/server');
const React = require('react');

const app = express();

// app.get('/api/books', (req, res) => {
//   res.json(['hello', 'world']);
// });

// static 파일을 요청했는데 있으면 그걸 준다.
// use 미들웨어 같은거를 실행해줌.
app.use(express.static(path.join(__dirname, 'build')));

// 그 외 어떤 요청이 와도 index.html 을 준다.
app.get('*', (req, res) => {
  const string = ReactDOMServer.renderToString(
    React.createElement('div', null, 'Hello World'),
  );
  // 리액트 컴포넌트를 랜더링 해서 얻은 문자열 덩어리를, id 가 root 인 div 안에 넣어야 한다.

  const indexPath = path.join(__dirname, 'build', 'index.html');

  const indexString = fs.readFileSync(indexPath).toString();

  const responseData = indexString.replace(
    '<div id="root"></div>',
    `<div id="root">${string}</div>`,
  );

  console.log(responseData);

  res.send(responseData);
});

app.listen(9000, () => {
  console.log('server started...');
});
