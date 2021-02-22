const Task = require("../model/task");
const User = require("../model/user");

let sorted = 1;
let page = 1;

const homeRender = async (req, res) => {
    
    if (!req.query.sort) {
        sorted = 1;
    } else {
        sorted = req.query.sort;
    }
    if (!req.query.page) {
        page=1;
    } else {
        page = req.query.page;
    }

    try {
        const user =  await User.findOne({_id: req.user.user._id});
        const userTodos = await user.todoList;
        const count = await Task.find({_id: userTodos});
        const data = await Task.find({_id: userTodos}).sort({date: sorted}).skip((page-1)*5).limit(5);
    
        res.render("index.ejs", {task: " ", id: 0, data:data, error: " ", csslink: "/style/main.css", count: count.length, page:page, sorted:sorted})
    } catch (error) {
        res.render("error.ejs", {error: error})
        console.log(error)
    }
}

const addNewTodo = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.user.user._id});
        const addedTask = await new Task({
            name: req.body.name
        }).save()
        user.addTodo(addedTask._id);
        const userTasks =  await User.findOne({_id: req.user.user._id}).populate("todoList");
        console.log(userTasks);

        res.redirect("/");
    } catch (error) {
        res.render("error.ejs", {error: error})
        console.log(error);
    }
    
}

const editTodo = async (req, res) => {
    try {
        sorted = req.query.sort;
        page = req.query.page;
        const user =  await User.findOne({_id: req.user.user._id});
        const userTodos = await user.todoList;

        const task = await Task.findOne({_id: req.params.id})
        const count = await Task.find({_id: userTodos});
        const data = await Task.find({_id: userTodos}).sort({date:sorted}).skip((page-1) * 5).limit(5);
        res.render("index.ejs", {task: task, id: req.params.id, data:data, error: " ", csslink: "../style/main.css", count: count.length, page:page, sorted:sorted})
    } catch (error) {
        res.render("error.ejs", {error :error}) 
    }
}

const editTodoPost = async (req, res) => {
    try {
        await Task.updateOne({_id:req.body.id},{ name:req.body.name});
        res.redirect("/");
    } catch (error) {
        res.render("error.ejs", { error: error})

    }
    
}

const deleteTodo = async (req, res) => {
    try {
        await Task.deleteOne({_id: req.params.id})
        res.redirect("/");
    } catch (error) {
        res.render("error.ejs", { error: error})

    }
}

module.exports = {
    homeRender,
    addNewTodo,
    editTodo,
    editTodoPost,
    deleteTodo
}