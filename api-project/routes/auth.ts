import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserModel as User } from '../models/User'
import express from 'express'
const router = express.Router()

enum ROLES {
  User = 'User',
  Admin = 'Admin'
}

router.post("/register", async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!(email && name)) {
      res.status(400).send("All input is required");
    }
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    const randomPassword = Math.random().toString(36).slice(-8)
    const encryptedPassword = await bcrypt.hash(randomPassword, 10);
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      role: ROLES.User
    });

    const token = jwt.sign(
      { user_id: user._id, email, role: user.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "72h",
      }
    );

    user.token = token;
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});


export default router