// class Neo {
//   constructor(private _age: number) {}
//   get age() {
//     return this._age - 5;
//   }
//   set age(age: number) {
//     if (age < 30) {
//       this._age = age;
//     } else {
//       throw new RangeError('不可能，绝对不可能');
//     }
//   }
// }
// let neo = new Neo(20);
// console.log(neo.age);
// neo.age = 29;
// console.log(neo.age);

// class Person {
//   private static singleton: Person;
//   private constructor(public name: string) {}
//   static getSingleton(name: string) {
//     if (!this.singleton) {
//       this.singleton = new Person(name);
//     }
//     return this.singleton;
//   }
// }
// const person1 = Person.getSingleton('Adam');
// const person2 = Person.getSingleton('Bob');
// console.log(person1.name, person2.name); // Adam Adam

// class Person {
//   constructor(public readonly name: string) {}
// }
// const person = new Person('Thomas');
// console.log(person.name);
// person.name = 'Luna';

abstract class Geom {
  ancestor = 'Geom';
  abstract getArea(): number;
}

class Square extends Geom {
  constructor(public width: number, public height: number) {
    super();
  }
  getArea() {
    return this.width * this.height;
  }
}
const square = new Square(2, 3);
console.log(square.getArea());
console.log(square.ancestor);

class Triangle extends Geom {
  constructor(public a: number, public b: number, public c: number) {
    super();
  }
  getArea() {
    const { a, b, c } = this;
    const p = (a + b + c) / 2;
    return Math.sqrt(p * (p - a) * (p - b) * (p - c));
  }
}

class Circle extends Geom {
  constructor(public r: number) {
    super();
  }
  getArea() {
    return Math.PI * this.r ** 2;
  }
}
