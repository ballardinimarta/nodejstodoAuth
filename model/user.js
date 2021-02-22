const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email : {type: String, required:true},
    password : {type: String, required:true},
    token: String,
    tokenExpiration: Date,
    todoList: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: "task"
    }]
})

userSchema.methods.addTodo = function (todoId) {
    this.todoList.push(todoId);
    this.save();
}
const User = mongoose.model("user", userSchema);

module.exports = User;