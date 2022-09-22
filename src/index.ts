import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import { rest } from "./rest";
import bodyParser from "body-parser";
import helmet from "helmet";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(helmet());

// add cors rules(?)
app.use(cors());

try {
  const database = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  );
  mongoose.connect(database);
} catch (error) {
  console.log(
    "ERROR: Verify that you have a correct db and password string in your config.env file"
  );
}

rest(app);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}/`);
});
