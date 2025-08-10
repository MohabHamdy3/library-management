import revokeTokenModel from "../../DB/models/revokeToken.model.js";
import userModel, {
  userRoles,
} from "../../DB/models/user.model.js";
import { sendEmail } from "../../service/sendEmail.js";
import {
  generateToken,
  verifyToken,
  Encrypt,
  Decrypt,
  Hash,
  compare,
  eventEmitter,
} from "../../utils/index.js";
import { customAlphabet, nanoid } from "nanoid";
import cloudinary from "../../utils/cloudinary/index.js";

export const registerUser = async (req , res , next) => {
    const { name , email , password } = req.body;
    const existUser = await userModel.findOne({ email });
    if (existUser) {
        throw new Error("User with this email already exists", {
      cause: 400,
    });
    }

const hashedPassword = await Hash({
    plainText: password,
    SIGNATURE: +process.env.SALT_ROUNDS,
  });    

  // send link to confirm email
  eventEmitter.emit("sendEmail", { email });

    const newUser = await userModel.create({
        name,
        email,
        password: hashedPassword,
        role: userRoles.USER,
      });

      return res.status(201).json({
    message: "User created successfully",
    status: 201,
    data: newUser,
  });
};

export const confirmEmail = async (req, res, next) => {
  const { token } = req.params;
  if (!token) {
    throw new Error("token not found", {
      cause: 401,
    });
  }

  const decoded = await verifyToken({
    token,
    SIGNATURE: process.env.SIGNATURE,
  });
  const user = await userModel.findOne({
    email: decoded.email,
    confirmed: false,
  });
  if (!user) {
    throw new Error("user not exist or already confirmed", {
      cause: 404,
    });
  }
  user.confirmed = true;
  await user.save();
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password", {
      cause: 401,
    });
  }
  const isMatch = await compare({
    plainText: password,
    cipherText: user.password,
  });
  if (!isMatch) {
    throw new Error("Invalid email or password", {
      cause: 401,
    });
  }

  const access_token = await generateToken({
    payload: { id: user._id, email: email },
    SIGNATURE:
      user.role == userRoles.ADMIN
        ? process.env.ACCESS_TOKEN_ADMIN
        : process.env.ACCESS_TOKEN_USER,
    options: { expiresIn: "1h", jwtid: nanoid() },
  });
  const refresh_token = await generateToken({
    payload: { id: user._id, email: email },
    SIGNATURE:
      user.role == userRoles.ADMIN
        ? process.env.REFRESH_TOKEN_ADMIN
        : process.env.REFRESH_TOKEN_USER,
    options: { expiresIn: "1y", jwtid: nanoid() },
  });

  return res.status(200).json({
    message: "Login successful",
    status: 200,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      access_token,
      refresh_token,
    },
  });
};


export const getProfile = async (req, res, next) => {
  const user = await userModel.findById(req.user.id);
  if (!user) {
    throw new Error("User not found", {
      cause: 404,
    });
  }
  return res.status(200).json({
    message: "Profile retrieved successfully",
    status: 200,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};