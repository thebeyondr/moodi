const axios = require('axios')
const unsplashUrl = 'https://api.unsplash.com'
require('dotenv').config()

module.exports = {
  getRandomPhoto: (req, res, next) => {
    axios
      .get(`${unsplashUrl}/photos/random`, {
        headers: { Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}` }
      })
      .then(response => {
        return res.send(response.data)
      })
      .catch(err => {
        if (err.response) {
          res.send(err.response.data)
        }
      })
  }
}
