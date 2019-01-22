export function randToken(length = 16) {
  let str = '';
  while (str.length < length) {
    str += (Math.random() * 2).toString(36).slice(2);
  }
  const token = str.slice(0, length);
  return token;
}
