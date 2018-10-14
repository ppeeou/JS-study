var assert = require("assert");
var curry = require("../curry");

describe("Technic JS", function() {
  it("curry", function() {
    function add(a, b, c = 0) {
      return a + b + c;
    }

    assert.equal(curry(add)(5, 4), 9);
    assert.equal(curry(add, 3)(5, 4)(9), 18);
  });
});
