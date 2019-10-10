const LINE = 5;
let star = '';

console.log(
  '11번 문제입니다.\n',
  problem(LINE, star, function(i, j) {
      return i >= j;
  }),
  '-----------------'
);

function problem(line, star, func) {
  let etoile = star;

  forMun(line, etoile) {
    console.log('test');
  }

  return etoile;
}

function forMun(line, etoile, func) {
  for(let i = 0; i < line; i++) {
    forMun2(i,etoile,func);
    etoile += '\n';
  }
  return etoile;
}


function forMun2(line, etoile, func){
  for(let j = 0; j < line; j++) {
    etoile += func(i,j) ? '*' : ' ';
  }
  return etoile;
}