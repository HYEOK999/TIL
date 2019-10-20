function solution(progresses, speeds) {
  var answer = [];
  let booleanValue;
  let count;

  while (progresses.length) {
    booleanValue = false;
    count = 0;
    for (let i = 0; i < progresses.length; i++) {
      progresses[i] += speeds[i];
    }

    while (progresses.length != 0 && progresses[0] >= 100) {
      booleanValue = true;
      count++;
      progresses.shift();
      speeds.shift();
    }
    if (booleanValue == true) {
      answer.push(count);
    }
  }

  return answer;
}

solution([93, 30, 55], [1, 30, 5]);
