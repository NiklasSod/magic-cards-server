import { Request, Response, NextFunction } from "express";

// import card from './controller/card';
const user = require("./controller/user");

// temp fix any
export const rest = (app: any) => {
  app.get("/user", (req: Request, res: Response) => {
    const name: string = "Georgios";
    res.send({ message: name });
  });

  app.post("/register", (req: Request, res: Response) => {
    user.register_user(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.password,
      (err: any) => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
        return res.status(200).json({ user });
      }
    );
  });
};
