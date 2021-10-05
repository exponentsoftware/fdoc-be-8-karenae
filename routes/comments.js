const express = require('express');
const { createComment, getComments, updateComment, deleteComment, getCommentById } = require('../controller/comments');
const router = express.Router()


router.post('/comment',createComment)
router.get('/comment',getComments)
router.get('/comment/byid',getCommentById)
router.put('/comment',updateComment)
router.delete('/comment',deleteComment)


module.exports = router