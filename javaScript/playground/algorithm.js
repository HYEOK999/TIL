let answers = [1, 2, 3, 4, 5];

function solution(answers) {
  let answer = [];
  let student = {
    s1: [1, 2, 3, 4, 5],
    s2: [2, 1, 2, 3, 2, 4, 2, 5],
    s3: [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]
  };
  let answerNum = [0, 0, 0];
  let maxNum = 0;
  let i = 0;
  let j = 0;

  for (i = 0; i < answers.length; i++) {
    if (j === student.s1.length) {
      j = 0;
    }

    if (answers[i] === student.s1[j]) {
      answerNum[0]++;
    }
    j++;
  }

  j = 0;
  for (i = 0; i < answers.length; i++) {
    if (j === student.s2.length) {
      j = 0;
    }

    if (answers[i] === student.s2[j]) {
      answerNum[1]++;
    }
    j++;
  }

  j = 0;
  for (i = 0; i < answers.length; i++) {
    if (j === student.s3.length) {
      j = 0;
    }

    if (answers[i] === student.s3[j]) {
      answerNum[2]++;
    }
    j++;
  }
  console.log(answerNum);
  maxNum = Math.max.apply(null, answerNum);

  for (i = 0; i < 3; i++) {
    if (answerNum[i] === maxNum) {
      answer.push(i + 1);
    }
  }
  answer.sort();

  return answer;
}
console.log(solution(answers));
