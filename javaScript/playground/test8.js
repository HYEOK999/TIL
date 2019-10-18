function Sanggibu(name, grade) {
  this.name = name;
  this.grade = grade;
}

let a = new Sanggibu('kim', 80);
let b = new Sanggibu('lee', 70);
let c = new Sanggibu('park', 50);
let d = new Sanggibu('john', 90);

Object.getPrototypeOf(a).getResult = function () {
  if (this.grade > 70) return '합격';
  else{
    return '불합격';
 }
 return 0;
}

console.log(a.getResult());
console.log(b.getResult());
console.log(c.getResult());
console.log(d.getResult());
