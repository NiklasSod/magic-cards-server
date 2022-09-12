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
    const { firstName, lastName, email, password } = req.body;
    user.register_user(firstName, lastName, email, password, (result: string, error: string) => {
      if (error) {
        console.error(error);
        return res.status(500).json(error);
      }
      return res.status(200).json({ message: result });
    });
  });
};
