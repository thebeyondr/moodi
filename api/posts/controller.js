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
        if (!post) {
          return
        }
        photoService
          .getSpecificPhoto(req, res, next, post.photoId)
          .then(image => {
            return res.json({
              id: post._id,
              likes: post.likes,
              comments: post.comments,
              createdAt: post.createdAt,
              image: {
                id: image.id,
                description: image.description,
                link: image.links.html,
                url: image.urls.regular,
                user: {
                  ...image.user,
                  links: image.user.links.html,
                  profile_image: image.user.profile_image.medium
                }
              }
            })
          })
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
