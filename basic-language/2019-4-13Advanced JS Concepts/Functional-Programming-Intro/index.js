//Partial Application
// const multiply = (a, b, c) => a * b * c;
// const paritalMultiplyBy5 = multiply.bind(null, 5);
// console.log(paritalMultiplyBy5(4, 10));

// Pipe
const Pipe = (...fns) => (data) => {
  // console.log(fns);
  fns.forEach(fn => {
    data = fn(data)
  })
  return data
}

// Compose
const Compose = (...fns) => (data) => {
  // console.log(fns);
  fns.reverse().forEach(fn => {
    data = fn(data)
  })
  return data
}


const multiplyBy3 = (num) => num * 3;
const makePositive = (num) => Math.abs(num);
const plusOne = (num) => num + 1;

const result = Compose(multiplyBy3, makePositive, plusOne)(-50)
const result1 = Pipe(multiplyBy3, makePositive, plusOne)(-50)
console.log(result);
console.log(result1);