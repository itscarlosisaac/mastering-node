
// V8 engine

let someFunc = function foo(){}
console.log(%FunctionGetName(someFunc))

//  node --allow-natives-syntax  program.js