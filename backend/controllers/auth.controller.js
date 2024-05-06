import bcrypt from "bcryptjs";
import UserModel from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/genereateJwtToken.js";

export default class AuthUser {
  signUp = async (req, res) => {
    const {
      fullName,
      userName,
      password,
      confirmPassword,
      gender,
      profilePicture,
    } = req.body;
    try {
      if (password !== confirmPassword) {
        return res.status(400).json({ error: "password didn't match!" });
      }
      const user = await UserModel.findOne({ userName });
      if (user) {
        return res.status(400).json({ error: "username already exists!" });
      }

      //   Hash Password
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);

      // https://avatar.iran.liara.run/public/girl?username=[value]

      const boyProfilePic = `https://robohash.org/${userName}`;
      const girlProfilePic = `https://robohash.org/${userName}`;

      const newUser = new UserModel({
        fullName,
        userName,
        password: hashedPassword,
        gender,
        profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
      });
      if (newUser) {
        // * JWT Token
        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();

        res.status(201).json({
          _id: newUser._id,
          fullName: newUser.fullName,
          userName: newUser.userName,
          profilePicture: newUser.profilePicture,
        });
      } else {
        res.status(400).json({ error: "Invalid user data" });
      }
    } catch (error) {
      console.log("error in signup controller", error);
      res.status(500).json({ error: "internal server error" });
    }
  };

  logIn = async (req, res) => {
    try {
      const { userName, password } = req.body;
      const user = await UserModel.findOne({ userName });
      const isCorrectPassword = await bcrypt.compare(
        password,
        user?.password || ""
      );
      if (!user || !isCorrectPassword) {
        return res
          .status(400)
          .json({ error: "Incorrect Username or Password" });
      }
      generateTokenAndSetCookie(user._id, res);

      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        userName: user.userName,
        profilePicture: user.profilePicture,
      });
    } catch (error) {
      console.log("error in login controller", error);
      res.status(500).json({ error: "internal server error" });
    }
  };
  logOut = (req, res) => {
    try {
      res.cookie("jwt", "", { maxAge: 0 });
      res.status(200).json({ message: "logged out successfully!" });
    } catch (error) {
      console.log("error in logout controller", error);
      res.status(500).json({ error: "internal server error" });
    }
  };
}
