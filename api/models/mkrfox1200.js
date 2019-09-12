const mongoose = require('mongoose')

const mkrfox1200Schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  device: String,
  time: Number,
  data: String
})

module.exports = mongoose.model('MkrFox1200', mkrfox1200Schema)