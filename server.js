// Module imports
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
// Route imports
const mkrfox1200Routes = require('./api/routes/mkrfox1200')

// Init express
app = express()

// Setup middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Avoid CORS errors
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
	if (req.method === 'OPTIONS'){
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
		return res.status(200).json({})
	}
	next()
})

// Use API router
app.use('/api/mkrfox1200', mkrfox1200Routes)

// Connect to MongoDB database
mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_ATLAS_PWD}@node-sigfox-api-v4no9.mongodb.net/test?retryWrites=true&w=majority`, {
	//useMongoClient: true
	useNewUrlParser: true,
	useUnifiedTopology: true 
});

// Error handling
app.use((req, res, next) => {
	const err = new Error('Not Found')
	err.status = 404
	next(err)
})
app.use((err, req, res, next) => {
	res.status(err.status || 500)
	res.json({
		error: {
			message: err.message
		}
	})
})

// Start server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server starting running on port ${port}`)
})