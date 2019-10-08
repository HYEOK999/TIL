
function problem08() {
  console.log('8번 문제입니다.');
  let sum = 0;

  for (let i = 1; i < 20; i++) {
    if (i % 2 !== 0 && i % 3 !== 0) {
      sum += i;
    }
  }

  console.log(sum);
  console.log('-------------------');
}

problem08();
