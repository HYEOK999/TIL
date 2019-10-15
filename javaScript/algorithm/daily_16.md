![](https://images.velog.io/post-images/leejh3224/619516b0-e892-11e8-98f5-997ef3c38110/what-is-an-algorithm-featured.png)

------

문제 출저 : poiema 알고리즘 연습 문제



### 21. 두 정수 사이의 합

adder 함수는 정수 x, y를 인수로 전달받는다. 두 수와 두 수 사이에 있는 모든 정수를 더해서 리턴하도록 함수를 완성하라.

x와 y가 같은 경우는 둘 중 아무 수나 리턴한다. x, y는 음수나 0, 양수일 수 있으며 둘의 대소 관계도 정해져 있지 않다.

예를 들어 x가 3, y가 5이면 12를 리턴한다.

```javascript
function adder(x, y) {
  if (x === y) return x;

  let answer = 0;

  for (let i = x; i <= y; i++) {
    answer += i;
  }

  return answer;
}

console.log(adder(3, 5)); // 12
```

<br/>



### 22. 배열의 인접한 요소곱 중 가장 큰 값 구하기

인수로 주어진 정수의 배열에서 인접한 요소의 곱이 가장 큰 값을 반환하는 함수를 완성하라. 예를 들어 인수가 [3, 6, -2, -5, 7, 3]인 경우, 21을 반환한다.

```javascript
function adjacentElementsProduct(arr) {
  const TEMP = [];

  for (let i = 1; i < arr.length; i++) {
    TEMP.push(arr[i - 1] * arr[i]);
  }

  return Math.max.apply(0, TEMP);
}

console.log(adjacentElementsProduct([3, 6, -2, -5, 7, 3])); // 21
```

<br/>



### 23. 배열에서 특정 값만을 구하기

인수로 주어진 배열 arr에서 짝수이고 3보다 큰 수만을 구하여 이를 배열로 반환하는 함수를 작성하라

```javascript
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
```

<br/>



### 24. 평균구하기

인수로 주어진 배열의 평균을 구하는 함수를 완성하라.

```javascript
function average(array) {
  let answer = 0;
  for (let i = 0; i < array.length; i++) {
    answer += array[i];
  }

  return answer / array.length;
}

console.log(average([5, 3, 4])); // 4
```



<br/>



### 25. 최단 거리 1차원 점의 쌍 구하기 (DAUM) 

1차원의 점들이 주어졌을 때, 그 중 가장 거리가 짧은 것(들)의 쌍을 배열로 반환하는 함수를 작성하라. (단 점들의 배열은 모두 정렬되어있다고 가정한다.) 예를들어 [1, 3, 4, 8, 13, 17, 20, 23, 24]이 주어졌다면, 결과값은 [[3, 4], [23, 24]]가 될 것이다.

```javascript
function findMinDistance(array) {
  const temp = [];
  const ANSWER = [];

  for (let i = 1; i < array.length; i++) {
    temp.push(array[i] - array[i - 1]);
  }

  for (let i = 0; i < temp.length; i++) {
    if (temp[i] == Math.min.apply(0, temp)) {
      ANSWER.push([array[i], array[i + 1]]);
    }
  }
  return ANSWER;
}

// 1차원 점의 배열
// var array = [1, 3, 4, 8, 13, 17, 20, 23, 24];
const array = [1, 3, 4, 8, 13, 17, 20, 23, 24];
console.log(findMinDistance(array)); // [[3, 4], [23, 24]]

```

<br/>

