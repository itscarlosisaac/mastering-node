// V8 optimization on second call of the function
// node -allow-natives-syntax --trace_opt --trace_deopt optimizationAssertV8.js
let operant = 3;
function square(){
    return operant * operant;
}

square();

%OptimizeFunctionOnNextCall(square)
operant = 3.021
square()