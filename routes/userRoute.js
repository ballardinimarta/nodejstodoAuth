const express = require("express");
const { loginRender, loginSubmit } = require("../controller/loginController");
const { registerRender, registerFormSubmit } = require("../controller/registerController");
const { resetRender } = require("../controller/resetController");

const router = express.Router();

router.get("/register", registerRender);
router.post("/register", registerFormSubmit);

router.get("/login", loginRender);
router.post("/login", loginSubmit);

router.get("/reset", resetRender);

module.exports = router;