/* eslint-disable */

const airbnbs = [
  {
    PlaceId: 'ICN',
    PlaceName: '인천국제공항',
    LocalizedPlaceName: '',
    CountryId: 'KR',
    CityId: 'SELA',
    IataCode: '',
    CountryName: '대한민국',
    PlaceNameEn: '',
    RegionId: '',
    CityName: '서울',
    CityNameEn: '',
    GeoId: '95673659',
    GeoContainerId: '27538638',
    Location: '37.469167,126.450556',
    ResultingPhrase: '인천국제공항 (ICN), 서울|서울특별시|대한민국',
    Highlighting: [[0, 2]],
  },
  {
    PlaceId: 'INC',
    PlaceName: '인촨',
    LocalizedPlaceName: '',
    CountryId: 'CN',
    CityId: 'CINC',
    IataCode: '',
    CountryName: '중국',
    PlaceNameEn: '',
    RegionId: '',
    CityName: '인촨',
    CityNameEn: '',
    GeoId: '128668566',
    GeoContainerId: '27542856',
    Location: '38.35,106.35',
    ResultingPhrase: '인촨 (INC), 인촨|Yinchuan|닝샤 후이족 자치구|중국',
    Highlighting: [
      [0, 2],
      [10, 12],
    ],
  },
];

// 일본
const country = {
  PlaceId: 'JP',
  PlaceName: '일본',
  LocalizedPlaceName: '',
  CountryId: 'JP',
  CityId: '',
  IataCode: '',
  CountryName: '일본',
  PlaceNameEn: '',
  RegionId: '',
  CityName: '',
  CityNameEn: '',
  GeoId: '29475330',
  GeoContainerId: '29475330',
  Location: '37.3132725967,137.6721240928',
  ResultingPhrase: '일본',
  Highlighting: [[0, 2]],
};

// 검색어 '미니'
const Acity = {
  PlaceId: 'STP',
  PlaceName: '미니애폴리스다운타운',
  LocalizedPlaceName: '',
  CountryId: 'US',
  CityId: 'MSPA',
  IataCode: '',
  CountryName: '미국',
  PlaceNameEn: '',
  RegionId: 'MN',
  CityName: '미니애폴리스',
  CityNameEn: '',
  GeoId: '129052038',
  GeoContainerId: '27540996',
  Location: '44.933333,-93.066667',
  ResultingPhrase: '밀라노|밀라노 현|롬바르디아 주|이탈리아',
  Highlighting: [
    [0, 1],
    [4, 5],
  ],
};

// console.log(country.ResultingPhrase);
// const fake = country.ResultingPhrase.split('');
// console.log(fake);
// for (let i = 0; i < fake.length; i++) {
//   for (let j = 0; j < country.Highlighting.length; j++) {
//     if (i === country.Highlighting[j][0]) {
//       fake[i] = '<b>' + fake[i];
//     }
//     if (i === country.Highlighting[j][1] - 1) {
//       fake[i] = fake[i] + '</b>';
//     }
//   }
// }
// const result = fake.join('');
// console.log(result);

const suggestion = {
  PlaceId: 'IN',
  PlaceName: '인도',
  LocalizedPlaceName: '',
  CountryId: 'IN',
  CityId: '',
  IataCode: '',
  CountryName: '인도',
  PlaceNameEn: '',
  RegionId: '',
  CityName: '',
  CityNameEn: '',
  GeoId: '29475284',
  GeoContainerId: '29475284',
  Location: '22.8576456589,79.6206722808',
  ResultingPhrase: '밀라노|밀라노 현|롬바르디아 주|이탈리아',
  Highlighting: [
    [0, 1],
    [4, 5],
  ],
};

// console.log('1', array);

// for(let i = 0; i< suggestion.Highlighting.length; i++) {
//   result = array.replace(/(.{0})/,"<strong>")
//   // result = array.replace(/(.{suggestion.Highlighting[i][1]})/,"</strong>")
// }

function insertTag(highlightings, str) {
  const starts = [],
    ends = [];

  highlightings.forEach(highlighting => {
    starts.push(highlighting[0]);
    ends.push(highlighting[1]);
  });

  return str
    .split('')
    .map((chr, pos) => {
      if (starts.indexOf(pos) != -1) chr = '<strong>' + chr;
      if (ends.indexOf(pos) != -1) chr = '</strong>' + chr;
      return chr;
    })
    .join('');
}

const Result = {};
const WordArray = insertTag(suggestion.Highlighting, suggestion.ResultingPhrase);

console.log(WordArray);

const place = 'Country2';
if (place === 'Country') {
  Result.CountryName = WordArray.split('|');
  console.log(Result.CountryName);
} else {
  const ResultingArray = WordArray.split('|');
  console.log(ResultingArray);
  Result.PlaceName = ResultingArray[0].includes(',')
    ? ResultingArray[0].split(',')[0].split('(')[0]
    : ResultingArray[0];
  Result.CountryName = ResultingArray[ResultingArray.length - 1];
}

console.log(Result);
// const HighlightingLength = suggestion.Highlighting.length;
// console.log(HighlightingLength);

// // for (let i = 0; i < array.length; i++) {
// //   for (let j = 0; j < suggestion.Highlighting.length; j++) {
// //     if (i === suggestion.Highlighting[j][0]) {
// //       array[i] = '#' + array[i];
// //     }
// //     if (i === suggestion.Highlighting[j][1] - 1) {
// //       array[i] = array[i] + '#$';
// //     }
// //   }
// // }

// for (let i = 0; i < array.length; i++) {
//   let j = 0;
//   if (i === suggestion.Highlighting[j][0]) {
//     array[i] = '#' + array[i];
//   }
//   if (i === suggestion.Highlighting[j][1] - 1) {
//     array[i] = array[i] + '#$';
//     j = j + 1;
//   }
//   if (j === HighlightingLength) {
//     break;
//   }
// }

// console.log(array);

// const place = suggestion.CityId ? 'asdasd' : 'Country';

// if (place === 'Country') {
//   result.CountryName = array.join('').split('$');
// } else {
//   const ResultingArray = array.join('').split('|');
//   result.PlaceName = ResultingArray[0].includes(',')
//     ? ResultingArray[0]
//         .split(',')[0]
//         .split('(')[0]
//         .split('$')
//     : ResultingArray[0].split('$');
//   result.CountryName = ResultingArray[ResultingArray.length - 1].includes('$')
//     ? ResultingArray[ResultingArray.length - 1].split('$')
//     : [ResultingArray[ResultingArray.length - 1]];
// }

// console.log(result);
