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
        console.log(req.body);
        user.register_user(req.body.firstName, req.body.lastName, req.body.email, req.body.password, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            return res.status(200).json({ user });
        });
    });
};
exports.rest = rest;
//# sourceMappingURL=rest.js.map