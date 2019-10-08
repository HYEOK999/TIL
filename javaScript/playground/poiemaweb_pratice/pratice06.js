function problem06() {
  console.log('6번 문제입니다.');
  let i = 10;

  while (i <= 10 && i > 0) {
    if (i % 2 !== 0) {
      console.log(i);
    }
    i--;
  }
  console.log('-------------------');
}

problem06();
