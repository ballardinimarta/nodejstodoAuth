const express = require("express");
const { loginRender, loginSubmit } = require("../controller/loginController");
const { registerRender, registerFormSubmit } = require("../controller/registerController");

const router = express.Router();

router.get("/register", registerRender);
router.post("/register", registerFormSubmit);

router.get("/login", loginRender);
router.post("/login", loginSubmit);

module.exports = router;