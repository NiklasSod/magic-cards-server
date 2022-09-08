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
    user.register_user(firstName, lastName, email, password, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      return res.status(200).json({ message: err });
    });
  });
};
exports.rest = rest;
//# sourceMappingURL=rest.js.map
