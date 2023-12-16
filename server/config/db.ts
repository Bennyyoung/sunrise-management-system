import mongoose from 'mongoose';

const connectDB = async () => {
  const CONNECTION_URL: string | undefined = process.env.MONGO_URI;

  try {
    if (!CONNECTION_URL) {
      throw new Error('MongoDB connection URL is not provided.');
    }

    await mongoose.connect(CONNECTION_URL);

    console.log('MongoDB Connected...');
  } catch (err: any) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
