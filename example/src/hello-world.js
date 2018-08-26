(function () {
  function hello() { return 'hello'; }
  function world() { return 'world'; }
  global.s = hello() + ' ' + world();
})();
