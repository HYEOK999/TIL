/*
2. 1 ~ 10,000의 숫자 중 8이 등장하는 횟수 구하기 (Google)

1부터 10,000까지 8이라는 숫자가 총 몇번 나오는가? 이를 구하는 함수를 완성하라.
단, 8이 포함되어 있는 숫자의 갯수를 카운팅 하는 것이 아니라 8이라는 숫자를 모두 카운팅 해야 한다. 예를 들어 8808은 3, 8888은 4로 카운팅 해야 한다.
(hint) 문자열 중 n번째에 있는 문자 : str.charAt(n) or str[n]
*/

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
