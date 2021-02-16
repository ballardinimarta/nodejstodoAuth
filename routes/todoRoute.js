const express = require("express");
const { homeRender, addNewTodo, editTodo, editTodoPost, deleteTodo } = require("../controller/todoController");
const router = express.Router();

router.get("/", homeRender)

router.post("/", addNewTodo)

router.get( "/edit/:id", editTodo)

router.post("/edit", editTodoPost)

router.get("/delete/:id", deleteTodo)

module.exports = router;