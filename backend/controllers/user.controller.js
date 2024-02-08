import UserModel from "../models/user.model.js";

export default class UserController {
  getUserForSidebar = async (req, res) => {
    try {
      const loggedInUser = req.user._id;
      const allUsers = await UserModel.find({
        _id: { $ne: loggedInUser },
      }).select("-password");

      res.status(200).json(allUsers);
    } catch (error) {
      console.log("error in getUserForSidebar controller", error);
      res.status(500).json({ error: "internal server error" });
    }
  };
}
