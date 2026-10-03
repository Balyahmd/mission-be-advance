import * as AuthService from "../services/authService.js";

export const register = async (req, res) => {
  try {
    const user = await AuthService.register(req.body);

    res.status(201).json({
      message: "Register berhasil",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await AuthService.login(email, password);

    res.status(200).json({
      message: "Login berhasil",
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const token = req.query.token || req.body.token;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Invalid Verification Token",
      });
    }

    const user = await AuthService.verifyEmail(token);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Verification Token",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Email Verified Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
