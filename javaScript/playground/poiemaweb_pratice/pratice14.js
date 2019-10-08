
function problem14() {
  console.log('14번 문제입니다.');
  const line = 5;
  let star = '';
  for (let i = line; i > 0; i--) {
    for (let j = i - 1; j > 0; j--) {
      star += ' ';
    }
    for (let k = i - 1; k < line; k++) {
      star += '*';
    }
    star += '\n';
  }

  console.log(star);
  console.log('-------------------');
}

problem14();
