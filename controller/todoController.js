const Task = require("../model/task");

let sorted = 1;
let page = 1;

const homeRender = async (req, res) => {
    sorted = req.query.sort;
    page = req.query.page;
    try {
        const count = await Task.find();
        const data = await Task.find().sort({date: sorted}).skip((page-1)*5).limit(5);
        res.render("index.ejs", {task: " ", id: 0, data:data, error: " ", csslink: "/style/main.css", count: count.length, page:page, sorted:sorted})
    } catch (error) {
        res.render("error.ejs", {error: error})
    }
}

const addNewTodo = async (req, res) => {
    try {
        await new Task({
            name: req.body.name
        }).save()
        res.redirect("/");
    } catch (error) {
        res.render("error.ejs", {error: error})
    }
    
}

const editTodo = async (req, res) => {
    try {
        sorted = req.query.sort;
        page = req.query.page;
        console.log(sorted, page)
        const task = await Task.findOne({_id: req.params.id})
        const count = await Task.find();
        const data = await Task.find().sort({date:sorted}).skip((page-1) * 5).limit(5);
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