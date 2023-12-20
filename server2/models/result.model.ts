import mongoose, { Schema, Document } from 'mongoose';

// Define the IResult interface
interface IResult extends Document {
  studentfullname: string;
  studentclass: string;
  subject: string;
  test: number;
  exam: number;
  resultdate: Date;
  session: string;
  term: string;
  responsible: string;
}

// Define the resultSchema
const resultSchema: Schema<IResult> = new Schema<IResult>({
  studentfullname: {
    type: String,
    required: true,
  },
  studentclass: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  test: {
    type: Number,
    required: true,
  },
  exam: {
    type: Number,
    required: true,
  },
  resultdate: {
    type: Date,
    required: true,
  },
  session: {
    type: String,
    required: true,
  },
  term: {
    type: String,
    required: true,
  },
  responsible: {
    type: String,
    required: true,
  },
},
{
  timestamps: true,
});

// Define the Result model
const Result = mongoose.model<IResult>('Result', resultSchema);

// Export both the Result model and IResult interface
export { Result, IResult };
