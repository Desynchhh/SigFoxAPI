module.exports = {
  // hexToAscii: str => {
  //   const hex = str.toString()
  //   let ascii = ''
  //   for (var i = 0; i < hex.length; i += 2) {
  //     ascii += String.fromCharCode(parseInt(hex.substr(i, 2), 16))
  //   }
  //   return ascii
  // },

  epochToDate: timestamp => {
    const date = new Date(timestamp*1000)
    const y = addZ(date.getFullYear()),
          m = addZ(date.getMonth() + 1),
          d = addZ(date.getDate()),
          h = addZ(date.getHours()),
          i = addZ(date.getMinutes()),
          s = addZ(date.getSeconds())
    return `${y}-${m}-${d} ${h}:${i}:${s}`
  },

}
addZ = n => n < 10 ? '0' + n : n