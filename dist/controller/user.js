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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User = require("../model/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.register_user = (firstName, lastName, email, password, callback) => __awaiter(void 0, void 0, void 0, function* () {
    if (!firstName || !lastName || !email || !password) {
        return callback("400: need to fill in all forms");
    }
    if (firstName.length < 2 || firstName.length > 60) {
        return callback("400: First name length should be between 2 and 60 characters long");
    }
    if (lastName.length < 2 || lastName.length > 60) {
        return callback("400: Last name length should be between 2 and 60 characters long");
    }
    if (email.length < 3 || email.length > 60) {
        return callback("400: Email length should be between 3 and 60 characters long");
    }
    if (password.length < 5 || password.length > 60) {
        return callback("400: Password length should be between 5 and 60 characters long");
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
        return callback("400: Something went wrong");
    }
});
exports.login_user = (email, password, callback) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email || !password) {
        return callback("400: need to fill in all forms");
    }
    ;
    if (email.length < 3 || email.length > 60) {
        return callback("400: Email length should be between 3 and 60 characters long");
    }
    ;
    if (password.length < 5 || password.length > 60) {
        return callback("400: Password length should be between 5 and 60 characters long");
    }
    ;
    try {
        const user = yield User.findOne({ email });
        if (!user) {
            return callback("400: Wrong email or password");
        }
        if (yield bcrypt_1.default.compare(password, user.password)) {
            if (user.isAdmin === true) {
                const adminToken = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET_ADMIN, {
                    expiresIn: process.env.JWT_EXPIRATION_TIME,
                });
                user.password = undefined;
                return callback({ adminToken, user });
            }
            else {
                const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRATION_TIME,
                });
                user.password = undefined;
                return callback({ token, user });
            }
            ;
        }
        else {
            return callback("400: Wrong email or password");
        }
        ;
    }
    catch (error) {
        console.log(error);
        console.log("ERROR: Verify that you have a correct jwt_secret in your config.env file");
        return callback(false);
    }
    ;
});
//# sourceMappingURL=user.js.map