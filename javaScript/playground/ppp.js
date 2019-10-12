// 1. 짝수와 홀수 if문
function evenOrOdd(num) {
  if (num % 2 == 0) {
    return 'Even';
  }
  return 'Odd';
}
console.log(evenOrOdd(2)); // Even
console.log(evenOrOdd(3)); // Odd
console.log(evenOrOdd(1000)); // Even

// 2. 1 ~ 10,000의 숫자 중 8이 등장하는 횟수 구하기 (Google)
function getCount8() {
  let count8 = 0;
  let countNum;
  for (let i = 1; i < 10001; i++) {
    countNum = String(i);
    for (let j = 0; j < countNum.length; j++) {
      if (countNum[j] == '8') {
        count8++;
      }
    }
  }
  return count8;
}
console.log(getCount8());

// 3.
function alphaString46(s) {
  if (s == undefined) {
    return false;
  }
  if (s.length > 3 && s.length < 7) {
    if (NaN || +s) {
      return true;
    }
    return false;
  }
  return false;
}
console.log(alphaString46('1234')); // true
console.log(alphaString46('9014')); // true
console.log(alphaString46('723')); // false
console.log(alphaString46('a234')); // false
console.log(alphaString46('')); // false
console.log(alphaString46()); // false


// 4.
function numPY(s) {
  let countP = 0;
  let countY = 0;

  if (s == undefined) return true;

  for (let i = 0; i < s.length; i++) {
    if (s[i] == 'p' || s[i] == 'P') {
      countP++;
    }
    if (s[i] == 'y' || s[i] == 'Y') {
      countY++;
    }
  }
  return Boolean(countP == countY);
}

console.log(numPY('pPooooyY')); // true
console.log(numPY('Pyy')); // false
console.log(numPY('ab')); // true
console.log(numPY('')); // true
console.log(numPY()); // true


// 5.
function toWeirdCase(s) {
  const strArray = s.split(' ');
  let fullStr = '';

  function UpCase(str) {
    return str.toUpperCase();
  }

  function LowCase(str) {
    return str.toLowerCase();
  }


  for (let i = 0; i < strArray.length; i++) {
    for (let j = 0; j < strArray[i].length; j++) {
      if (j % 2 == 0) {
        fullStr += UpCase(strArray[i][j]);
      } else {
        fullStr += LowCase(strArray[i][j]);
      }
    }
    fullStr += ' ';
  }

  return fullStr;
}

console.log(toWeirdCase('hello world')); // 'HeLlO WoRlD'
console.log(toWeirdCase('my name is lee')); // 'My NaMe Is LeE'

// 6.
function hideNumbers(str) {
  let answer = '';
  for (let i = 0; i < str.length - 4; i++) {
    answer += '*';
  }

  for (let i = str.length - 4; i < str.length; i++) {
    answer += str[i];
  }

  console.log(answer);
  return answer;
}

console.log(hideNumbers('01033334444')); // *******4444
console.log(hideNumbers('027778888')); // *****8888

// 7.
function strToInt(str) {
  return +str;
}

console.log(strToInt('1234')); // 1234
console.log(strToInt('-1234')); // -1234

// 8.
function waterMelon(n) {
  let answer = '';

  for (let i = 0; i < n; i++) {
    if (i % 2 == 0) {
      answer += '수';
    } else {
      answer += '박';
    }
  }
  return answer;
}

// console.log(`n이 3인 경우: ${waterMelon(3)}`);
// console.log(`n이 4인 경우: ${waterMelon(4)}`);
console.log(`n이 3인 경우: ${waterMelon(3)}`);
console.log(`n이 4인 경우: ${waterMelon(4)}`);

// 9.
function nextSqaure(n) {
  let answer = 0;
  if (n === undefined) return 'no';

  for (let i = 0; i <= n; i++) {
    if (i ** 2 === n) {
      answer = (i + 1) ** 2;
      break;
    } else {
      answer = 'no';
    }
  }
  return answer;
}

