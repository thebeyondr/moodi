const photoService = require('../../service/photo')
const Post = require('./model')
// const createError = require('http-errors')

function isDuplicatePhoto (Post, req, res, next) {
  Post.findOne({ photoId: req.body.photoId }).then(post => {
    if (post && post.id) {
      return true
    }
    return false
  })
}

module.exports = {
  getRandomPhoto: (req, res, next) => {
    return photoService.getRandomPhoto(req, res, next)
  },
  getCurrentPost: (req, res, next) => {
    Post.findOne({ isCurrent: true })
      .then(post => {
        return photoService.getSpecificPhoto(req, res, next, post.photoId)
      })
      .catch(err => {
        console.log(err)
      })
  },
  submitNewPost: (req, res, next) => {
    if (!isDuplicatePhoto(Post, req, res, next)) {
      Post.findOneAndUpdate(
        { isCurrent: true },
        { isCurrent: false, archivedAt: new Date() }
      ).then(() => {
        const newPost = new Post({
          photoId: req.body.photoId
        })
        newPost
          .save()
          .then(post => {
            res.json(post)
          })
          .catch(err => {
            console.log(err)
          })
      })
    }
  }
}
