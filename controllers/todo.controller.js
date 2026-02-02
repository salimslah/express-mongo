const Todo = require('../models/Todo');
const asyncHandler = require('../middleware/async.middleware');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all todos
// @route   GET /api/todos
// @access  Private
exports.getTodos = asyncHandler(async (req, res, next) => {
  const todos = await Todo.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    count: todos.length,
    data: todos,
  });
});

// @desc    Create new todo
// @route   POST /api/todos
// @access  Private
exports.createTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.create({
    title: req.body.title,
    user: req.user.id,
  });

  res.status(201).json({
    success: true,
    data: todo,
  });
});

// @desc    Delete todo
// @route   DELETE /api/todos/:id
// @access  Private
exports.deleteTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.findOne({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!todo) {
    return next(new ErrorResponse(`Todo not found with id of ${req.params.id}`, 404));
  }

  await todo.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
