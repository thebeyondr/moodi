const photoService = require('../../service/photo')
module.exports = {
  newPost: (req, res) => {
    return photoService.getRandomPhoto(req, res)
  }
}
