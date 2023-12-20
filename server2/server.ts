import express, { Application, Request, Response }  from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cookieParser from "cookie-parser"
import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes';
import teacherRoutes from './routes/teacherRoutes';
import studentRoutes from './routes/studentRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running.')
});

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

// Routes

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/teacher', teacherRoutes);
app.use('/student', studentRoutes);

// Connect to MongoDB
async function connectToDB() {
  try {
    await mongoose.connect('mongodb+srv://sunrise:sunrise@sunrise.htgobby.mongodb.net/sunrise');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
}

connectToDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
