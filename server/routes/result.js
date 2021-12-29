const express = require('express');

const router = express.Router();
let Result = require('../models/result.model');

router.route('/').get((req, res) => {
  Result.find()
    .then(result => res.json(result))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
  const studentfullname = req.body.studentfullname;
  const studentclass = req.body.studentclass;
  const subject = req.body.subject;
  const test = req.body.test;
  const exam = req.body.exam;
  const resultdate = Date.parse(req.body.resultdate);
  const session = req.body.session;
  const term = req.body.term;
  const responsible = req.body.responsible;

  const newResult = new Result({
    studentfullname,
    studentclass,
    subject,
    test,
    exam,
    resultdate,
    session,
    term,
    responsible
  });

  newResult.save()
    .then(() => res.json('Student result uploaded')).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Result.findById(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Result.findByIdAndDelete(req.params.id)
    .then(() => res.json('Student Result deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/update/:id').post((req, res) => {
  Result.findByIdAndUpdate(req.params.id)
    .then(result => {
      result.studentfullname = req.body.studentfullname
      result.studentclass = req.body.studentclass;
      result.subject = req.body.subject;
      result.test = req.body.test;
      result.exam = req.body.exam;
      result.resultdate = Date.parse(req.body.resultdate);
      result.session = req.body.session;
      result.term = req.body.term;
      result.responsible = req.body.responsible;

      result.save()
        .then(() => res.json('Result updated succesfully'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;