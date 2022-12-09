// importing modules.
const { Router } = require("express");

// router.
const router = Router();

// import custom controllers
const { 
    registerForm, 
    loginForm, 
    welcomeUser
} = require("../controllers/user.controllers");

// get methods.
router.get("/", welcomeUser);
router.get("/register", registerForm);
router.get("/login", loginForm);

// export router.
module.exports = router;