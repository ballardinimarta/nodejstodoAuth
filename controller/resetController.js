const mailer = require("nodemailer");
const User = require("../model/user");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
require("dotenv").config();

const transport = {

}

const resetRender = (req, res) => {
    try {
        res.render("reset.ejs", {error: " "})
    } catch (error) {
        res.render("reset.ejs", {error: "Oops something went wrong"})
        console.log(error);
    }
}

const resetSubmit = (req, res) => {

}

const resetUser = (req, res) => {

}

const resetForm = (req, res) => {

}

module.exports = {
    resetRender,
    resetSubmit,
    resetUser,
    resetForm
}