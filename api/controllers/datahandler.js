module.exports = {
  getHum: data => {
    const rawHum = splitData(data, 0)
    const dVal = hexToDec(rawHum)
    return round(dVal+20)
  },
  
  getTemp: data => {
    const rawTemp = splitData(data, 2)
    const dVal = hexToDec(rawTemp)
    return round(dVal*0.2, 1)
  }
}

splitData = (data, index) => {
  const regex = /.{2}/g
  while(match = regex.exec(data)){
    if(match['index'] == index) {
      return match 
    }
    else {
      // Error handling..
    }
  }
}

const round = (value, decimals = 0) => {
  const multiplier = Math.pow(10, decimals);
  return Math.round(value * multiplier) / multiplier;
}

hexToDec = hex => parseInt(hex, 16)