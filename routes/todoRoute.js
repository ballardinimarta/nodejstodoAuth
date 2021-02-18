const express = require("express");
const { homeRender, addNewTodo, editTodo, editTodoPost, deleteTodo } = require("../controller/todoController");
const verifyUser = require("../controller/middleware/verifyUser");
const router = express.Router();


router.get("/", verifyUser, homeRender)

router.post("/", verifyUser, addNewTodo)

router.get( "/edit/:id", verifyUser, editTodo)

router.post("/edit", verifyUser, editTodoPost)

router.get("/delete/:id", verifyUser, deleteTodo)

router.get("/logout", (req, res) => {
    res.clearCookie("jwtToken").redirect("/login");
})

module.exports = router;