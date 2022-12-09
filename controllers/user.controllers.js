// importing 3rd party models
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// import schema
const User = require("../models/user.model");

// welcome
const welcomeUser = (request, response) => {
    try {
        return response.status(200).render("index", { title: "Notes App.."})
    } catch (error) {
        console.log({ name: error.name, message: error.message })
    }
};

// register form
const registerForm = (request, response) => {
    try {
        return response.status(200).render("register", { title: "Notes App: Register"})
    } catch (error) {
        console.log({ name: error.name, message: error.message })
    }
};

// login form
const loginForm = (request, response) => {
    try {
        return response.status(200).render("login", { title: "Notes App: Login"})
    } catch (error) {
        console.log({ name: error.name, message: error.message })
    }
};

// register user
const registerUser = async (request, response) => {
    try {
        const user = await User.findOne({ email: request.body.email });
        if(user) {
            return response.status(400).json({ message: `User ${request.body.email} already registered..` })
        } else {
            const salt = await bcrypt.genSalt(15);
            const hash = await bcrypt.hash(request.body.password, salt);
            const user = new User({
                email: request.body.email,
                username: request.body.username,
                password: hash
            });
            await user.save()
                .then(() => { return response.status(201).redirect("/login") } )
                .catch((error) => { console.log({ name: error.name, message: error.message }) })
        }
    } catch (error) {
        console.log({ name: error.name, message: error.message })
    }
};

// login User
const loginUser = async (request, response) => {
    try {
        const user = await User.findOne({ email: request.body.email });
        if(!user) {
            return response.status(400).json({ message: `User with email: ${request.body.email} is not registered..` });
        } else {
            const validatePassword = await bcrypt.compare(request.body.password, user.password);
            if(!validatePassword) {
                return response.status(400).json({ message: "Invalid Email/Password.." })
            } else {
                const maxAge = 1*24*60*60;
                const token = jwt.sign({ _id: user._id }, process.env.TOKEN, { expiresIn: maxAge });
                response.cookie("token", token, { httpOnly: true, SameSite: true, maxAge: maxAge });
                response.redirect("/");
            }
        }
    } catch (error) {
        console.log({ name: error.name, message: error.message })
    }
}

// Exports.
module.exports = {
    welcomeUser,
    registerForm,
    loginForm,
    registerUser,
    loginUser,
}