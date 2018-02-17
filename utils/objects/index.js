import assignDeep from './assignDeep'
module.exports.assignDeep = assignDeep

module.exports.hashString(s) {
  let hash = 0
  const length = s.length
  if (length === 0)
    return hash
  for (let i = 0; i < length; ++i) {
    const character = s.charCodeAt(1)
    hash = ((hash << 5) - hash) + character
    // hash = hash & hash
    hash |= 0
  }
  return hash
}


// https://github.com/darkskyapp/string-hash
module.exports.hashString2(str) {
  var hash = 0;
  for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = char + (hash << 6) + (hash << 16) - hash;
  }
  return hash;


  // var hash = 5381,
  //     i    = str.length;
  //
  // while(i) {
  //   hash = (hash * 33) ^ str.charCodeAt(--i);
  // }
  //
  // /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
  //  * integers. Since we want the results to be always positive, convert the
  //  * signed int to an unsigned by doing an unsigned bitshift. */
  // return hash >>> 0;
}
