const Users = require("../repositories/users");
const { HttpCode } = require("../helpers/constans");
const jwt = require("jsonwebtoken");
const fs = require("fs/promises");
const path = require("path");
require("dotenv").config();
const UploadAvatarService = require("../services/local-upload");

const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email);
    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: "error",
        code: HttpCode.CONFLICT,
        message: "This email is already used",
      });
    }
    const { id, email, subscription, avatarURL } = await Users.create(req.body);
    return res.status(HttpCode.CREATED).json({
      status: "succes",
      code: HttpCode.CREATED,
      data: { id, email, subscription, avatarURL },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email);
    const isValidPassword = await user?.isValidPassword(req.body.password);
    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        message: "Invalid credential",
      });
    }
    const id = user.id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
    await Users.updateToken(id, token);
    return res.json({ status: "succes", code: 200, data: { token } });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const id = req.user.id;
    await Users.updateToken(id, null);
    return res.status(HttpCode.NO_CONTENT).json({});
  } catch (error) {
    next(error);
  }
};
const avatars = async (req, res, next) => {
  try {
    const id = req.user.id;
    const uploads = new UploadAvatarService(process.env.AVATAR_OF_USERS);
    const avatarUrl = await uploads.saveAvatar({ idUser: id, file: req.file });
    try {
      await fs.unlink(path.join(proces.env.AVATAR_OF_USERS, req.user.avatar));
    } catch (e) {
      console.log(e.message);
    }
    await Users.updateAvatar(id, avatarUrl);
    res.json({ status: "succes", code: 200, data: { avatarUrl } });
  } catch (error) {
    next(error);
  }
};
module.exports = { signup, login, logout, avatars };
