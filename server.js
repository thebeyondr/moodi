const express = require('express')
const server = express()
const morgan = require('morgan')

const port = process.env.PORT || 5000

// Routes
const routes = require('./api/router')
routes(server)

server.use(morgan('dev'))

server.listen(port, () => {
  console.info(`> Running on http://localhost:${port}`)
})
