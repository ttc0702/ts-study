function sum(a: number, b: number): number {
  // return a + b + '';
  return a + b;
}

let c = sum(1, 2);

interface Say {
  (word: string): string;
}

const say: Say = (word) => {
  console.log(word);
  return word;
};
say('hello');
