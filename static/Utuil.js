const baseChar = 'abcdefghjkmnpqrstuvwxyz0123456789_'.split('')
function getRandomStr (n) {
  let str = ''
  if (n > 0) {
    for (let i = 0; i < n; i++) {
      str += baseChar[parseInt(Math.random() * n)]
    }
  }
  return str
}
const Util = {
  randomStr16: function () {
    return getRandomStr(16)
  },
  randomStr32: function () {
    return getRandomStr(32)
  }
}
export default Util
