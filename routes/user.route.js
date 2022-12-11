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
    loginUser,
    logoutUser
} = require("../controllers/user.controllers");
const { checkUser } = require("../middlewares/check.user");
const { getDashboard } = require("../controllers/notes.controllers");
const { authUser } = require("../middlewares/authenticate.user");

// get methods.
router.get("*", checkUser);
router.get("/", welcomeUser);
router.get("/register", registerForm);
router.get("/login", loginForm);
router.get("/logout", logoutUser);
router.get("/dashboard", authUser, getDashboard);

// post methods
router.post("/register", registerUser)
router.post("/login", loginUser)

// export router.
module.exports = router;