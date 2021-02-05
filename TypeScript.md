# 类型



### 静态类型

##### 基础类型

boolean, number, string, undefined, null, symbol

```typescript
let a: number = 0
```



##### 引用类型

接口

```typescript
let person: {
  name: string,
  age: number
} = {
  name: 'Thomas',
  age: 25
}
```

```typescript
interface Person {
  name: string;
  age: number;
}
let person: Person = {
  name: 'Thomas',
  age: 25
}
```

数组

```typescript
let arr: number[] = [0, 1, 2]

let arr: {name: string}[] = [{name: 'a'}]
```

元组：位数确定，且每一位类型确定的数组（常用于表示数据库中的一行数据）

```typescript
let tuple: [string, number] = ['Thomas', 25]
let arr: [string, number][] = [['Thomas', 25], ['Luna', 25]]
```

类

```typescript
class Person {
  name: string;
  age: number;
}
let person: Person = new Person()
```



函数

```typescript
const sum = (a: number, b: number): number => {
  return a + b
}
const sum: (a: number, b: number) => number = (a, b) => {
  return a + b
}

function sum(a: number, b: number): number {
  return a + b
}

// 解构赋值
function sum({a, b}: {a: number, b: number}): number {
  return a + b
}
```



##### 特殊类型

void（函数没有返回）、never（函数永远无法执行完）

```typescript
function sayHello(): void {
  console.log('hello')
}

function error(): never {
  throw new Error()
  console.log('hello')
}
```



### 类型定义

##### 类型注解

```typescript
let a: number = 0
```

##### 联合类型注解

```typescript
let a: number | string = 0

let arr: (number | string)[] = [0, '1', 2]
let arr: number | string[] = 0
```



##### 类型推断

typescript 会自动地尝试分析变量的类型

```typescript
let a = 0 // a 的类型为 number
```

typescript 无法自动分析出一些 js 自带函数返回值的类型

```typescript
const rawData = '{"name": "Thomas"}'
const data = JSON.parse(rawData) // data 的类型为 any
```



##### 类型别名

为使变量声明更加简洁（一般不用，尽量用 interface）

type 可以表示基础类型，interface 不可以

```typescript
type a = string

type Person = {name: string, age: number}
const person: Person[] = [{
  name: 'Thomas',
  age: 25
}]
```



### 接口

```typescript
interface Person {
  readonly name: string; // 只读
  age: number;
  sex?: string; // 可选
  [prop: string]: any // 可能有附加属性
  say(): string
}

const getPersonName = (person: Person): void => {
  console.log(person.name)
}

const person = {
  name: 'Thomas',
  age: 25,
  salary: 1000000
}

getPersonName(person) // 不报错
getPersonName({name: 'Thomas', age: 25}) // 报错，typescript 会对对象字面量参数进行强校验
```

如果希望在类中使用必须要被遵循的接口（类）或别人定义的对象结构，可以使用 implements 来确保同步。外部接口 Person 的任何更改都可能导致编译错误。

```typescript
class Teacher implements Person {
  name: string;
  age: number;
  say() {
    return 'hello'
  }
}
```

继承

```typescript
interface Teacher extends Person {
  teach(): void;
}
```



interface 定义函数类型（一般不用）

```typescript
interface Say {
  (word: string): string
}

const say: Say = (word) => {
  return word
}
```



### 类

```typescript
class Person {
  name: string;
  age: number;
}
```

public, protected, private

```typescript
class Person {
  // 传统写法
  // public name: string
  // constructor(name: string) {
  //   this.name = name
  // }
  // 简化写法
  constructor(public name: string)
}
```

readonly

```typescript
class Person {
  constructor(public readonly name: string) {}
}
const person = new Person('Thomas')
console.log(person.name)
person.name = 'Luna' // Cannot assign to 'name' because it is a read-only property.
```

getter 和 setter

```typescript
class Person {
  // private 保护私有属性
  constructor(private _age: number) {}
  get age() {
    return this._age - 5
  }
  set age(age: number) {
    if(age < 30) {
      this._age = age
    } else {
      throw new RangeError('不可能，绝对不可能');
    }
  }
}
const person = new Person(20)
console.log(person.age)
person.age = 29
console.log(person.age)
```

单例模式

```typescript
class Person {
  private static singleton: Person;
  private constructor(public name: string) {}
  static getSingleton(name: string) {
    if (!this.singleton) {
      this.singleton = new Person(name);
    }
    return this.singleton;
  }
}

const person1 = Person.getSingleton('Adam');
const person2 = Person.getSingleton('Bob');
console.log(person1.name, person2.name); // Adam Adam
```

抽象类

```typescript
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
console.log(square.getArea()); // 6
console.log(square.ancestor); // Geom

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
```







