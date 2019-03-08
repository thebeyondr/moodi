const axios = require('axios')
const unsplashUrl = 'https://api.unsplash.com'
require('dotenv').config()
const createError = require('http-errors')

module.exports = {
  getRandomPhoto: (req, res, next) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${unsplashUrl}/photos/random`, {
          headers: { Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}` }
        })
        .then(response => {
          resolve(response.data)
        })
        .catch(err => {
          if (err) {
            return next(
              createError(err.response.status, err.response.data.errors)
            )
          }
        })
    })
  },
  getSpecificPhoto: (req, res, next, photoId) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${unsplashUrl}/photos/${photoId}`, {
          headers: { Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}` }
        })
        .then(response => {
          resolve(response.data)
        })
        .catch(err => {
          if (err) {
            return next(
              createError(err.response.status, err.response.data.errors)
            )
          }
        })
    })
  }
}
