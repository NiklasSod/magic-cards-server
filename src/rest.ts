import { Request, Response, NextFunction } from "express";

// import card from './controller/card';
const user = require("./controller/user");

export const rest = (app: any) => {

  app.post("/register", (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;
    user.register_user(
      firstName,
      lastName,
      email,
      password,
      (result: string, error: string) => {
        if (error) {
          console.error(error);
          return res.status(500).json(error);
        }
        if (result.includes("400")) {
          const errResult = result.split("400: ")[1];
          return res.status(400).json({ message: errResult });
        }
        return res.status(200).json({ message: result });
      }
    );
  });

  app.post("/login", (req: Request, res: Response) => {
    const { email, password } = req.body;
    user.login_user(email, password, (result: string, error: string) => {
      if (error) {
        console.error(error);
        return res.status(500).json(error);
      };
      return res.status(200).json({ message: result });
    });
  });
};
