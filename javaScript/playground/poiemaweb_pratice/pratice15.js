
function problem15() {
  console.log('15번 문제입니다.');
  const line = 5;
  let star = '';

  for (let i = 0; i < line; i++) {
    for (let j = 4; j > i; j--) {
      star += ' ';
    }
    for (let k = 0; k < (i * 2) + 1; k++) {
      star += '*';
    }
    star += '\n';
  }
  console.log(star);
  console.log('-------------------');
}

problem15();
