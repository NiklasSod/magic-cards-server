const User = require("../model/userModel");
import bcrypt from "bcrypt";
// import jwt from 'jsonwebtoken';

exports.register_user = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  callback: any
) => {
  if (email.length < 3 || email.length > 60) {
    callback(false, "Name length should be between 3 and 60 characters long");
    return;
  }
  if (password.length < 5 || password.length > 60) {
    callback(
      false,
      "Password length should be between 5 and 60 characters long"
    );
    return;
  }

  // create new user
  try {
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });
    // hash and salt password before adding to db
    await newUser.save();
    callback(false, newUser.name);
  } catch (error) {
    console.log(error);
    callback(false, "Something went wrong");
  }
};
