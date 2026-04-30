import User from "../Models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { name, email, profileImgUrl, password, adminJoinCode } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    name === "" ||
    email === "" ||
    password === ""
  ) {
    return next(errorHandler(400, "All fields are required"));
  }

  //Check if user already exists
  const isAlreadyExist = await User.findOne({ email });

  if (isAlreadyExist) {
    return next(errorHandler(400, "User already exists"));
  }

  //Check user role
  let role = "user";

  if (adminJoinCode && adminJoinCode === process.env.ADMIN_JOIN_CODE) {
    role = "admin";
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    name,
    email,
    passwor: hashedPassword,
    profileImgUrl,
    role,
  });

  try {
    await newUser.save();

    res.json("Signup Successful");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, nex) => {
  try {
    const { email, password } = req.body;

    if (!email || !password || email === "" || password === "") {
      return next(errorHandler(400, "All fields are required"));
    }

    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, "User not found!"));
    }

    // Compare Password
    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(400, "Wrong Credentials"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const {password: pass, ...rest} = validUser._doc

    res.status(200).cookie('access_token', token, {httpOnly: true}).json(rest)
  } catch (error) {
    next(error);
  }
};
