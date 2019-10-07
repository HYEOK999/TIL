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
  let arrayNum = 0;
  let i = 0;
  let j = 0;
  let keysArr;

  for (arrayNum = 0; arrayNum < 3; arrayNum++) {
    keysArr = Object.keys(student)[arrayNum];

    for (i = 0; i < answers.length; i++) {
      if (j === student[keysArr].length) {
        j = 0;
      }

      if (answers[i] === student[keysArr][j]) {
        answerNum[arrayNum]++;
      }
      j++;
    }
    j = 0;
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
