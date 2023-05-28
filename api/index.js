import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import User from './models/User.js';
import Place from './models/Place.js';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import imageDownloader from 'image-downloader';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import fs from 'fs';
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

app.use(
  cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173',
  })
);
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect(process.env.MONGO_URL);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

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

app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body;
  const newName = 'photo' + Date.now() + '.jpg';
  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads/' + newName,
  });
  res.json(newName);
});

// app.post('/upload', photoMiddleware.array('photos', 100), (req, res) => {
//   const uploadedFiles = [];
//   for (let i = 0; i < req.files.length; i++) {
//     const { path, originalname } = req.files[i];
//     const parts = originalname.split('.');
//     const ext = parts[parts.length - 1];
//     const newPath = path + '.' + ext;
//     fs.renameSync(path, newPath);
//     uploadedFiles.push(newPath.replace('uploads\\', ''));
//   }
//   res.json(uploadedFiles);
// });

app.post('/upload', upload.array('photos[]', 12), async (req, res) => {
  const filenames = req.files.map((file) => file.filename);
  res.json(filenames);
});

app.post('/places', async (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;

  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    if (err) throw err;

    const place = new Place({
      owner: userData.id,
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });

    const newPlace = await place.save();
    res.json(newPlace);
  });
});

app.get('/places', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    if (err) throw err;
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
});

app.get('/places/:id', async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

app.put('/places/:id', async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;

  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    if (err) throw err;
    const newPlace = await Place.findById(id);
    if (userData.id === newPlace.owner.toString()) {
      newPlace.set({
        title,
        address,
        photos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      });
      const savedPlace = await newPlace.save();
      res.status(200).json(savedPlace);
    }
  });
});

app.listen(4000, () => {
  console.log('Running on port 4000');
});
