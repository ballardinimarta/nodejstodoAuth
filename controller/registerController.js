const User = require("../model/user");
const bcrypt = require("bcrypt");

const registerRender = (req, res) => {
    try {
        res.render("register.ejs", {error: " "})
    } catch (error) {
        res.render("register.ejs", {error: error})

    }
}

const registerFormSubmit = async (req, res) => {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    try {
        await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        }).save();
        res.redirect("/login")
    } catch (error) {
        res.render("register.ejs", {error: "Something went wrong, try again"})
        console.log(error)
    }
}
module.exports = {
    registerRender,
    registerFormSubmit
}