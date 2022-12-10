// import modules
const jwt = require("jsonwebtoken");
require("dotenv").config();

// authenticate user
const authUser = async (request, response, next) => {
    const token = request.cookies.token;
    if(token) {
        jwt.verify(token, process.env.TOKEN, async(error) => {
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