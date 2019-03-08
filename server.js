const express = require('express')
const server = express()
const mongoose = require('mongoose')
require('dotenv').config()
const morgan = require('morgan')
const bodyParser = require('body-parser')

const port = process.env.PORT || 5000
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

mongoose
  .connect(
    process.env.MONGO_URI,
    { useCreateIndex: true, useNewUrlParser: true }
  )
  .then(() => console.info('> Database connected'))
  .catch(err => {
    console.log(err)
  })
mongoose.set('debug', true)

// Routes
const routes = require('./api')
routes(server)

server.use(function (err, req, res, next) {
  console.error(err)
  res.status(err.status || 500)
  res.send({ status: err.status, message: err.message })
})

server.use(morgan('dev'))

server.listen(port, () => {
  console.info(`> Running on http://localhost:${port}`)
})
