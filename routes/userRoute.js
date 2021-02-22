const express = require("express");
const { loginRender, loginSubmit } = require("../controller/loginController");
const { registerRender, registerFormSubmit } = require("../controller/registerController");
const { resetRender, resetSubmit, resetUser, resetForm } = require("../controller/resetController");

const router = express.Router();

router.get("/register", registerRender);
router.post("/register", registerFormSubmit);

router.get("/login", loginRender);
router.post("/login", loginSubmit);

router.get("/reset", resetRender);
router.post("/reset", resetSubmit);

router.get("/reset/:token", resetUser);
router.post("/reset/:token", resetForm);
module.exports = router;