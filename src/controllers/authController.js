import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import User from "../models/User.js";

function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

export const validateSignup = [
  body("email").isEmail().withMessage("Valid email required"),
  body("password").isLength({ min: 6 }).withMessage("Password min 6 chars"),
];

export const validateLogin = [
  body("email").isEmail().withMessage("Valid email required"),
  body("password").notEmpty().withMessage("Password required"),
];

export async function signup(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ ok: false, errors: errors.array() });

  const { name, email, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ ok: false, message: "Email already registered" });

    const user = await User.create({ name, email, password });
    const token = signToken(user._id);

    res.status(201).json({
      ok: true,
      token,
      user: { id: user._id, email: user.email, name: user.name || "" },
    });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
}

export async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ ok: false, errors: errors.array() });

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ ok: false, message: "Invalid credentials" });

    const match = await user.comparePassword(password);
    if (!match) return res.status(400).json({ ok: false, message: "Invalid credentials" });

    const token = signToken(user._id);

    res.json({
      ok: true,
      token,
      user: { id: user._id, email: user.email, name: user.name || "" },
    });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
}

export function logout(req, res) {
  res.json({ ok: true, message: "Logged out" });
}
