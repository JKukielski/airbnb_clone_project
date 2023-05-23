import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
const app = express();

dotenv.config();

app.use(
  cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173',
  })
);
app.use(express.json());

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
  res.json('positive');
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  res.json({ name, email, password });
});

app.listen(4000, () => {
  console.log('Running on port 4000');
});
