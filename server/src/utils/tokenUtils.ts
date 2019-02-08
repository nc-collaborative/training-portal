const alphabet = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
// base58

export function randToken(length = 16) {
  let str = '';
  let max = alphabet.length;

  while (str.length < length) {
    str += alphabet[Math.floor(Math.random() * max)];
  }

  return str;
}
