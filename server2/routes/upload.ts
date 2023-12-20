import express, { Request, Response } from 'express'; // Ensure correct import statement
import multer from 'multer';
import path from 'path';
import UploadModel, { IUpload } from '../models/upload.model';

const router = express.Router();

// Storage engine for multer
const storageEngine = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

// File Filter for multer
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
) => {
  let pattern = /jpg|png|svg|docs/; //Regex

  if (pattern.test(path.extname(file.originalname))) {
    callback(null, true);
  } else {
    callback(new Error('Error: not a valid file'));
  }
};

// Initialize multer
const upload = multer({
  storage: storageEngine,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
});

router.route('/upload').post(upload.single('image'), async (req: Request, res: Response) => {
  try {
    const teachersname = req.body.teachersname;
    const subject = req.body.subject;
    const uploadedFile = req.file?.filename;

    if (!teachersname || !subject || !uploadedFile) {
      return res.status(400).json('Error: All fields are required');
    }

    const newUpload: IUpload = new UploadModel({
      teachersname,
      subject,
      upload: uploadedFile,
    });

    await newUpload.save();
    res.json('Assignment uploaded');
  } catch (err) {
    res.status(400).json('Error: ' + err.message);
  }
});

export = router;
