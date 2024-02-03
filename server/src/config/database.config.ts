import { MongooseModuleOptions } from '@nestjs/mongoose';

export const DatabaseConfig: MongooseModuleOptions = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/your_database_name',
  autoIndex: false, // Set to true to enable auto-indexing in production (not recommended)
  connectionName: 'your_connection_name', // Optionally, specify a connection name
};