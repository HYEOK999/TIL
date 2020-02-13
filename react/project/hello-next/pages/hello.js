import React from 'react';

class Hello extends React.Component {
  static getInitialProps() {
    console.log('Get Initial Props');
    return {};
  }
  render() {
    return <div>Hello World 지롱.</div>;
  }
}

// const Hello = () => {

//   return <div>Hello 파일입니다.</div>
// };

export default Hello;
