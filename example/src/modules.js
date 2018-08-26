(function () {
  let moduleTable = {};
  function define(id, f) { moduleTable[id] = f; }
  function require(id) {
    let x = moduleTable[id];
    return x instanceof Function ? (moduleTable[id] = x()) : x;
  }
  global.require = require;
  define("one", function() { return 1; });
  define("two", function() { return require("one") + require("one"); });
  define("three", function() { return require("two") + require("one"); });
  define("four", function() { return require("three") + require("one"); });
  
  three = require("three");
})();

