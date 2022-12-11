// import modules
const jwt = require("jsonwebtoken");
require("dotenv").config();

// authenticate user
const authUser = async (request, response, next) => {
    const token = request.cookies.auth_token;
    if(token) {
        jwt.verify(token, process.env.TOKEN, async(error) => {
            if(error) {
                response.redirect("/login")
            } else {
                next();
            }
        })
    } else {
        response.redirect("/login")
    }
};

// exports.
module.exports = {
    authUser
}