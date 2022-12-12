// importing modules.
const { Router } = require("express");

// router.
const router = Router();

// import custom controllers
const {
    welcomeUser,
    getDashboard,
    registerForm, 
    loginForm, 
    registerUser,
    loginUser,
    logoutUser
} = require("../controllers/user.controllers");
const { checkUser } = require("../middlewares/check.user");
const { authUser } = require("../middlewares/authenticate.user");
const { createNoteForm, notesPage } = require("../controllers/notes.controllers");

// get methods.
router.get("*", checkUser);
router.get("/", welcomeUser);
router.get("/notes", authUser, notesPage);
router.get("/register", registerForm);
router.get("/login", loginForm);
router.get("/logout", logoutUser);
router.get("/dashboard", authUser, getDashboard);
router.get("/create-note", authUser, createNoteForm);


// post methods
router.post("/register", registerUser);
router.post("/login", loginUser)

// export router.
module.exports = router;