import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  firstname: string;
  lastname: string;
  email: string;
  registrationdate: Date;
  rollno: number;
  studentclass: string;
  gender: string;
  parentsname: string;
  parentsmobilenumber: number;
  dateofbirth: Date;
  bloodgroup: string;
  healthissues: string;
  address: string;
}

const studentSchema: Schema<IStudent> = new Schema<IStudent>(
  {
    firstname: {
      type: String,
      required: [true, 'Please provide your first name'],
      trim: true,
      minlength: 2,
    },
    lastname: {
      type: String,
      required: [true, 'Please provide your last name'],
      trim: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      trim: true,
      minlength: 2,
      // unique: true,

      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
    },
    registrationdate: {
      type: Date,
      required: true,
    },
    rollno: {
      type: Number,
      required: true,
    },
    studentclass: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    parentsname: {
      type: String,
      required: true,
      trim: true,
    },
    parentsmobilenumber: {
      type: Number,
      required: true,
    },
    dateofbirth: {
      type: Date,
      required: true,
    },
    bloodgroup: {
      type: String,
      required: true,
    },
    healthissues: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model<IStudent>('Student', studentSchema);

export default Student;
