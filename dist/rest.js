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
exports.rest = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const node_1 = require("./node");
// import card from './controller/card';
const user = require("./controller/user");
/**
 * MIDDLEWARE
 */
// check for authorization token
function auth(req, res, next) {
    const token = req.headers.token;
    const adminToken = req.headers.adminToken;
    if (!token || !adminToken) {
        return;
        // return status(401).json({ message: "Unauthorized, sign in required." });
    }
    jsonwebtoken_1.default.verify(token.toString(), process.env.JWT_SECRET, (err) => __awaiter(this, void 0, void 0, function* () {
        if (err) {
            return;
            // return res.status(401).json({ message: "Unauthorized, invalid token." });
        }
        return next();
    }));
    jsonwebtoken_1.default.verify(adminToken.toString(), process.env.JWT_SECRET_ADMIN, (err) => __awaiter(this, void 0, void 0, function* () {
        if (err) {
            return;
            // return res.status(401).json({ message: "Unauthorized, invalid token." });
        }
        return next();
    }));
}
;
/**
 * USER ROUTES
 */
const rest = (app) => {
    app.post("/register", (req, res) => {
        const { firstName, lastName, email, password } = req.body;
        user.register_user(firstName, lastName, email, password, (result, error) => {
            if (error) {
                console.error(error);
                return res.status(500).json(error);
            }
            if (result.includes("400")) {
                const errResult = result.split("400: ")[1];
                return res.status(400).json({ message: errResult });
            }
            return res.status(200).json({ message: result });
        });
    });
    app.post("/login", (req, res) => {
        const { email, password } = req.body;
        user.login_user(email, password, (result, error) => {
            if (error) {
                console.error(error);
                return res.status(500).json(error);
            }
            ;
            if (typeof (result) !== "object" && result.includes("400")) {
                const errResult = result.split("400: ")[1];
                return res.status(400).json({ message: errResult });
            }
            ;
            return res.status(200).json({ message: result });
        });
    });
    app.post("/sendMail", (req, res) => {
        const mailData = {
            from: 'youremail@gmail.com',
            to: 'korvAbc@gmail.com',
            subject: 'Sending Email from magic card store',
            text: 'That was easy!',
        };
        node_1.transporter.sendMail(mailData, (error, info) => {
            if (error) {
                return console.log(error);
            }
            ;
            res.status(200).send({ message: "mail send", message_id: info.messageId });
        });
    });
};
exports.rest = rest;
//# sourceMappingURL=rest.js.map