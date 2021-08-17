var User = /** @class */ (function () {
    function User(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = firstName + ' ' + lastName;
    }
    return User;
}());
function greeter(person) {
    return 'hello: ' + person.firstName + ' ' + person.lastName;
}
// let user: Person = {
//   firstName: 'tang',
//   lastName: 'xue'
// }
var user = new User('tang', 'xue');
console.log(greeter(user));
