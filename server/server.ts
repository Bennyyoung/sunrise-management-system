import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./config/db";

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use(
  cors({
    origin: [
      // "https://sunrise-management-system.herokuapp.com",
      // "https://sunrise-management-system.vercel.app",
      process.env.FRONT_END!,
      process.env.BACK_END!,
      //  process.env.REACT_APP_FRONT_END,
      //  process.env.REACT_APP_BACK_END
    ],
    methods: ['GET', 'PATCH', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

const PORT: number | string = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

// Connect DB
connectDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running.');
});

import userRouter from './routes/userRouter';
// import userAuth from './routes/auth';
import staffRouter from './routes/staff';
import studentRouter from './routes/student';
import resultRouter from './routes/result';
import uploadRouter from './routes/upload';

app.use('/auth', userRouter);
app.use('/staffs', staffRouter);
app.use('/students', studentRouter);
app.use('/results', resultRouter);
app.use('/upload', uploadRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../client/build')));

  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}
