const clothes = [['yellow_hat', 'headgear'], ['blue_sunglasses', 'eyewear'], ['green_turban', 'headgear']];

function solution(test) {
  const answer = test.length;
  const clothes_find = test.map((a) => a[1]);

  const abc = clothes_find.forEach((find) => {
    test.filter((a) => a[1] == find);
  });

  console.log(clothes_find);
  console.log(abc);

  return answer;
}


console.log(solution(clothes));
