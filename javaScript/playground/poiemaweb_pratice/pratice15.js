
function problem15() {
  console.log('15번 문제입니다.');
  const LINE = 5;
  let star = '';

  for (let i = 0; i < LINE; i++) {
    for (let j = LINE - 1; j > i; j--) {
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
