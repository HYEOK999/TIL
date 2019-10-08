
function problem13() {
  console.log('13번 문제입니다.');
  const line = 5;
  let star = '';

  for (let i = line; i > 0; i--) {
    for (let j = 1; j <= i; j++) {
      star += '*';
    }
    star += '\n';
  }

  console.log(star);
  console.log('-------------------');
}


problem13();
