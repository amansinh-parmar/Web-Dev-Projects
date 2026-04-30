import User from "../Models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

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
