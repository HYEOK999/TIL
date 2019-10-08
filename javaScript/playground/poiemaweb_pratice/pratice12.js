function problem12() {
  console.log('12번 문제입니다.');
  const line = 5;
  let star = '';

  for (let i = 0; i < line; i++) {
    // for (let x = 0; x <= i; x++) {
    //   star += ' ';
    // }
    // for (let j = i; j < line; j++) {
    //   star += '*';
    // }
    // star += '\n';

    // 다른방법
    for (let x = 0; x < line; x++) {
      if (x < i) {
        star += ' ';
      }
    }
    for (let j = 0; j < line; j++) {
      if (j >= i) {
        star += '*';
      }
    }
    star += '\n';
  }

  console.log(star);
  console.log('-------------------');
}

problem12();
