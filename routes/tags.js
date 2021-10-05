const express = require('express');
const { createTag, getTags, updateTag, deleteTag, getTagById } = require('../controller/tags');
const router = express.Router()


router.post('/comment',createTag)
router.get('/comment',getTags)
router.put('/comment',updateTag)
router.delete('/comment',deleteTag)


module.exports = router