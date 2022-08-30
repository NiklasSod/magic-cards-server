import { NextFunction } from "express";

import { Schema, model } from "mongoose";
import { genSalt, hash } from "bcrypt";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 60,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 60,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 60,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 60,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function hashPassword(next: NextFunction) {
  try {
    const salt = await genSalt(12);
    const hashedPassword = await hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = model("User", userSchema);
