// 静态类型
let a: number = 0;
a = 1;

function demo(data: { x: number; y: number }) {
  return Math.sqrt(data.x ** 2 + data.y ** 2);
}

demo({ x: 1, y: 2 });

// type Point = { x: number, y: number }
interface Point {
  x: number;
  y: number;
}

function betterDemo(data: Point) {
  console.log('"a"');
  return Math.sqrt(data.x ** 2 + data.y ** 2);
}

// class Person {
//   name: string;
// }
// let person = new Person();
// person.name = 'Thomas';
// console.log(person.name);
