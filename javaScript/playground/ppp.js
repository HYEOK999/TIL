// 1. 짝수와 홀수 if문
function evenOrOdd(num) {
  if(num % 2 == 0) {
    return 'Even';
  }else {
    return 'Odd';
  }
}
console.log(evenOrOdd(2)); // Even
console.log(evenOrOdd(3)); // Odd
console.log(evenOrOdd(1000)); // Even

// 2. 1 ~ 10,000의 숫자 중 8이 등장하는 횟수 구하기 (Google)
function getCount8() {
  let count8 = 0;
  let countNum;
  for (let i = 1; i < 10001; i++) {
    countNum = i + '';
    for (let j = 0; j < countNum.length; j++ ) {
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
  if(s == undefined) {
    return false;
  }
  else if(s.length > 3 && s.length < 7 ){
    if(NaN || +s) {
      return true;
    }else {
      return false;
    }
  }
  else {
    return false;
  }
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

  if(s == undefined) return true;

  for(let i = 0; i < s.length; i++) {
    if( s[i] == 'p' || s[i] == 'P') {
      countP++;
      continue;
    }
    if( s[i] == 'y' || s[i] == 'Y') {
      countY++;
      continue;
    }
  }
  return Boolean(countP == countY);
}

console.log(numPY('pPooooyY')); // true
console.log(numPY('Pyy'));     // false
console.log(numPY('ab'));      // true
console.log(numPY(''));        // true
console.log(numPY());          // true


// 5.
function toWeirdCase(s) {
  let strArray = s.split(' ');
  let fullStr = '';
  for(let i = 0; i < strArray.length; i++){
    for(let j = 0; j < strArray[i].length; j++){
      if(j % 2 == 0) {
        fullStr += UpperCase(strArray[i][j]);
      }
      else {
        fullStr += LowerCase(strArray[i][j]);
      }
    }
    fullStr += ' ';
  }

  function UpperCase(s){
    return s.toUpperCase();
  }

  function LowerCase(s){
    return s.toLowerCase();
  }

  return fullStr;
}

console.log(toWeirdCase('hello world'));    // 'HeLlO WoRlD'
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
console.log(hideNumbers('027778888'));   // *****8888

// 7.
function strToInt(str) {
	return +str;
}

console.log(strToInt('1234'));  // 1234
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

console.log('n이 3인 경우: '+ waterMelon(3));
console.log('n이 4인 경우: '+ waterMelon(4));


//23. 인수로 주어진 배열 arr에서 짝수이고 3보다 큰 수만을 구하여 이를 배열로 반환하는 함수를 작성하라
function getArray(arr) {
  let numArray = [];
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] % 2 == 0 && arr[i] > 3) {
      numArray.push(arr[i]);
    }
  }

  return numArray;
}

console.log(getArray([1, 2, 3, 4, 5, 6])); // [ 4, 6 ]