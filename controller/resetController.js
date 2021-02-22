const nodemailer = require("nodemailer");
const User = require("../model/user");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
require("dotenv").config();

const transport = nodemailer.createTransport({
    host: process.env.EMAIL_SERVICE,
    port: process.env.EMAIL_PORT,
    secure: true, 
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_PASS
    }
});

const resetRender = (req, res) => {
    try {
        res.render("reset.ejs", {error: " "})
    } catch (error) {
        res.render("reset.ejs", {error: "Oops something went wrong"})
        console.log(error);
    }
}

const resetSubmit = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) return res.render("reset.ejs", {error: "That email does not belong to any account, please sign up instead!"})

        const token = await crypto.randomBytes(32).toString("hex");
        user.token = token;
        user.tokenExpiration = Date.now() + 3600000; // 1 hour until token expiration
        await user.save();
        
        await transport.sendMail({
            from: process.env.EMAIL_NAME,
            to: user.email,
            subject: "Reset your password",
            html: `<h3>Hi, here is your reset link for NodeJS-Todolist: <a href='http://localhost:${process.env.PORT}/reset/${user.token}'>Click me!</a></h3>`
        });
        res.render("reset.ejs", {error: "Email is sent! check your inbox and click the link that was sent!"})
    } catch (error) {
        res.render("reset.ejs", {error: "Oops something went wrong"})
        console.log(error);
    }
}

const resetUser = async  (req, res) => {
    try {
        const token = req.params.token;
        const user = await User.findOne({token: token});
        if(!user) return res.redirect("register.ejs");
        res.render("resetpass.ejs", {error: " ", email: user.email})
    } catch (error) {
        res.render("resetpass.ejs", {error: "Oops something went wrong :/"});
        console.log(error)
    }
}

const resetForm = async (req, res) => {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = await User.findOne({email: req.body.email});
    user.password = hashedPassword;
    await user.save();
    res.redirect("/login");


}

module.exports = {
    resetRender,
    resetSubmit,
    resetUser,
    resetForm
}