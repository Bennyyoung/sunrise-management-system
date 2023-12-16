import mongoose, { Schema, Document } from 'mongoose';

interface IUpload extends Document {
  teachersname: string;
  subject: string;
  upload: string;
}

const uploadSchema: Schema<IUpload> = new Schema<IUpload>({
  teachersname: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  upload: {
    type: String,
    required: true,
  },
});

const Upload = mongoose.model<IUpload>('Upload', uploadSchema);

export default Upload;
