function solution(heights) {
  const answer = [0];
  const arr = [heights[0]];
  let full = 0;
  let count = 0;

  for (let i = 1; i < heights.length; i++) {
    arr.push(heights[i]);
    count = 0;
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] > heights[i]) {
        full = j + 1;
        count++;
      }
    }
    if (count == 0) {
      answer.push(0);
    } else {
      answer.push(full);
    }
  }

  return answer;
}

solution([3, 9, 9, 3, 5, 7, 2]);
