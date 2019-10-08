function problem10() {
  console.log('10번 문제입니다.');

  for (let i = 1; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      if ((i + j) === 6) {
        console.log(`[ ${i}, ${j} ]`);
      }
    }
  }

  console.log('-------------------');
}

problem10();
