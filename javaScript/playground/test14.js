function solution(N, stages) {
  let answer = [];
  // let totalStageLength = stages.length;
  const stage = [...stages].sort((a, b) => a - b);

  const rate = Array(N).fill(0);
  let nonClearUser = [];

  for (let i = 1; i <= N; i++) {
    nonClearUser = stage.splice(stage.indexOf(i), stage.lastIndexOf(i) + 1);
    // nonClearUser;


    // } else {
    //   rate[i - 1] = nonClearUser.length / stage.length;
    // }

    rate[i - 1] = nonClearUser.length / stage.length;
    if (Number.isNaN(rate[i - 1])) {
      rate[i - 1] = 0;
    }
  }

  // rate;

  // console.log(rate);
  // console.log(rate.indexOf(Math.max(...rate)));

  for (let i = 1; i <= N; i++) {
    answer[i - 1] = rate.indexOf(Math.max(...rate)) + 1;
    rate[rate.indexOf(Math.max(...rate))] = null;
  }

  // console.log(answer);

  return answer;
}


// solution(5, [2, 1, 2, 6, 2, 3, 3]);
solution(4, [4, 4, 4, 4, 4]);
