// function solution(dartResult) {
//   const arr = dartResult.split('');
//   const starCount = dartResult.match(/[*]/g);
//   let result = 0;
//   let num = 0;
//   let grade = 0;

//   for (let i = 0; i < arr.length; i++) {
//     // if( typeof +a[i] === 'number') continue;
//     if (arr[i] === 'S' || arr[i] === 'D' || arr[i] === 'T') {
//       grade = +arr[i - 2] === 1 ? 10 : +(arr[i - 1]);
//       num = grade * (arr[i] === 'S' ? 1 : arr[i] === 'D' ? grade : grade * grade);
//       if (arr[i + 1] === '*') {
//         result *= 2;
//         result += num * 2;
//       } else if (arr[i + 1] === '#') {
//         result += num * -1;
//       } else {
//         result += num;
//       }
//     }
//   }

//   if (arr[arr.length - 1] === '*') {
//     for (let i = 0; i < 3; i++) {
//       if (arr[i] === 'S' || arr[i] === 'D' || arr[i] === 'T') {
//         grade = arr[i - 2] === 1 ? 10 : +(arr[i - 1]);
//         result -= Math.pow
// (grade * (arr[i] === 'S' ? 1 : arr[i] === 'D' ? grade : grade * grade), starCount.length);
//         break;
//       }
//     }
//   }

//   return result;
// }
