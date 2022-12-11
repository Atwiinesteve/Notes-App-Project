// import modules.
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// require configs.
require("dotenv").config();

// import user model.
const User = require("../models/user.model");

// welcome.
const welcomeUser = (request, response) => {
    try {
        return response.status(200).render("index", { title: "Welcome" })
    } catch (error) {
        console.log({
            name: error.name,
            message: error.message,
            stack: error.stack
        })
    }
};


// get dashboard
const getDashboard = async (request, response) => {
    try {
      // const user = await User.findOne({ email: request.body.email })
      return response.status(200).render("dashboard", { title: "Notes App: User Dashboard"})
    } catch (error) {
      console.log({
        name: error.name,
        message: error.message,
        stack: error.stack
      })
    }
  }

// register form
const registerForm = (request, response) => {
    try {
        return response.render("register", { title: "Register" });
    } catch (error) {
        console.log({
            name: error.name,
            message: error.message,
            stack: error.stack
        });
    }
};

// login form
const loginForm = (request, response) => {
    try {
        return response.render("login", { title: "Login" });
    } catch (error) {
        console.log({
            name: error.name,
            message: error.message,
            stack: error.stack
        });
    }
};

// register user
const registerUser = async(request, response) => {
    try {
        const user = await User.findOne({ email: request.body.email });
        if (user) {
            return response.status(400).json({ message: `User with Email: ${request.body.email} already Registered..` })
        } else {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(request.body.password, salt);
            const user = new User({
                email: request.body.email,
                username: request.body.username,
                password: hash,
            });
            user.save()
                .then(() => response.status(200).redirect("/login"))
                .catch((err) => response.status(400).json(err.message));
        }
    } catch (error) {
        console.log({
            name: error.name,
            message: error.message,
            stack: error.stack
        })
    }
};

// login user.
const loginUser = async(request, response) => {
    try {
        const user = await User.findOne({ email: request.body.email });
        if(!user) {
            return response.status(400).json({ message: `User with Email: ${request.body.email} not Registered..` })
        } else {
            const validatPass = await bcrypt.compare(request.body.password, user.password);
            if(!validatPass) {
                return response.status(400).json({ message: `Email/Password is incorrect..` });
            } else {
                const maxAge = 1*24*60*60;
                const token = jwt.sign({ id: user._id }, process.env.TOKEN, { expiresIn: maxAge });
                response.cookie("token", token, { httpOnly: true, maxAge: maxAge });
                response.redirect("/notes")
            }
        }
    } catch (error) {
        console.log({
            name: error.name,
            message: error.message,
            stack: error.stack
        })
    }
};

// logout user.
const logoutUser = async(request, response) => {
    try {
        response.cookie("token", "", { maxAge: 0.00001 });
        response.redirect("/login");
    } catch (error) {
        console.log({
            name: error.name,
            message: error.message,
            stack: error.stack
        })
    }
}



// exports
module.exports = {
    welcomeUser,
    getDashboard,
    registerForm,
    loginForm,
    registerUser,
    loginUser,
    logoutUser
};