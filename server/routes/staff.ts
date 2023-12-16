import express, { Request, Response } from 'express';
import StaffModel from '../models/staff.model';
import { IStaff } from '../models/staff.model';

const router = express.Router();

// Read Staff
router.route('/').get((req: Request, res: Response) => {
  StaffModel.find()
    .then((staff: IStaff[]) => res.json(staff))
    .catch((err: Error) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req: Request, res: Response) => {
  const {
    firstname,
    lastname,
    email,
    joiningdate,
    password,
    confirmpassword,
    mobilenumber,
    gender,
    designation,
    dateofbirth,
    education,
  } = req.body;

  const newStaff = new StaffModel({
    firstname,
    lastname,
    email,
    joiningdate: new Date(joiningdate),
    password,
    confirmpassword,
    mobilenumber: Number(mobilenumber),
    gender,
    designation,
    dateofbirth: new Date(dateofbirth),
    education,
  });

  newStaff
    .save()
    .then(() => res.json('Staff added'))
    .catch((err: Error) => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req: Request, res: Response) => {
  StaffModel.findById(req.params.id)
    .then((staff: IStaff | null) => res.json(staff))
    .catch((err: Error) => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req: Request, res: Response) => {
  StaffModel.findByIdAndDelete(req.params.id)
    .then(() => res.json('Staff deleted.'))
    .catch((err: Error) => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req: Request, res: Response) => {
  StaffModel.findById(req.params.id)
    .then((staff: IStaff | null) => {
      if (!staff) {
        res.status(404).json('Staff not found');
        return;
      }

      staff.firstname = req.body.firstname;
      staff.lastname = req.body.lastname;
      staff.email = req.body.email;
      staff.joiningdate = new Date(req.body.joiningdate);
      staff.password = req.body.password;
      staff.confirmpassword = req.body.confirmpassword;
      staff.mobilenumber = Number(req.body.mobilenumber);
      staff.gender = req.body.gender;
      staff.designation = req.body.designation;
      staff.dateofbirth = new Date(req.body.dateofbirth);
      staff.education = req.body.education;

      staff
        .save()
        .then(() => res.json('Staff updated successfully'))
        .catch((err: Error) => res.status(400).json('Error: ' + err));
    })
    .catch((err: Error) => res.status(400).json('Error: ' + err));
});

export = router;
