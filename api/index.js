import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import User from './models/User.js';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
const app = express();

dotenv.config();

app.use(
  cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173',
  })
);
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
  res.json('positive');
});

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const salt = await bcrypt.salt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    res.status(422).json(error);
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const correctPass = bcrypt.compareSync(password, user.password);
    if (!correctPass) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie('token', token).json(user);
      }
    );
  } catch (error) {}
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  }
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json('user logged out');
});

app.listen(4000, () => {
  console.log('Running on port 4000');
});
