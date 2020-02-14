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
  ResultingPhrase: '미니애폴리스다운타운 (STP), 미니애폴리스|Hennepin|미네소타 주|미국',
  Highlighting: [
    [0, 2],
    [18, 20],
  ],
};

console.log(country.ResultingPhrase);
const fake = country.ResultingPhrase.split('');
console.log(fake);
for (let i = 0; i < fake.length; i++) {
  for (let j = 0; j < country.Highlighting.length; j++) {
    if (i === country.Highlighting[j][0]) {
      fake[i] = '<b>' + fake[i];
    }
    if (i === country.Highlighting[j][1] - 1) {
      fake[i] = fake[i] + '</b>';
    }
  }
}
const result = fake.join('');
console.log(result);

const test2 = {
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
  Highlighting: [[0, 1]],
};

const tfake = country.ResultingPhrase.split('');
console.log(tfake);
for (let i = 0; i < tfake.length; i++) {
  for (let j = 0; j < test2.Highlighting.length; j++) {
    if (i === test2.Highlighting[j][0]) {
      tfake[i] = '<b>' + fake[i];
    }
    if (i === test2.Highlighting[j][1] - 1) {
      tfake[i] = fake[i] + '</b>';
    }
  }
}
const ssub = tfake.join('');
console.log(ssub);

const answer = [];
airbnbs.forEach(airbnb => {
  const array = airbnb.ResultingPhrase.split('');
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < airbnb.Highlighting.length; j++) {
      if (i === airbnb.Highlighting[j][0]) {
        array[i] = '<b>' + array[i];
      }
      if (i === airbnb.Highlighting[j][1] - 1) {
        array[i] = array[i] + '</b>';
      }
    }
  }
  console.log(array);
  answer.push(array.join(''));
});
console.log(answer);

for (let i = 0; i < answer.length; i++) {}

const a = '미니애폴리스다운타운 (STP), 미니애폴리스|Hennepin|미네소타 주|미국'.split(',');
console.log(a);
const b = a[0].split(' ');
console.log(b);
const c = a[1].split('|');
console.log(c);
console.log(c[c.length - 1]);

var ss = '#미$국 입니다.'.split('');

function specialCharRemove(obj) {
  var val = obj;
  var pattern = /[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9)]/gi; // 특수문자 제거

  if (pattern.test(val)) {
    obj = val.replace(pattern, '');
  }
  return obj;
}

console.log(specialCharRemove('$미%'));

const a1 = ['#인', '도#$', '네', '시', '아'];
console.log(a1.join('').split('$'));

console.log(
  a1.map(c => {
    return c[0] === '#' && c[c.length - 1] === '$'
      ? c.replace(/[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9)]/gi, '')
      : c;
  }),
);

const aaaa = '미국';
console.log([aaaa]);
