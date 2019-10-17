const arrs = [1,1,3,3,0,1,1];
function solution(arr) {
  let answer = [];

  answer = arr.filter(function (currentValue, index) {
    return currentValue !== arr[index - 1];
  });
  console.log(answer);
  return answer;
}

console.log(solution(arrs));
