const postRouter = require('./posts/routes')

module.exports = server => {
  server.use('/posts', postRouter)
}
