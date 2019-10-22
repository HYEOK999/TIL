const Users = (function() {
  function Users() {
    console.log(this);
    this.users = [
      { id: 1, name: 'Lee' },
      { id: 2, name: 'Kim' }
    ];
  }

  Users.prototype.findById = function(id) {
    console.log(this);
    return this.users.filter(user => user.id === id);
  };

  Users.prototype.remove = function(id) {
    console.log(this);
    this.users = this.user.filter(user => user.id !== id);
  };

  return Users;
}());

const users = new Users();
let user = users.findById(1);
user = users.remove(1);
console.log(user);
