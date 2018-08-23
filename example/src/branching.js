(function(){
  function fib(x) { return x <= 1 ? x : fib(x - 1) + fib(x - 2); }
  let x = Date.now();
  if (x === 0) x = fib(10);
  global.result = x;
})();
