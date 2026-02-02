const express = require('express');
const { check, validationResult } = require('express-validator');
const { getTodos, createTodo, deleteTodo } = require('../controllers/todo.controller');
const auth = require('../middleware/auth.middleware');

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

router.use(auth); // Protect all todo routes

router.get('/', getTodos);

router.post(
  '/',
  [check('title', 'Title is required').not().isEmpty()],
  validate,
  createTodo
);

router.delete('/:id', deleteTodo);

module.exports = router;
