// import modules
const jwt = require("jsonwebtoken");
require("dotenv").config();

// importing user schema
const User = require("../models/user.model");

// authenticate user
const authUser = async (request, response, next) => {
    const token = request.cookies.token;
    if(token) {
        jwt.verify(token, process.env.TOKEN, async(error, decodedtoken) => {
            if(error) {
                response.status(401).redirect("/login")
                next();
            } else {
                next();
            }
        })
    } else {
        response.status(401).redirect("/login")
    }
};

// exports.
module.exports = {
    authUser
}