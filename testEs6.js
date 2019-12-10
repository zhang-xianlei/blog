function Person (name) {
    'use strict';
    console.log(new.target.name);
    if (typeof new.target === 'undefined') {
        throw new Error('constructor must be called with new');
    }
    this.name = name;
}
var personOne = new Person('zxl');
console.log(personOne.name);
Person('zxl');