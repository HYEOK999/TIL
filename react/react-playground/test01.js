const name = 'kim';
const email = 'a123@a123.com';
const age = null;

const obj = {
  name,  // name : name
  email,  // email : email
  age
}

const { name : anotherNmae } = obj;
const { age = 22 } = obj;