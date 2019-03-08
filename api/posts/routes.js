const express = require('express')
const router = express.Router()
const postController = require('./controller')

router.get('/random', postController.getRandomPhoto)
router.get('/current', postController.getCurrentPost)
router.post('/', postController.submitNewPost)

module.exports = router
