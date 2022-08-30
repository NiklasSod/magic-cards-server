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
    if (email.length < 3 || email.length > 60) {
        callback(false, "Name length should be between 3 and 60 characters long");
        return;
    }
    if (password.length < 5 || password.length > 60) {
        callback(false, "Password length should be between 5 and 60 characters long");
        return;
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
        callback(false, newUser.name);
    }
    catch (error) {
        console.log(error);
        callback(false, "Something went wrong");
    }
});
//# sourceMappingURL=user.js.map