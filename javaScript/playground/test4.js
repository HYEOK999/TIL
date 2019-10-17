const PERSON = {
  firstName: 'Lee',
  lastName: 'Hyeok',
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  set fullName(firstName) {
    this.firstName = firstName;
  }
};

PERSON.fullName = 'Kim';
console.log(PERSON.fullName); // 'Lee'

console.log(Object.getOwnPropertyDescriptors(PERSON));
