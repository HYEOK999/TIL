function solution(array, commands) {
  var answer = [];
  let tempArray = [];

  for (let i = 0; i < commands.length; i++) {
    tempArray = array.slice((commands[i][0]) - 1, commands[i][1]);
    console.log(tempArray);
    tempArray.sort((a, b) => a - b);
    // tempArray.sort(function(a, b) { return a - b; });
    answer.push(tempArray[commands[i][2] - 1]);
  }

  return answer;
}

// console.log(solution([1, 5, 2, 6, 3, 7, 4], [[2, 5, 3], [4, 4, 1], [1, 7, 3]]));
