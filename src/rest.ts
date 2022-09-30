import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { transporter } from "./node";

// import card from './controller/card';
const user = require("./controller/user");

/**
 * MIDDLEWARE
 */
 // check for authorization token
function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.token;
  const adminToken = req.headers.adminToken;

  if (!token || !adminToken) {
      return;
      // return status(401).json({ message: "Unauthorized, sign in required." });
  }
  jwt.verify(token.toString(), process.env.JWT_SECRET, async (err) => {
      if (err) {
          return;
          // return res.status(401).json({ message: "Unauthorized, invalid token." });
      }
      return next();
  });
  jwt.verify(adminToken.toString(), process.env.JWT_SECRET_ADMIN, async (err) => {
    if (err) {
        return;
        // return res.status(401).json({ message: "Unauthorized, invalid token." });
    }
    return next();
});
};

/**
 * USER ROUTES
 */
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
      if (typeof(result) !== "object" && result.includes("400")) {
        const errResult = result.split("400: ")[1];
        return res.status(400).json({ message: errResult });
      };
      return res.status(200).json({ message: result });
    });
  });

  app.post("/sendMail", (req: Request, res: Response) => {
    const mailData = {
      from: 'youremail@gmail.com',  // sender address
      to: 'korvAbc@gmail.com',   // list of receivers
      subject: 'Sending Email from magic card store',
      text: 'That was easy!',
    };
    transporter.sendMail(mailData, (error, info) => {
      if (error) {
        return console.log(error);
      };
      res.status(200).send({ message: "mail send", message_id: info.messageId })
    })

  })
};