console.log(nextSqaure()); // no
console.log(nextSqaure(0)); // 1
console.log(nextSqaure(1)); // 4
console.log(nextSqaure(2)); // no
console.log(nextSqaure(3)); // no
console.log(nextSqaure(121)); // 144
console.log(nextSqaure(165)); // no
console.log(nextSqaure(400)); // 441

// 10.

function getMaxValueFromArray(array) {
  return Math.max.apply(null, array);
}
console.log(getMaxValueFromArray([3, 6, -2, -5, 7, 3])); // 7

function getMinValueFromArray(array) {
  return Math.min.apply(null, array);
}
console.log(getMinValueFromArray([3, 6, -2, -5, 7, 3])); // -5

// 11.
function checkPalindrom(str) {
  if (str.length < 1 || str == undefined) return false;
  let j = str.length;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[j - 1]) {
      j--;
    } else {
      return false;
    }
  }
  return true;
}

console.log(checkPalindrom('dad')); // true
console.log(checkPalindrom('mom')); // true
console.log(checkPalindrom('palindrom')); // false
console.log(checkPalindrom('s')); // true

// 12.
function uniq(array) {
  return array.filter(function (item, index) {
    return array.indexOf(item) == index;
  });
}

console.log(uniq([2, 1, 2, 3, 4, 3, 4])); // [ 2, 1, 3, 4 ]


// 13.
function isNotOverlapArray(array) {
  return array.every(function (currentValue, index) {
    return currentValue <= array.length && array.indexOf(currentValue) === index;
  });
}

console.log(isNotOverlapArray([4, 1, 3, 2])); // true
console.log(isNotOverlapArray([4, 1, 3])); // false
console.log(isNotOverlapArray([1, 2, 2])); // false

// 14.
function findDuplicated(array) {
  return array.filter(function (currentValue, index) {
    return array.indexOf(currentValue) !== index;
  });
}

console.log(findDuplicated([1, 2, 3, 4, 1, 2, 3])); // [ 1, 2, 3 ]

// 15.
function sumDivisor(num) {
  let result = 0;
  for (let i = 1; i <= num; i++) {
    if (num % i == 0) {
      result += i;
    }
  }

  return result;
}

console.log(sumDivisor(12)); // 28
// 16.
function numberOfPrime(n) {
  let result = 0;
  let count = 0;
  for (let i = 2; i <= n; i++) {
    count = 0;
    for (let j = 1; j <= i; j++) {
      if (i % j == 0) {
        count++;
      }
    }
    if (count == 2) {
      result++;
    }
  }

  return result;
}

console.log(numberOfPrime(10)); // 4

// 17.
function fibonacci(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(2)); // 1
console.log(fibonacci(3)); // 2
console.log(fibonacci(4)); // 3
console.log(fibonacci(5)); // 5
console.log(fibonacci(6)); // 8

// 18.
function digitSum(n) {
  if (n < 0 || n > 100000000) return false;
  const number = String(n);
  let answer = 0;

  for (let i = 0; i < number.length; i++) {
    answer += +number[i];
  }

  return answer;
}

console.log(digitSum(123)); // 6
console.log(digitSum(987)); // 24
console.log(digitSum(100000001));// false

// 19.
function isHarshad(n) {
  const number = String(n);
  let result = 0;

  for (let i = 0; i < number.length; i++) {
    result += +number[i];
  }

  console.log(result);

  return number % result === 0;
}

console.log(isHarshad(10)); // true
console.log(isHarshad(12)); // true
console.log(isHarshad(18)); // true
console.log(isHarshad(11)); // false
console.log(isHarshad(13)); // false

// 20.
function generateRange(from, to) {
  const res = [];

  for (let i = from; i <= to; i++) {
    res.push(i);
  }

  return res;
}
console.log(generateRange(10, 15)); // [ 10, 11, 12, 13, 14, 15 ]

// 21.
function adder(x, y) {
  if (x === y) return x;

  let answer = 0;

  for (let i = x; i <= y; i++) {
    answer += i;
  }

  return answer;
}

