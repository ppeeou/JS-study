function curry(fn, arity = fn.length, ...args) {
  return args.length === arity
    ? fn(...args)
    : curry.bind(null, fn, arity, ...args);
}

module.exports = curry;
