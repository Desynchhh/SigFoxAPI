// NPM imports
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
// Custom module imports
const decode = require('../controllers/decoders')
const datahandler = require('../controllers/datahandler')
// Model imports
const MkrFox1200 = require('../models/mkrfox1200')

// Handle POST request
router.post('/', (req, res) => {
  // Destructure body
  const { deviceId, time, data, lat, lng } = req.body
  
  // Convert data according to protocol
  const temp = datahandler.getTemp(data)
  const hum = datahandler.getHum(data)

  const mkrfox1200 = new MkrFox1200({
    _id: mongoose.Types.ObjectId(),
    deviceId,
    time: decode.epochToDate(time),
    latitude: lat,
    longtitude: lng,
    data: {
      temperature: temp,
      humidity: hum,
    }
  })

  // Save to DB
  mkrfox1200.save()
    .then(result => {
      console.log(result)
      res.status(201).json({
        message: 'POST request successfully executed',
        result
      })
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({error: err})
    })
})

// Handle GET all request
router.get('/', (req, res) => {
  MkrFox1200.find().exec()
    .then(docs => {
      console.log(docs)
      res.status(200).json({
        message:"GET all request successfully executed",
        docs
      })
    }) 
    .catch(err => {
      console.error(err)
      res.status(500).json({error: err})
    })
})

// Handle GET specific request
router.get('/:id', (req, res) => {
  const { id } = req.params

  MkrFox1200.findById(id).exec()
    .then(doc => {
      console.log(doc)
      if(doc){
        res.status(200).json({
          message:"GET specific request successfully executed",
          doc
        })
      } else {
        res.status(404).json({
          message: 'No entry found for the provided ID.'
        })
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({error: err})
    })
})

// Handle DELETE request
router.delete('/:id', (req, res) => {
  const { id } = req.params
  MkrFox1200.remove({_id: id}).exec()
    .then(result => {
      console.log(result)
      res.status(201).json({
        message: 'DELETE request successfully executed',
        result
      })
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({
        error: err
      })
    })
})

// Export router
module.exports = router