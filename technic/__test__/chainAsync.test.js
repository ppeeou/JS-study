var assert = require("assert");
var chainAsync = require("../chainAsync");

describe("Technic JS", function() {
  it("chainAsync", function() {
    function asyncAdd(a, b, cb) {
      setTimeout(() => {
        return cb(a + b);
      }, 10);
    }
    function asyncSub(a, b, cb) {
      setTimeout(() => {
        return cb(a - b);
      }, 10);
    }

    chainAsync([
      next => {
        asyncAdd(3, 10, function(result) {
          next(result);
        });
      },
      (next, result) => {
        asyncSub(result, 6, function(result) {
          next(result);
        });
      },
      (next, result) => {
        assert.equal(result, 7);
      }
    ]);
  });
});
