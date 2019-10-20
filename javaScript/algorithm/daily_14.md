![](https://images.velog.io/post-images/leejh3224/619516b0-e892-11e8-98f5-997ef3c38110/what-is-an-algorithm-featured.png)

------

문제 출처 : poiema 알고리즘 연습 문제

### 11. Check Palindrom

palindrome(팰린드롬/회문)은 왼쪽에서 오른쪽으로 읽은 다음, 오른쪽부터 왼쪽으로 다시 읽어도 똑같은 형태와 의미를 유지하는 문장이나 단어를 지칭한다. 인자로 전달한 문자열이 palindrome인지 검사하여 Boolean값을 반환하는 함수를 완성하라. 단, 반드시 1자 이상의 문자열을 인자로 전달한다.

```javascript
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
```

<br/>

### 12. 중복 요소 제거 **

인수로 전달된 배열의 요소 중에서 중복된 요소를 제외하고 유니크한 요소만을 반환하는 함수를 작성하라.

for 문은 사용하지 않도록 하자.

```javascript
function uniq(array) {
  return array.filter(function (item, index) {
    return array.indexOf(item) == index;
  });
}

console.log(uniq([2, 1, 2, 3, 4, 3, 4])); // [ 2, 1, 3, 4 ]
```

<br/>

### 13. 중복없는 배열 **

길이가 n인 배열에 1부터 n까지 숫자가 중복 없이 한 번씩 들어 있는지를 확인하려고 한다. 1부터 n까지 숫자가 중복 없이 한 번씩 들어 있는 경우 true를, 아닌 경우 false를 반환하도록 함수 isNotOverlapArray을 완성하라. 단, 배열의 요소는 정수이다.

예를 들어 주어진 배열이 [4, 1, 3, 2]이라면 true, [4, 1, 3] 또는 [1, 3]이라면 false를 반환한다.

```javascript
function isNotOverlapArray(array) {
  return array.every(function (currentValue, index) {
    return currentValue <= array.length && array.indexOf(currentValue) === index;
  });
}

console.log(isNotOverlapArray([4, 1, 3, 2])); // true
console.log(isNotOverlapArray([4, 1, 3]));    // false
console.log(isNotOverlapArray([1, 2, 2]));    // false
```

<br/>

### 14. 중복된 요소 ***

인수로 전달된 배열의 요소 중에서 중복된 요소만으로 구성된 배열을 반환하는 함수를 작성하라.

for 문은 사용하지 않도록 하자.

```javascript
function findDuplicated(array) {
  return array.filter(function (currentValue, index) {
    return array.indexOf(currentValue) !== index;
  });
}

console.log(findDuplicated([1, 2, 3, 4, 1, 2, 3])); // [ 1, 2, 3 ]
```

<br/>

### 15. 약수의 합

어떤 수를 입력받아 그 수의 약수를 모두 더한 수를 구하는 sumDivisor 함수를 완성하라. 예를 들어 12가 입력된다면 12의 약수는 [1, 2, 3, 4, 6, 12]가 되고, 총 합은 28이 되므로 28을 반환한다.

약수(約數, divisor)는 어떤 수를 나누었을 때 나머지가 0인 수를 말하며, 배수 관계와 서로 반대되는 개념이다

```javascript
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
```



<br/>