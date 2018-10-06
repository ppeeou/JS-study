function chainAsync(fns) {
  if (!Array.isArray(fns)) throw new TypeError("fns is must be array");
  if (!fns.every(f => typeof f === "function")) throw new TypeError("f is must be type function in fns");
  let current = 0; 
  const next = result => fns[current++](next, result);
  next();
}

module.exports = chainAsync