console.log(adder(3, 5)); // 12

// 22.
function adjacentElementsProduct(arr) {
  const TEMP = [];

  for (let i = 1; i < arr.length; i++) {
    TEMP.push(arr[i - 1] * arr[i]);
  }

  return Math.max.apply(0, TEMP);
}

console.log(adjacentElementsProduct([3, 6, -2, -5, 7, 3])); // 21

// 23. 인수로 주어진 배열 arr에서 짝수이고 3보다 큰 수만을 구하여 이를 배열로 반환하는 함수를 작성하라
function getArray(arr) {
  const numArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 == 0 && arr[i] > 3) {
      numArray.push(arr[i]);
    }
  }

  return numArray;
}

console.log(getArray([1, 2, 3, 4, 5, 6])); // [ 4, 6 ]

// 24.
function average(array) {
  let answer = 0;
  for (let i = 0; i < array.length; i++) {
    answer += array[i];
  }

  return answer / array.length;
}

console.log(average([5, 3, 4])); // 4

// 25.
function findMinDistance(array) {
  const temp = [];
  const ANSWER = [];

  for (let i = 1; i < array.length; i++) {
    temp.push(array[i] - array[i - 1]);
  }

  console.log(array.length);
  console.log(temp.length);


  for (let i = 0; i < temp.length; i++) {
    if (temp[i] == Math.min.apply(0, temp)) {
      ANSWER.push([array[i], array[i + 1]]);
      console.log(ANSWER);
      console.log(temp);
    }
  }
  return ANSWER;
}

// 1차원 점의 배열
const array = [1, 3, 4, 8, 13, 17, 20, 23, 24];
console.log(findMinDistance(array)); // [[3, 4], [23, 24]]

// 26.
function specialSort(array2) {
  // let negativeArray = [];
  // let positiveArray = [];

  // for (let i = 0; i < array.length; i++) {
  //   if (array[i] < 0) {
  //     negativeArray.push(array[i]);
  //   } else {
  //     positiveArray.push(array[i]);
  //   }
  // }

  // console.log(negativeArray.sort());
  // console.log(positiveArray.sort());
  return array2.sort();
}

const testArray = [-1, 1, 3, -2, 2, 0];

console.log(testArray); // [ -1, 1, 3, -2, 2, 0 ]
console.log(specialSort(testArray)); // [ -1, -2, 0, 1, 2, 3 ]

// 27.
function getDayName(a, b) {
  let answer = '';
  const dayOfTheWeek = ['FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU'];
  let j = 0;

  for (let month = 1; month <= a; month++) {
    switch (month) {
      case 1: case 3: case 5: case 7: case 8: case 10: case 12:
        for (let x = 1; x <= 31; x++) {
          if (month == a && x == b) {
            answer = dayOfTheWeek[j];
            break;
          } else {
            j++;
            if (j == 7) {
              j = 0;
            }
          }
        }
        break;
      case 4: case 6: case 9: case 11:
        for (let x = 1; x <= 30; x++) {
          if (month == a && x == b) {
            answer = dayOfTheWeek[j];
            break;
          } else {
            j++;
            if (j == 7) {
              j = 0;
            }
          }
        }
        break;
      default:
        for (let x = 1; x <= 29; x++) {
          if (month == a && x == b) {
            answer = dayOfTheWeek[j];
            break;
          } else {
            j++;
            if (j == 7) {
              j = 0;
            }
          }
        }
        break;
    }
  }

  return answer;
}

console.log(getDayName(5, 24)); // TUE

function getDayNameOther(a, b) {
  let month = String(a);
  let day = String(b);
  const week = ['SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT'];

  if (month.length < 2) {
    month = `0${month}`;
  }

  if (day.length < 2) {
    day = `0${day}`;
  }

  let answer = week[new Date(`2016-${month}-${day}`).getDay()];

  return answer;
}


console.log(getDayNameOther(5, 24)); // TUE
console.log(getDayNameOther(1, 1)); // TUE
