import User from "../Models/user.model";

export const signup = async (req, res) => {
  const { name, email, profileImgUrl, password, adminJoinCode } = req.body;

  //Check if user already exists
  const isAlreadyExist = await User.findOne({ email });

  if (isAlreadyExist) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  }

  //Check user role
};
