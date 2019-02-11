const postController = require('./controller')
const express = require('express')
const router = express.Router()

router.get('/new', postController.newPost)

module.exports = router
