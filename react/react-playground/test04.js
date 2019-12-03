function solution(s) {
  let count = 0;
  let temp = '';
  let obj = [];

  if (s.length === 1) return 1;

  while (true) {
    if (count >= Math.floor(s.length / 2)) break;

    count++;
    let array = strToArr(s, count);
    console.log(array);

    let coin = 1;

    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] === array[i + 1]) {
        coin++;
        // temp = temp + coin + array[i];
        console.log(temp);
      } else {
        if (coin === 1) temp += array[i];
        else temp += coin + array[i];
        coin = 1;
      }
    }
    if (coin === 1) temp += array[array.length - 1];
    else temp += coin + array[array.length - 1];
    // temp += array[array.length - 1];
    // temp += coin + array[array.length - 1];
    // temp = temp.replace(1, '');
    console.log(temp);
    obj.push(temp.length);
    temp = '';
  }

  // 함수
  function strToArr(str, counts) {
    let arr = str;
    let subArr = [];

    while (true) {
      subArr.push(arr.substring(0, counts));
      arr = arr.slice(-(arr.length) + counts);

      if (arr.length <= counts || arr == '') {
        subArr.push(arr);
        break;
      }
      console.log(arr);
      // if (arr === '') break;
    }
    return subArr;
  }
  // 함수 끝

  console.log(obj);
  return Math.min(...obj);
}

// console.log(solution('aabbaccc'));
// console.log(solution('ababcdcdababcdcd'));
// console.log(solution('abcabcdede'));
console.log(solution('abcabcabcabcdededededede'));
// console.log(solution('xababcdcdababcdcd'));
