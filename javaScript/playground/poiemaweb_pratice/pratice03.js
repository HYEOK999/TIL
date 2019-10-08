function problem03() {
  console.log('3번 문제입니다.');
  let strNum = [];
  for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) {
      strNum += i;
    }
  }
  console.log(strNum);
  console.log('-------------------');
}

problem03();
