import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import { v4 as uuidv4 } from "uuid";
import { sendmail } from "../utils/sendEmail.js";

export const register = async (data) => {
  const { full_name, username, email, password, number_phone, gender } =
    data;

  const existingUser = await User.findOne({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email sudah terdaftar");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verification_token = uuidv4()

  const user = await User.create({
    full_name,
    username,
    email,
    password: hashedPassword,
    number_phone,
    gender,
    role: "user",
    verification_token,
    is_verified: false,
  });

  await sendmail(email, verification_token)

  return {
    id: user.id,
    full_name: user.full_name,
    email: user.email
  };
};

export const login = async (email, password) => {
  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    throw new Error("Email atau password salah");
  }

  const passwordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordValid) {
    throw new Error("Email atau password salah");
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  return {
    user,
    token,
  };
};


export const verifyEmail = async (token) => {
  const user = await User.findOne({ where: { verification_token: token } });

  if (!user) {
    return null;
  }

  user.is_verified = true;
  user.verification_token = null;
  await user.save();

  return user;
};