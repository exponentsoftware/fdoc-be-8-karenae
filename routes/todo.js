

const { createTodo, getTodos, getTodoById, updateTodo,  } = require('../controller/todo');

// const { requiresignin } = require('../middleware/authentication');
const express = require('express');
const router = express.Router()



router.post('/addtodo',createTodo);
router.get('/todos',getTodos);

router.get('/todos/byid',getTodoById);
router.put('/todo/:id',updateTodo);



module.exports = router;