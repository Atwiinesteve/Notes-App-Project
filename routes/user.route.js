// importing modules.
const { Router } = require("express");

// router.
const router = Router();

// import custom controllers
const { 
    registerForm, 
    loginForm, 
    welcomeUser,
    registerUser,
    loginUser
} = require("../controllers/user.controllers");
const { checkUser } = require("../middlewares/check.user");

// get methods.
// router.get("*", checkUser);
router.get("/", welcomeUser);
router.get("/register", registerForm);
router.get("/login", loginForm);

// post methods
router.post("/register", registerUser)
router.post("/login", loginUser)

// export router.
module.exports = router;