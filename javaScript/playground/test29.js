function solution(nums) {
  // var answer = 0;

  const answer = nums.sort();
  const len = Math.floor(nums.length / 2);
  let count = 0;

  console.log(answer);
  console.log();

  answer.forEach((item, index) => {
    console.log(item);
    console.log(answer[index - 1]);
    return item !== answer[index - 1] ? count++ : ' ';
  });

  return count >= len ? len : count;
}

// solution([3, 3, 3, 2, 2, 4]);
// 3
solution([3, 3, 3, 2, 2, 2]); // 2
