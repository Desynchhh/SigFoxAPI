const mongoose = require('mongoose')

const mkrfox1200Schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  deviceId: String,
  time: String,
  latitude: Number,
  longtitude: Number,
  data: mongoose.Schema.Types.Mixed
})

module.exports = mongoose.model('MkrFox1200', mkrfox1200Schema)