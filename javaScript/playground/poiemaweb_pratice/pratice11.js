function problem11() {
  console.log('11번 문제입니다.');
  const line = 5;
  let star = '';

  for (let i = 0; i < line; i++) {
    for (let j = 0; j <= i; j++) {
      star += '*';
    }

    // 다른 방법
    // for (let j = 0; j <= line; j++) {
    //   if (j <= i) {
    //     star += '*';
    //   }
    // }

    star += '\n';
  }

  console.log(star);
  console.log('-------------------');
}

problem11();
