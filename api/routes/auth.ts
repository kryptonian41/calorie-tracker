import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserModel as User } from '../models/User'
import express from 'express'
import { ROLES } from '../types'
import { verifyToken } from '../middlewares'
const router = express.Router()

router.get("/me", verifyToken, (req, res) => res.json(req.user))

router.post("/register", async (req, res, next) => {
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

    user.token = createUserToken(user)
    res.status(201).json({ ...user.toJSON(), password: randomPassword });
  } catch (err) {
    console.log(err);
    next(err)
  }
});


router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email });
    if (!user) throw Error('User not found')
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) return res.status(403).send('Incorrect Credentials')
    const token = createUserToken(user)
    return res.json({ ...user.toJSON(), token })
  } catch (error) {
    next(error)
  }
})

const createUserToken = ({ _id, email, role }) => jwt.sign(
  { id: _id, email, role },
  process.env.SECRET_KEY,
  {
    expiresIn: "72h",
  }
);

export default router