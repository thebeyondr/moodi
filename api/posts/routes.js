const express = require('express')
const router = express.Router()
const postController = require('./controller')

router.post('/', postController.submitNewPost)
router.get('/random', postController.getRandomPhoto)
router.get('/current', postController.getCurrentPost)
router.get('/:id', postController.getPost)

module.exports = router
