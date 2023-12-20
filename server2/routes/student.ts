import express, { Request, Response } from 'express';
import StudentModel, { IStudent } from '../models/student.model';

const router = express.Router();

router.route('/').get(async (req: Request, res: Response) => {
  try {
    const students: IStudent[] = await StudentModel.find();
    res.json(students);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/add').post(async (req: Request, res: Response) => {
  try {
    const {
      firstname,
      lastname,
      email,
      registrationdate,
      rollno,
      studentclass,
      gender,
      parentsname,
      parentsmobilenumber,
      dateofbirth,
      bloodgroup,
      healthissues,
      address,
    } = req.body;

    const newStudent: IStudent = new StudentModel({
      firstname,
      lastname,
      email,
      registrationdate: new Date(registrationdate),
      rollno,
      studentclass,
      gender,
      parentsname,
      parentsmobilenumber: Number(parentsmobilenumber),
      dateofbirth: new Date(dateofbirth),
      bloodgroup,
      healthissues,
      address,
    });

    await newStudent.save();
    res.json('Student added');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/:id').get(async (req: Request, res: Response) => {
  try {
    const student: IStudent | null = await StudentModel.findById(req.params.id);
    res.json(student);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/:id').delete(async (req: Request, res: Response) => {
  try {
    await StudentModel.findByIdAndDelete(req.params.id);
    res.json('Student deleted.');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/update/:id').post(async (req: Request, res: Response) => {
  try {
    const student: IStudent | null = await StudentModel.findById(req.params.id);

    if (student) {
      student.firstname = req.body.firstname;
      student.lastname = req.body.lastname;
      student.email = req.body.email;
      student.registrationdate = new Date(req.body.registrationdate);
      student.rollno = req.body.rollno;
      student.studentclass = req.body.studentclass;
      student.gender = req.body.gender;
      student.parentsname = req.body.parentsname;
      student.parentsmobilenumber = Number(req.body.parentsmobilenumber);
      student.dateofbirth = new Date(req.body.dateofbirth);
      student.bloodgroup = req.body.bloodgroup;
      student.healthissues = req.body.healthissues;
      student.address = req.body.address;

      await student.save();
      res.json('Student updated successfully');
    } else {
      res.status(404).json('Student not found');
    }
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

export = router;
