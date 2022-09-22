"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rest = void 0;
// import card from './controller/card';
const user = require("./controller/user");
// temp fix any
const rest = (app) => {
    app.get("/user", (req, res) => {
        const name = "Georgios";
        res.send({ message: name });
    });
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
        user.register_user(email, password, (result, error) => {
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
};
exports.rest = rest;
//# sourceMappingURL=rest.js.map