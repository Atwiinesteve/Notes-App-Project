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
}

// login form
const loginForm = (request, response) => {
    try {
        return response.status(200).render("login", { title: "Notes App: Login"})
    } catch (error) {
        console.log({ name: error.name, message: error.message })
    }
}

// Exports.
module.exports = {
    welcomeUser,
    registerForm,
    loginForm
}