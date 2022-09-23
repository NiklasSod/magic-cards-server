const User = require("../model/userModel");
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

exports.register_user = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  callback: any
) => {
  if (!firstName || !lastName || !email || !password) {
    return callback("400: need to fill in all forms");
  }
  if (firstName.length < 2 || firstName.length > 60) {
    return callback(
      "400: First name length should be between 2 and 60 characters long"
    );
  }
  if (lastName.length < 2 || lastName.length > 60) {
    return callback(
      "400: Last name length should be between 2 and 60 characters long"
    );
  }
  if (email.length < 3 || email.length > 60) {
    return callback(
      "400: Email length should be between 3 and 60 characters long"
    );
  }
  if (password.length < 5 || password.length > 60) {
    return callback(
      "400: Password length should be between 5 and 60 characters long"
    );
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
    return callback(
      "Success, welcome " + newUser.firstName + " " + newUser.lastName
    );
  } catch (error) {
    console.log(error);
    return callback("400: Something went wrong");
  }
};

exports.login_user = async (email: string, password: string, callback: any) => {
  if (!email || !password) {
    return callback("400: need to fill in all forms");
  };
  if (email.length < 3 || email.length > 60) {
    return callback(
      "400: Email length should be between 3 and 60 characters long"
    );
  };
  if (password.length < 5 || password.length > 60) {
    return callback(
      "400: Password length should be between 5 and 60 characters long"
    );
  };
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return callback("400: Wrong email or password");
    }
    if (await bcrypt.compare(password, user.password)) {
      if (user.isAdmin === true) {
        const adminToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_ADMIN, {
          expiresIn: process.env.JWT_EXPIRATION_TIME,
        });
        user.password = undefined;
        return callback({ adminToken, user });
      } else {
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRATION_TIME,
        });
        user.password = undefined;
        return callback({ token, user });
      };
    } else {
      return callback("400: Wrong email or password");
    };
  } catch (error) {
    console.log(error);
    console.log(
      "ERROR: Verify that you have a correct jwt_secret in your config.env file"
    );
    return callback(false);
  };
};
