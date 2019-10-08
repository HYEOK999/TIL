function problem16() {
  console.log('16번 문제입니다.');
  const line = 5;
  let star = '';
  for (let i = line; i > 0; i--) {
    for (let j = line; j > i; j--) {
      star += ' ';
    }
    for (let k = 0; k < (i * 2) - 1; k++) {
      star += '*';
    }
    star += '\n';
  }

  console.log(star);
  console.log('-------------------');
}
problem16();
