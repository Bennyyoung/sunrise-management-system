import express, { Request, Response } from 'express';
import { Result, IResult } from '../models/result.model';

const router = express.Router();

router.route('/').get(async (req: Request, res: Response) => {
  try {
    const results: IResult[] = await Result.find();
    res.json(results);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/add').post(async (req: Request, res: Response) => {
  try {
    const {
      studentfullname,
      studentclass,
      subject,
      test,
      exam,
      resultdate,
      session,
      term,
      responsible,
    } = req.body;

    const newResult: IResult = new Result({
      studentfullname,
      studentclass,
      subject,
      test,
      exam,
      resultdate: new Date(resultdate), // Fix: Use new Date()
      session,
      term,
      responsible,
    });

    await newResult.save();
    res.json('Student result uploaded');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/:id').get(async (req: Request, res: Response) => {
  try {
    const result: IResult | null = await Result.findById(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/:id').delete(async (req: Request, res: Response) => {
  try {
    await Result.findByIdAndDelete(req.params.id);
    res.json('Student Result deleted.');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/update/:id').post(async (req: Request, res: Response) => {
  try {
    const result: IResult | null = await Result.findById(req.params.id);

    if (result) {
      result.studentfullname = req.body.studentfullname;
      result.studentclass = req.body.studentclass;
      result.subject = req.body.subject;
      result.test = req.body.test;
      result.exam = req.body.exam;
      result.resultdate = new Date(req.body.resultdate); // Fix: Use new Date()
      result.session = req.body.session;
      result.term = req.body.term;
      result.responsible = req.body.responsible;

      await result.save();
      res.json('Result updated successfully');
    } else {
      res.status(404).json('Result not found');
    }
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

export = router;
