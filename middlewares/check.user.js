// import modules
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// importing user schema
const User = require("../models/user.model");

// check user
const checkUser = (request, response, next) => {
    const token = request.cookies.token;
    if(token) {
        jwt.verify(token, process.env.TOKEN, async(error, decodedtoken) => {
            if(error) {
                response.locals.user = null;
                next();
            } else {
                const user = await User.findById(decodedtoken.id);
                response.locals.user = user;
                next();
            }
        })
    } else {
        response.locals.user = null;
        next();
    }
};

// exports.
module.exports = {
    checkUser
}