"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User = require("../model/userModel");
// import jwt from 'jsonwebtoken';
exports.register_user = (firstName, lastName, email, password, callback) => __awaiter(void 0, void 0, void 0, function* () {
    if (!firstName || !lastName || !email || !password) {
        return callback("need to fill in all forms");
    }
    if (firstName.length < 2 || firstName.length > 60) {
        return callback("First name length should be between 2 and 60 characters long");
    }
    if (lastName.length < 2 || lastName.length > 60) {
        return callback("Last name length should be between 2 and 60 characters long");
    }
    if (email.length < 3 || email.length > 60) {
        return callback("Email length should be between 3 and 60 characters long");
    }
    if (password.length < 5 || password.length > 60) {
        return callback("Password length should be between 5 and 60 characters long");
    }
    // create new user
    try {
        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
        });
        // hash and salt password before adding to db
        yield newUser.save();
        return callback("Success, welcome " + newUser.firstName + " " + newUser.lastName);
    }
    catch (error) {
        console.log(error);
        return callback("Something went wrong");
    }
});
//# sourceMappingURL=user.js.map